import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Award, TrendingUp, Target, Shield, Trophy, Activity, Calendar, MapPin, User, ChevronRight, UserCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatsCard from '../components/player/StatsCard';

export default function PlayerProfile() {
    const { playerId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('batting');

    const performanceData = [
        { match: 'M1', runs: 12, wickets: 0, opponent: 'Australia', date: '12 Oct' },
        { match: 'M2', runs: 45, wickets: 2, opponent: 'England', date: '15 Oct' },
        { match: 'M3', runs: 28, wickets: 1, opponent: 'South Africa', date: '20 Oct' },
        { match: 'M4', runs: 82, wickets: 0, opponent: 'New Zealand', date: '25 Oct' },
        { match: 'M5', runs: 55, wickets: 3, opponent: 'Pakistan', date: '30 Oct' },
        { match: 'M6', runs: 102, wickets: 0, opponent: 'Sri Lanka', date: '05 Nov' },
    ];

    // Enhanced Mock player data with global stats
    const player = {
        id: playerId || 'p1',
        playerId: 'ST-1024',
        name: 'Virat Kohli',
        role: 'Top-order Batsman',
        team: 'India',
        battingStyle: 'Right-hand bat',
        bowlingStyle: 'Right-arm medium',
        careerStats: {
            matches: 254,
            runs: 12898,
            average: 57.32,
            strikeRate: 93.62,
            centuries: 46,
            fifties: 64,
            highestScore: '183',
            wickets: 4,
            economy: 6.21,
            bestBowling: '1/15'
        },
        recentMatches: [
            { id: 'm1', opponent: 'AUS', runs: 85, balls: 92, date: 'Mar 10, 2026', tournament: 'Champions League' },
            { id: 'm2', opponent: 'ENG', runs: 12, balls: 15, date: 'Mar 05, 2026', tournament: 'Champions League' },
            { id: 'm3', opponent: 'PAK', runs: 112, balls: 108, date: 'Feb 28, 2026', tournament: 'Asia Cup' },
            { id: 'm4', opponent: 'SA', runs: 45, balls: 41, date: 'Feb 15, 2026', tournament: 'Bilateral Series' },
        ]
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-5xl mx-auto">
            {/* Profile Header */}
            <div className="glass-panel p-8 relative overflow-hidden bg-gradient-to-br from-white/5 to-transparent border-white/5">
                <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
                    <User size={200} />
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-cricket-accent to-blue-500 p-1 shadow-2xl shadow-cricket-accent/30 group">
                        <div className="w-full h-full rounded-[22px] bg-cricket-dark flex items-center justify-center overflow-hidden border border-white/10 relative">
                            <UserCircle size={80} className="text-gray-600 transition-transform group-hover:scale-110" />
                            <div className="absolute bottom-0 w-full bg-cricket-accent/80 backdrop-blur-sm py-1 text-center">
                                <span className="text-[10px] font-black tracking-widest text-white uppercase">Active</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center md:text-left space-y-2">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <h2 className="text-4xl font-black tracking-tight">{player.name}</h2>
                            <span className="bg-white/5 text-gray-500 text-[10px] font-black px-3 py-1 rounded-lg border border-white/10 uppercase tracking-widest">{player.playerId}</span>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <span className="text-cricket-accent text-sm font-bold uppercase tracking-widest">{player.role}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span>
                            <span className="text-gray-400 text-sm font-medium">{player.team}</span>
                        </div>
                    </div>

                    <div className="flex-1 hidden md:flex justify-end gap-12">
                        <div className="text-center">
                            <div className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">Matches</div>
                            <div className="text-2xl font-black">{player.careerStats.matches}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-cricket-accent text-[10px] uppercase font-black tracking-widest mb-1">Lifetime Runs</div>
                            <div className="text-2xl font-black">{player.careerStats.runs}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-blue-500 text-[10px] uppercase font-black tracking-widest mb-1">Wickets</div>
                            <div className="text-2xl font-black">{player.careerStats.wickets}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Stats */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Section Tabs */}
                    <div className="flex gap-4 border-b border-white/5">
                        {[
                            { id: 'batting', label: 'Batting Stats', icon: Zap },
                            { id: 'bowling', label: 'Bowling Stats', icon: TrendingUp },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative ${activeTab === tab.id ? 'text-cricket-accent' : 'text-gray-500 hover:text-white'
                                    }`}
                            >
                                <tab.icon size={16} />
                                {tab.label}
                                {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-cricket-accent rounded-t-full" />}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'batting' && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <StatsCard label="Runs" value={player.careerStats.runs} icon={Zap} />
                            <StatsCard label="Average" value={player.careerStats.average} icon={Target} colorClass="text-blue-500" />
                            <StatsCard label="S/R" value={player.careerStats.strikeRate} icon={TrendingUp} colorClass="text-orange-500" />
                            <StatsCard label="100s / 50s" value={`${player.careerStats.centuries}/${player.careerStats.fifties}`} icon={Award} colorClass="text-yellow-500" />
                        </div>
                    )}

                    {activeTab === 'bowling' && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <StatsCard label="Wickets" value={player.careerStats.wickets} icon={TrendingUp} colorClass="text-purple-500" />
                            <StatsCard label="Economy" value={player.careerStats.economy} icon={Activity} colorClass="text-green-500" />
                            <StatsCard label="Best" value={player.careerStats.bestBowling} icon={Award} colorClass="text-blue-500" />
                            <StatsCard label="Innings" value="12" icon={TrendingUp} colorClass="text-gray-500" />
                        </div>
                    )}

                    <div className="space-y-4">
                        <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-black px-1">Performance Timeline</h3>
                        <div className="glass-panel p-8 h-48 flex items-end justify-between gap-2">
                            {[45, 82, 12, 112, 65, 85].map((val, i) => (
                                <div key={i} className="flex-1 bg-white/5 rounded-t-lg relative group transition-all hover:bg-cricket-accent/30" style={{ height: `${val}%` }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-cricket-dark border border-white/10 px-2 py-1 rounded text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity">
                                        {val}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Info & Recent */}
                <div className="space-y-8">
                    <div className="glass-panel p-6 space-y-6">
                        <h3 className="text-sm font-black tracking-tight flex items-center gap-2">
                            <User size={16} className="text-cricket-accent" /> Bio Information
                        </h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Batting Style', value: player.battingStyle },
                                { label: 'Bowling Style', value: player.bowlingStyle },
                                { label: 'Jersey Number', value: player.jerseyNumber || '18' },
                            ].map(item => (
                                <div key={item.label} className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{item.label}</span>
                                    <span className="text-sm font-bold">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-black px-1 flex justify-between items-center">
                            Recent Matches <Calendar size={14} />
                        </h3>
                        <div className="space-y-3">
                            {player.recentMatches.map(match => (
                                <div key={match.id} className="glass-panel p-4 flex justify-between items-center hover:bg-white/5 transition-all group">
                                    <div>
                                        <div className="text-xs font-black text-gray-200 group-hover:text-cricket-accent transition-colors">vs {match.opponent}</div>
                                        <div className="text-[10px] text-gray-600 font-medium">{match.date} • {match.tournament}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-black">{match.runs}<span className="text-[10px] text-gray-600 font-medium ml-1">({match.balls})</span></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats & Trends Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-panel p-8">
                        <h3 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-8 px-2">Career Progress</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={performanceData}>
                                    <defs>
                                        <linearGradient id="colorRuns" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#47adb8" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#47adb8" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis dataKey="match" stroke="#444" fontSize={10} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#444" fontSize={10} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                                    />
                                    <Area type="monotone" dataKey="runs" stroke="#47adb8" strokeWidth={3} fillOpacity={1} fill="url(#colorRuns)" />
                                    <Area type="monotone" dataKey="wickets" stroke="#ef4444" strokeWidth={2} fill="transparent" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="glass-panel p-8">
                        <h3 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-6">Recent Performances</h3>
                        <div className="space-y-4">
                            {performanceData.slice().reverse().map((perf, i) => (
                                <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-cricket-accent/10 flex items-center justify-center font-black text-xs text-cricket-accent">M{performanceData.length - i}</div>
                                        <div>
                                            <div className="text-sm font-bold">{perf.opponent || 'TBD'}</div>
                                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{perf.date || 'Recently'}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-black text-white">{perf.runs} ({perf.balls})</div>
                                        <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{perf.wickets > 0 ? `${perf.wickets} Wkts` : 'No Wkts'}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="glass-panel p-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-6">Physical Stats</h3>
                        <div className="space-y-6">
                            <div className="flex justify-between">
                                <span className="text-xs text-gray-500 font-bold">Age</span>
                                <span className="text-sm font-black">28 Years</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xs text-gray-500 font-bold">Height</span>
                                <span className="text-sm font-black">175 cm</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-xs text-gray-500 font-bold">Weight</span>
                                <span className="text-sm font-black">72 kg</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[40px] text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
                        <Trophy size={40} className="mb-4 opacity-50" />
                        <h4 className="text-xl font-black leading-tight">Match Winner Badges</h4>
                        <p className="text-blue-100/70 text-xs mt-2 font-medium">Earned 12 Man of the Match awards in professional leagues.</p>
                        <button className="mt-6 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">View Awards</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
