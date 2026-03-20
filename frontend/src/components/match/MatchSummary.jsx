import { Trophy, Award, TrendingUp, Users } from 'lucide-react';

export default function MatchSummary({ match }) {
    const winner = match.score.team1.runs > match.score.team2.runs ? match.team1 : match.team2;
    const margin = Math.abs(match.score.team1.runs - match.score.team2.runs);

    return (
        <div className="space-y-8 animate-in zoom-in duration-500">
            <div className="glass-panel p-10 bg-gradient-to-br from-cricket-accent/20 to-transparent border-cricket-accent/30 text-center space-y-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <Trophy size={300} className="mx-auto" />
                </div>

                <div className="space-y-2 relative z-10">
                    <Trophy size={64} className="text-cricket-accent mx-auto mb-4 drop-shadow-[0_0_15px_rgba(71,173,184,0.5)]" />
                    <h2 className="text-3xl font-black tracking-tight">{winner} won by {margin} runs</h2>
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.3em]">Match Completed</p>
                </div>

                <div className="flex items-center justify-center gap-12 pt-8 relative z-10">
                    <div className="text-center">
                        <div className="text-xs text-gray-500 font-black uppercase tracking-widest mb-2">Player of the Match</div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-xl text-cricket-accent">VK</div>
                            <div className="text-sm font-bold">Virat Kohli</div>
                            <div className="text-[10px] text-gray-500 font-medium tracking-widest">85 Runs (92 Balls)</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-black px-1 flex items-center gap-2"><Award size={14} /> Key Highlights</h3>
                    <div className="space-y-3">
                        {[
                            'Highest Score: Virat Kohli (85)',
                            'Best Bowling: Jasprit Bumrah (3/42)',
                            'Most Sixes: Rohit Sharma (4)',
                        ].map(h => (
                            <div key={h} className="glass-panel p-4 text-sm font-bold border-l-4 border-l-cricket-accent">
                                {h}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-black px-1 flex items-center gap-2"><TrendingUp size={14} /> Social Impact</h3>
                    <div className="glass-panel p-6 flex flex-col items-center justify-center gap-4 text-center">
                        <Users size={32} className="text-blue-400 opacity-50" />
                        <p className="text-xs text-gray-400 font-medium italic">Shared 1,240 times on social platforms. Trending #1 in Cricket Leagues.</p>
                        <div className="flex gap-2">
                            {['Twitter', 'WhatsApp', 'Instagram'].map(s => (
                                <button key={s} className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all">{s}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
