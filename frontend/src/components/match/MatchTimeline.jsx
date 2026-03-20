import { Zap, Target, Award } from 'lucide-react';

export default function MatchTimeline({ events }) {
    // Sort events to show latest first
    const reversedEvents = [...events].reverse();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
                <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-black">Ball-by-Ball Timeline</h3>
                <div className="flex gap-2">
                    <span className="flex items-center gap-1 text-[10px] font-black text-cricket-accent uppercase"><div className="w-1.5 h-1.5 rounded-full bg-cricket-accent"></div> Boundary</span>
                    <span className="flex items-center gap-1 text-[10px] font-black text-red-500 uppercase"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Wicket</span>
                </div>
            </div>

            <div className="relative space-y-4 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/5">
                {reversedEvents.map((event, index) => {
                    const isBoundary = event.runs === 4 || event.runs === 6;
                    const isWicket = event.type === 'WICKET';

                    return (
                        <div key={index} className="flex gap-6 items-start group relative z-10">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shrink-0 shadow-lg transition-transform group-hover:scale-110 ${isWicket ? 'bg-red-500 text-white' :
                                    isBoundary ? 'bg-cricket-accent text-white' :
                                        'bg-white/5 text-gray-500 border border-white/5'
                                }`}>
                                {isWicket ? 'W' : event.runs}
                            </div>

                            <div className="glass-panel p-4 flex-1 space-y-1 group-hover:bg-white/10 transition-colors">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-black text-white">{event.overs}.{event.balls} Over</span>
                                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">{event.timestamp || 'Just now'}</span>
                                </div>
                                <p className={`text-sm ${isWicket || isBoundary ? 'font-bold' : 'text-gray-400'}`}>
                                    {event.description || `${event.bowler} to ${event.striker}, ${event.runs} run(s)`}
                                </p>
                                {isWicket && (
                                    <div className="mt-2 flex items-center gap-2 text-red-500/80 text-[10px] font-black uppercase tracking-widest">
                                        <Target size={12} /> Big Wicket for {event.bowler}
                                    </div>
                                )}
                                {isBoundary && (
                                    <div className="mt-2 flex items-center gap-2 text-cricket-accent/80 text-[10px] font-black uppercase tracking-widest">
                                        <Zap size={12} /> Massive {event.runs} from {event.striker}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}

                {reversedEvents.length === 0 && (
                    <div className="text-center p-12 text-gray-600 italic">
                        Match is about to start. No balls bowled yet.
                    </div>
                )}
            </div>
        </div>
    );
}
