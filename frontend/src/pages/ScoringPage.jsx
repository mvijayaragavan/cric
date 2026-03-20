import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { getMatch, updateScore, undoScore } from '../services/api';
import {
    ArrowLeft,
    Settings,
    MessageSquare,
    ClipboardList,
    Activity,
    Target,
    CloudOff,
    RefreshCw
} from 'lucide-react';
import ScoreControls from '../components/match/ScoreControls';
import CommentaryList from '../components/match/CommentaryList';
import ScorecardTable from '../components/match/ScorecardTable';
import PlayerStatsMini from '../components/match/PlayerStatsMini';
import MatchAnalytics from '../components/match/MatchAnalytics';
import MatchTimeline from '../components/match/MatchTimeline';
import MatchGraphs from '../components/match/MatchGraphs';
import toast, { Toaster } from 'react-hot-toast';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ScoringPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [match, setMatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('scoring');

    // Offline & Sync state
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [syncing, setSyncing] = useState(false);

    // Local state for strike rotation and selection
    const [striker, setStriker] = useState('p1');
    const [nonStriker, setNonStriker] = useState('p2');

    useEffect(() => {
        fetchMatch();
        const socket = io(SOCKET_URL);
        socket.emit('join_match', id);
        socket.on('score_update', (updatedMatch) => {
            setMatch(updatedMatch);
            localStorage.setItem(`match_${id}`, JSON.stringify(updatedMatch));
        });

        const handleOnline = () => {
            setIsOnline(true);
            syncOfflineQueue();
        };
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            socket.disconnect();
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [id]);

    const fetchMatch = async () => {
        try {
            const { data } = await getMatch(id);
            setMatch(data);
            localStorage.setItem(`match_${id}`, JSON.stringify(data));
        } catch (err) {
            if (!navigator.onLine) {
                const cached = localStorage.getItem(`match_${id}`);
                if (cached) setMatch(JSON.parse(cached));
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const optimisticUpdate = (type, val) => {
        setMatch(prev => {
            if (!prev) return prev;
            const newMatch = JSON.parse(JSON.stringify(prev));
            const battingTeamKey = newMatch.currentInnings === 1 ? 'team1' : 'team2';
            const teamScore = newMatch.score[battingTeamKey];

            const event = {
                type, val, striker, timestamp: new Date(), overs: teamScore.overs, balls: teamScore.balls
            };

            if (type === 'RUNS') {
                teamScore.runs += val;
                teamScore.balls += 1;
            } else if (type === 'EXTRA') {
                teamScore.runs += 1;
                if (val === 'lb' || val === 'b') teamScore.balls += 1;
            } else if (type === 'WICKET') {
                teamScore.wickets += 1;
                teamScore.balls += 1;
            }

            if (teamScore.balls >= 6) {
                teamScore.overs += 1;
                teamScore.balls = 0;
            }

            newMatch.events = newMatch.events || [];
            newMatch.events.push(event);

            localStorage.setItem(`match_${id}`, JSON.stringify(newMatch));
            return newMatch;
        });
    };

    const queueOfflineAction = (action) => {
        const q = JSON.parse(localStorage.getItem(`queue_${id}`) || '[]');
        q.push(action);
        localStorage.setItem(`queue_${id}`, JSON.stringify(q));
    };

    const syncOfflineQueue = async () => {
        const q = JSON.parse(localStorage.getItem(`queue_${id}`) || '[]');
        if (q.length === 0) return;

        setSyncing(true);
        toast.loading(`Syncing ${q.length} offline scores...`, { id: 'sync' });

        try {
            for (const action of q) {
                await updateScore(id, action);
            }
            localStorage.removeItem(`queue_${id}`);
            toast.success('Scores synced successfully!', { id: 'sync' });
            fetchMatch(); // Refresh to get exact backend state
        } catch (err) {
            toast.error('Sync failed, will retry later', { id: 'sync' });
        } finally {
            setSyncing(false);
        }
    };

    const handleScore = async (type, val = null) => {
        if (!isOnline) {
            optimisticUpdate(type, val);
            queueOfflineAction({ type, val, striker });
            toast('Saved offline', { icon: '📴', duration: 2000 });
            if (type === 'RUNS' && (val === 1 || val === 3)) rotateStrike();
            return;
        }

        try {
            const { data } = await updateScore(id, { type, val, striker });
            setMatch(data);
            localStorage.setItem(`match_${id}`, JSON.stringify(data));

            // Logic for auto rotation on odd runs
            if (type === 'RUNS' && (val === 1 || val === 3)) {
                rotateStrike();
            }

            // Milestone detection
            if (type === 'WICKET') {
                toast.error('WICKET! Huge breakthrough!', { icon: '☝️', duration: 4000 });
            }
            if (type === 'RUNS' && val === 6) {
                toast.success('MAXIMUM! That is a huge six!', { icon: '🏏', duration: 3000 });
            }
        } catch (err) {
            if (!navigator.onLine) {
                setIsOnline(false);
                optimisticUpdate(type, val);
                queueOfflineAction({ type, val, striker });
                toast('Network lost. Saved offline', { icon: '📴', duration: 2000 });
            } else {
                toast.error('Failed to update score');
            }
            console.error(err);
        }
    };

    const handleUndo = async () => {
        if (!isOnline) {
            toast.error('Undo is disabled while offline');
            return;
        }
        try {
            const { data } = await undoScore(id);
            setMatch(data);
            localStorage.setItem(`match_${id}`, JSON.stringify(data));
        } catch (err) {
            console.error(err);
        }
    };

    const rotateStrike = () => {
        const temp = striker;
        setStriker(nonStriker);
        setNonStriker(temp);
    };

    if (loading || !match) return <div className="p-12 text-center text-gray-500">Initializing Match Center...</div>;

    const battingTeam = match.currentInnings === 1 ? match.score.team1 : match.score.team2;
    const rr = (battingTeam.runs / ((battingTeam.overs * 6 + battingTeam.balls) / 6 || 1)).toFixed(2);

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-4xl mx-auto">
            <Toaster position="top-right" reverseOrder={false} />

            {/* Offline Banner */}
            {(!isOnline || syncing) && (
                <div className={`p-3 text-center text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 ${syncing ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' : 'bg-orange-500/20 text-orange-400 border border-orange-500/20'}`}>
                    {syncing ? <><RefreshCw size={14} className="animate-spin" /> Syncing to server...</> : <><CloudOff size={14} /> Offline Mode - Actions saved locally</>}
                </div>
            )}

            {/* Top Header */}
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-3xl border border-white/5">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <div className="text-center">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Live Match Center</h2>
                    <div className="text-sm font-bold mt-0.5">{match.team1} vs {match.team2}</div>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                    <Settings size={20} className="text-gray-500" />
                </button>
            </div>

            {/* Main Scoreboard */}
            <div className="glass-panel p-8 flex flex-col items-center justify-center gap-2 relative overflow-hidden">
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-cricket-accent to-transparent opacity-50"></div>
                <div className="text-[10px] uppercase font-black tracking-widest text-cricket-accent mb-2">Current Score</div>
                <div className="text-6xl font-black tabular-nums tracking-tighter">
                    {battingTeam.runs}<span className="text-3xl text-gray-600 mx-1">/</span>{battingTeam.wickets}
                </div>
                <div className="text-lg font-mono text-gray-400 mt-2">
                    {battingTeam.overs}.{battingTeam.balls} <span className="text-sm text-gray-600 font-bold uppercase tracking-widest ml-1">Overs</span>
                </div>
            </div>

            <MatchAnalytics partnership={{ runs: 42, balls: 28 }} runRate={rr} />

            {/* Tabs */}
            <div className="flex gap-4 border-b border-white/5 overflow-x-auto no-scrollbar">
                {[
                    { id: 'scoring', label: 'Scoring', icon: Activity },
                    { id: 'commentary', label: 'Commentary', icon: MessageSquare },
                    { id: 'timeline', label: 'Timeline', icon: ClipboardList },
                    { id: 'stats', label: 'Stats', icon: Activity },
                    { id: 'scorecard', label: 'Scorecard', icon: ClipboardList },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative shrink-0 ${activeTab === tab.id ? 'text-cricket-accent' : 'text-gray-500 hover:text-white'
                            }`}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                        {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-cricket-accent rounded-t-full shadow-[0_-4px_10px_rgba(71,173,184,0.5)]" />}
                    </button>
                ))}
            </div>

            <div className="min-h-[500px]">
                {activeTab === 'scoring' && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <PlayerStatsMini
                                player={{ name: 'Virat Kohli', runs: 28, balls: 18, fours: 3, sixes: 1, strikeRate: '155.5' }}
                                isStriker={striker === 'p1'}
                                onRotate={rotateStrike}
                            />
                            <PlayerStatsMini
                                player={{ name: 'Rohit Sharma', runs: 14, balls: 10, fours: 2, sixes: 0, strikeRate: '140.0' }}
                                isStriker={striker === 'p2'}
                                onRotate={rotateStrike}
                            />
                        </div>

                        <div className="bg-white/5 p-8 rounded-[40px] border border-white/5 shadow-2xl">
                            <ScoreControls handleScore={handleScore} onUndo={handleUndo} />
                        </div>

                        <div className="glass-panel p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                    <Target size={24} className="text-red-500" />
                                </div>
                                <div>
                                    <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Active Bowler</div>
                                    <div className="text-sm font-bold">Pat Cummins</div>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                {[0, 1, 4, 1, 0, 6].map((ball, i) => (
                                    <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${ball === 6 ? 'bg-cricket-accent text-white' : 'bg-white/5 text-gray-400'
                                        }`}>
                                        {ball}
                                    </div>
                                ))}
                            </div>
                            <button className="text-xs font-black uppercase text-cricket-accent hover:underline">Change Bowler</button>
                        </div>
                    </div>
                )}

                {activeTab === 'commentary' && <CommentaryList events={match.events} />}
                {activeTab === 'timeline' && <MatchTimeline events={match.events || []} />}
                {activeTab === 'stats' && <MatchGraphs events={match.events || []} />}
                {activeTab === 'scorecard' && <ScorecardTable match={match} />}
            </div>
        </div>
    );
}
