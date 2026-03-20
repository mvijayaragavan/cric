import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Trophy,
    LayoutDashboard,
    Users,
    Calendar,
    BarChart2,
    Settings,
    Plus
} from 'lucide-react';
import MatchSummaryCard from '../components/match/MatchSummaryCard';
import PointsTable from '../components/common/PointsTable';
import MatchCard from '../components/match/MatchCard';

export default function TournamentDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    // Mock data for specific tournament
    const tournament = {
        id,
        name: 'Champions League 2026',
        format: 'T20',
        status: 'Ongoing',
        teams: [
            { id: '1', name: 'Mumbai Indians', shortName: 'MI', p: 5, w: 4, l: 1, pts: 8, nrr: 0.850 },
            { id: '2', name: 'Chennai Super Kings', shortName: 'CSK', p: 5, w: 3, l: 2, pts: 6, nrr: 0.420 },
            { id: '3', name: 'Royal Challengers', shortName: 'RCB', p: 4, w: 3, l: 1, pts: 6, nrr: 0.120 },
            { id: '4', name: 'Delhi Capitals', shortName: 'DC', p: 5, w: 2, l: 3, pts: 4, nrr: -0.210 },
            { id: '5', name: 'Gujarat Titans', shortName: 'GT', p: 5, w: 1, l: 4, pts: 2, nrr: -1.150 },
        ],
        matches: [
            { _id: 'm1', team1: 'MI', team2: 'CSK', status: 'completed', score: { team1: { runs: 185, wickets: 4 }, team2: { runs: 162, wickets: 8 } } },
            { _id: 'm2', team1: 'RCB', team2: 'DC', status: 'ongoing', score: { team1: { runs: 45, wickets: 1, overs: 5 }, team2: { runs: 0, wickets: 0 } } },
        ]
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'points', label: 'Points Table', icon: Trophy },
        { id: 'fixtures', label: 'Fixtures', icon: Calendar },
        { id: 'stats', label: 'Detailed Stats', icon: BarChart2 },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex items-center gap-6">
                <button onClick={() => navigate('/tournaments')} className="p-3 hover:bg-white/5 rounded-2xl transition-colors border border-white/5">
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h2 className="text-3xl font-black tracking-tight">{tournament.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="bg-cricket-accent/20 text-cricket-accent text-[10px] font-black px-2 py-0.5 rounded tracking-widest uppercase">{tournament.format}</span>
                        <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">• 12 Teams Participating</span>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide bg-white/5 p-1.5 rounded-2xl w-fit">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
                            ? 'bg-cricket-dark text-white shadow-xl scale-105'
                            : 'text-gray-500 hover:text-gray-300'
                            }`}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Render Content based on activeTab */}
            <div className="min-h-[500px]">
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-black px-1 flex justify-between items-center">
                                    Active Matches <Activity size={14} className="text-cricket-accent animate-pulse" />
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {tournament.matches.filter(m => m.status !== 'completed').map(m => (
                                        <MatchCard key={m._id} match={m} />
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-black px-1">Tournament History</h3>
                                {tournament.matches.map(match => (
                                    <div key={match._id}>
                                        <MatchCard match={match} />
                                        {match.status === 'completed' && (
                                            <div className="mt-4">
                                                <MatchSummaryCard match={match} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-black px-1">Recent Results</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {tournament.matches.filter(m => m.status === 'completed').map(m => (
                                        <MatchCard key={m._id} match={m} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-black px-1">Top Performers</h3>
                                <div className="glass-panel p-6 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center font-black text-orange-500">O</div>
                                            <div>
                                                <div className="text-sm font-bold">Virat Kohli</div>
                                                <div className="text-[10px] text-gray-500 font-medium">RCB • 432 Runs</div>
                                            </div>
                                        </div>
                                        <span className="text-xs font-black text-white bg-white/5 py-1 px-3 rounded-lg">#1</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center font-black text-purple-500">P</div>
                                            <div>
                                                <div className="text-sm font-bold">Jasprit Bumrah</div>
                                                <div className="text-[10px] text-gray-500 font-medium">MI • 15 Wickets</div>
                                            </div>
                                        </div>
                                        <span className="text-xs font-black text-white bg-white/5 py-1 px-3 rounded-lg">#1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'points' && <PointsTable teams={tournament.teams} />}

                {activeTab === 'fixtures' && (
                    <div className="glass-panel p-12 text-center text-gray-500 italic flex flex-col items-center gap-4">
                        <Calendar size={48} className="opacity-10" />
                        <p>Fixtures and scheduling management coming in the next update.</p>
                        <button className="bg-white/5 hover:bg-white/10 px-6 py-2 rounded-xl text-sm font-bold transition-all">Generate Auto Fixtures</button>
                    </div>
                )}

                {activeTab === 'stats' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Avg 1st Inn Score', value: '168' },
                            { label: 'Highest Total', value: '254/2' },
                            { label: 'Lowest Defended', value: '142' },
                            { label: 'Total 6s Hits', value: '342' },
                        ].map(stat => (
                            <div key={stat.label} className="glass-panel p-6 text-center">
                                <div className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-2">{stat.label}</div>
                                <div className="text-2xl font-black">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
