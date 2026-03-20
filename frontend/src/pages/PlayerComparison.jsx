import { useState } from 'react';
import { Search, ArrowRight, TrendingUp, Zap, Target, Award } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default function PlayerComparison() {
    const [players, setPlayers] = useState([
        {
            id: '1', name: 'Virat Kohli', role: 'Batsman',
            stats: [
                { subject: 'Runs', A: 120, B: 110, fullMark: 150 },
                { subject: 'Strike Rate', A: 98, B: 130, fullMark: 150 },
                { subject: 'Average', A: 86, B: 130, fullMark: 150 },
                { subject: 'Matches', A: 99, B: 100, fullMark: 150 },
                { subject: 'Milestones', A: 85, B: 90, fullMark: 150 },
                { subject: 'Consistency', A: 65, B: 85, fullMark: 150 },
            ]
        },
        {
            id: '2', name: 'Rohit Sharma', role: 'Batsman',
            stats: []
        }
    ]);

    const data = [
        { subject: 'Runs', A: 120, B: 110, fullMark: 150 },
        { subject: 'Strike Rate', A: 98, B: 130, fullMark: 150 },
        { subject: 'Average', A: 86, B: 130, fullMark: 150 },
        { subject: 'Matches', A: 99, B: 100, fullMark: 150 },
        { subject: 'Milestones', A: 85, B: 90, fullMark: 150 },
        { subject: 'Consistency', A: 65, B: 85, fullMark: 150 },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-500 pb-20">
            <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-black tracking-tight">Player Comparison</h2>
                <p className="text-gray-500 font-medium">Side-by-side performance analysis</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="flex-1 glass-panel p-6 flex items-center justify-between border-cricket-accent bg-cricket-accent/5">
                            <div>
                                <div className="text-[10px] text-cricket-accent font-black uppercase tracking-widest mb-1">Player 1</div>
                                <div className="text-xl font-black">Virat Kohli</div>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                                <Search size={18} className="text-gray-500" />
                            </div>
                        </div>
                        <div className="text-gray-500 font-black italic">VS</div>
                        <div className="flex-1 glass-panel p-6 flex items-center justify-between border-red-500/50 bg-red-500/5">
                            <div>
                                <div className="text-[10px] text-red-500 font-black uppercase tracking-widest mb-1">Player 2</div>
                                <div className="text-xl font-black">Rohit Sharma</div>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400">
                                <Search size={18} />
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-8 space-y-8">
                        <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-gray-500 border-b border-white/5 pb-4">
                            <span>Virat Kohli</span>
                            <span>Metric</span>
                            <span>Rohit Sharma</span>
                        </div>

                        {[
                            { label: 'Runs', val1: '12,898', val2: '10,709', icon: Zap },
                            { label: 'Average', val1: '57.32', val2: '49.12', icon: Target },
                            { label: 'Strike Rate', val1: '93.62', val2: '91.20', icon: TrendingUp },
                            { label: 'Matches', val1: '254', val2: '238', icon: Award },
                        ].map((metric, i) => (
                            <div key={i} className="flex justify-between items-center group">
                                <div className="w-20 text-sm font-black">{metric.val1}</div>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 bg-white/5 px-4 py-2 rounded-full group-hover:bg-cricket-accent/10 group-hover:text-cricket-accent transition-all">
                                    <metric.icon size={12} />
                                    {metric.label}
                                </div>
                                <div className="w-20 text-sm font-black text-right">{metric.val2}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-panel p-8 h-[500px] flex items-center justify-center relative">
                    <div className="absolute top-8 left-8">
                        <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-black mb-4">Skill Comparison Radar</h3>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-cricket-accent"></div>
                                <span className="text-[10px] font-bold text-gray-400">VK</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span className="text-[10px] font-bold text-gray-400">RS</span>
                            </div>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                            <PolarGrid stroke="rgba(255,255,255,0.05)" />
                            <PolarAngleAxis dataKey="subject" stroke="#555" fontSize={10} fontStyle="bold" />
                            <Radar name="Virat Kohli" dataKey="A" stroke="#47adb8" fill="#47adb8" fillOpacity={0.4} />
                            <Radar name="Rohit Sharma" dataKey="B" stroke="#ef4444" fill="#ef4444" fillOpacity={0.4} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 border-l-4 border-yellow-500">
                    <div className="text-[10px] text-yellow-500 font-black uppercase tracking-widest mb-2">Insight</div>
                    <p className="text-sm text-gray-400 font-medium italic">"Virat Kohli shows 12% higher consistency during chase phases compared to Rohit Sharma."</p>
                </div>
                <div className="glass-panel p-6 border-l-4 border-green-500">
                    <div className="text-[10px] text-green-500 font-black uppercase tracking-widest mb-2">Power Metric</div>
                    <p className="text-sm text-gray-400 font-medium italic">"Rohit Sharma leads in explosive strike rate within the first 10 overs of ODI format."</p>
                </div>
                <div className="glass-panel p-6 border-l-4 border-blue-500">
                    <div className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-2">Career Projection</div>
                    <p className="text-sm text-gray-400 font-medium italic">"Both players are within 5% of each other in conversion rates for scores above 50."</p>
                </div>
            </div>
        </div>
    );
}
