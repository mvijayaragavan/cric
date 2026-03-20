import { useNavigate } from 'react-router-dom';
import { User, RefreshCw } from 'lucide-react';

export default function PlayerStatsMini({ player, isStriker, onRotate }) {
    return (
        <div className={`glass-panel p-4 flex items-center justify-between border-l-4 transition-all ${isStriker ? 'border-l-cricket-accent bg-cricket-accent/5' : 'border-l-transparent opacity-60'
            }`}>
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center relative shadow-lg">
                    <User size={24} className={isStriker ? 'text-cricket-accent' : 'text-gray-600'} />
                    {isStriker && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-cricket-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(71,173,184,0.8)]"></div>
                    )}
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm">{player.name}</h4>
                        {isStriker && <span className="text-[10px] bg-cricket-accent text-white px-1.5 py-0.5 rounded-md font-black">*</span>}
                    </div>
                    <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-0.5">
                        {player.runs}({player.balls}) • 4s: {player.fours} • 6s: {player.sixes}
                    </div>
                </div>
            </div>

            <div className="text-right">
                <div className="text-sm font-black tracking-tight">{player.strikeRate}</div>
                <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">S/R</div>
            </div>

            {isStriker && (
                <button
                    onClick={onRotate}
                    className="ml-4 p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                    title="Rotate strike"
                >
                    <RefreshCw size={16} />
                </button>
            )}
        </div>
    );
}
