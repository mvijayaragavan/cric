import { Activity, Users, Target } from 'lucide-react';

export default function MatchAnalytics({ partnership, runRate, requiredRate }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-panel p-5 space-y-3 relative overflow-hidden">
                <div className="flex items-center gap-2 text-gray-500 font-black text-[10px] uppercase tracking-widest relative z-10">
                    <Users size={14} className="text-blue-500" />
                    Partnership
                </div>
                <div className="flex items-end justify-between relative z-10">
                    <div className="text-3xl font-black">{partnership.runs} <span className="text-xs text-gray-500">({partnership.balls})</span></div>
                    <div className="h-1 flex-1 bg-white/5 mx-4 mb-2 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: '65%' }}></div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Users size={48} />
                </div>
            </div>

            <div className="glass-panel p-5 space-y-3">
                <div className="flex items-center gap-2 text-gray-500 font-black text-[10px] uppercase tracking-widest">
                    <Target size={14} className="text-cricket-accent" />
                    Run Rate
                </div>
                <div className="flex items-baseline gap-4">
                    <div className="text-3xl font-black">{runRate}</div>
                    <div className={`text-[10px] font-bold uppercase ${parseFloat(runRate) > 8 ? 'text-green-500' : 'text-gray-500'}`}>
                        Current
                    </div>
                </div>
            </div>

            <div className="glass-panel p-5 bg-gradient-to-br from-white/5 to-transparent border-t-2 border-t-cricket-accent space-y-3">
                <div className="text-cricket-accent font-black text-[10px] uppercase tracking-widest">Required</div>
                <div className="text-3xl font-black">{requiredRate || 'N/A'}</div>
                <div className="text-[10px] text-gray-500 font-medium">Off -- overs</div>
            </div>
        </div>
    );
}
