import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Users,
    Search,
    Filter,
    Plus,
    UserPlus,
    BarChart,
    History
} from 'lucide-react';
import Tabs from '../components/common/Tabs';
import PlayerCard from '../components/team/PlayerCard';

export default function SquadScreen() {
    const { teamId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('squad');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock team info
    const team = {
        id: teamId,
        name: 'Mumbai Indians',
        shortName: 'MI',
        logo: '',
        stats: {
            played: 54,
            won: 32,
            lost: 22,
            winRate: '59.2%'
        },
        players: [
            { id: 'p1', name: 'Rohit Sharma', role: 'batsman', battingStyle: 'Right-hand', isCaptain: true },
            { id: 'p2', name: 'Jasprit Bumrah', role: 'bowler', battingStyle: 'Right-hand', isCaptain: false },
            { id: 'p3', name: 'Hardik Pandya', role: 'allrounder', battingStyle: 'Right-hand', isCaptain: false },
            { id: 'p4', name: 'Suryakumar Yadav', role: 'batsman', battingStyle: 'Right-hand', isCaptain: false },
            { id: 'p5', name: 'Ishan Kishan', role: 'wicketkeeper', battingStyle: 'Left-hand', isCaptain: false },
        ]
    };

    const filteredPlayers = team.players.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate('/teams')} className="p-3 hover:bg-white/5 rounded-2xl transition-colors border border-white/5">
                        <ArrowLeft size={24} />
                    </button>
                    <div className="flex items-center gap-5">
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-400 p-0.5 shadow-2xl">
                            <div className="w-full h-full rounded-[22px] bg-cricket-dark flex items-center justify-center font-black text-2xl border border-white/10">
                                {team.shortName}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-black tracking-tight">{team.name}</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-gray-500 text-sm font-bold uppercase tracking-widest">{team.stats.winRate} Win Rate</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span>
                                <span className="text-gray-500 text-sm font-medium">{team.players.length} Players in Squad</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="bg-cricket-accent text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-cricket-accent/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                    <UserPlus size={18} /> Add Player
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-white/5">
                {[
                    { id: 'squad', label: 'Squad List', icon: Users },
                    { id: 'stats', label: 'Team Stats', icon: BarChart },
                    { id: 'history', label: 'Match History', icon: History },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative ${activeTab === tab.id ? 'text-cricket-accent' : 'text-gray-500 hover:text-white'
                            }`}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                        {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-cricket-accent rounded-t-full shadow-[0_-4px_10px_rgba(71,173,184,0.5)]" />}
                    </button>
                ))}
            </div>

            <div className="min-h-[400px]">
                {activeTab === 'squad' && (
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-4 justify-between">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search in squad..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-cricket-accent transition-all"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Sort By:</span>
                                <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none">
                                    <option>Name (A-Z)</option>
                                    <option>Role</option>
                                    <option>Matches played</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredPlayers.map(p => <PlayerCard key={p.id} player={p} />)}
                        </div>
                    </div>
                )}

                {activeTab === 'stats' && (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: 'Avg Runs/Match', value: '162.4' },
                            { label: 'Avg Wickets/Inns', value: '7.2' },
                            { label: 'Best Win Streak', value: '8 Matches' },
                            { label: 'Trophies Won', value: '5' },
                        ].map(stat => (
                            <div key={stat.label} className="glass-panel p-6 text-center group">
                                <div className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-2 group-hover:text-cricket-accent transition-colors">{stat.label}</div>
                                <div className="text-3xl font-black">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="glass-panel p-16 text-center text-gray-600 flex flex-col items-center gap-4">
                        <History size={64} className="opacity-10" />
                        <p className="font-medium italic">Complete team history is being archived.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
