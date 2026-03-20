import { Trophy, Star, TrendingUp, Zap, Target, Award, Youtube } from 'lucide-react';

export default function TournamentHighlights() {
    const highlights = [
        { id: 1, title: 'Unstoppable Kohli: 112* (108)', team: 'RCB', event: 'Batting', desc: 'A masterclass inning taking the team to a massive total.', icon: Award },
        { id: 2, title: 'Bumrah\'s Triple Strike', team: 'MI', event: 'Bowling', desc: 'Jasprit Bumrah picks 3 wickets in an over to turn the game.', icon: Zap },
        { id: 3, title: 'Incredible Diving Catch', team: 'CSK', event: 'Fielding', desc: 'Ravindra Jadeja pulls off a stunner at deep mid-wicket.', icon: Target },
        { id: 4, title: 'Last Ball Thriller Finish', team: 'DC', event: 'Match', desc: 'Delhi Capitals win from the jaws of defeat against GT.', icon: Trophy },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-500 pb-20">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black tracking-tight">Tournament Highlights</h2>
                    <p className="text-gray-500 font-medium">Top moments and heroic performances</p>
                </div>
                <button className="bg-white/5 hover:bg-white/10 p-4 rounded-2xl flex items-center gap-2 border border-white/5 transition-all text-sm font-black uppercase text-gray-400">
                    <Youtube size={18} /> Watch All
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {highlights.map(item => (
                    <div key={item.id} className="glass-panel p-8 relative overflow-hidden group hover:border-cricket-accent transition-all cursor-pointer">
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12 group-hover:scale-125 transition-transform group-hover:text-cricket-accent">
                            <item.icon size={120} />
                        </div>

                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-cricket-accent/10 px-3 py-1 rounded-full text-[10px] font-black text-cricket-accent uppercase tracking-widest">
                                    {item.event}
                                </div>
                                <span className="text-gray-600 font-black">•</span>
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{item.team}</span>
                            </div>

                            <h3 className="text-2xl font-black tracking-tight group-hover:text-cricket-accent transition-colors">
                                {item.title}
                            </h3>

                            <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-sm">
                                {item.desc}
                            </p>

                            <div className="pt-4 flex items-center gap-4">
                                <button className="text-xs font-black uppercase tracking-widest text-white underline underline-offset-4 decoration-cricket-accent">Read Recap</button>
                                <button className="text-xs font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors">View Scorecard</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-panel p-10 bg-gradient-to-br from-cricket-accent/10 to-blue-500/10 flex flex-col md:flex-row justify-between items-center gap-8 border-cricket-accent/20">
                <div className="space-y-3">
                    <h3 className="text-2xl font-black tracking-tight">Generate Highlight Reel</h3>
                    <p className="text-gray-500 text-xs font-medium max-w-sm uppercase tracking-widest leading-loose">Automated AI-powered highlight video containing all boundaries and wickets from this tournament.</p>
                </div>
                <button className="bg-cricket-accent text-cricket-dark px-8 py-5 rounded-[22px] font-black text-sm uppercase tracking-widest shadow-xl shadow-cricket-accent/20 hover:scale-105 active:scale-95 transition-all">
                    Process Video
                </button>
            </div>
        </div>
    );
}
