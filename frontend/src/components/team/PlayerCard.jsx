import { useNavigate } from 'react-router-dom';
import { User, Award } from 'lucide-react';

export default function PlayerCard({ player }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/players/${player.id}`)}
            className="glass-panel p-4 flex items-center gap-4 cursor-pointer hover:border-cricket-accent transition-all group relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-cricket-accent/0 to-cricket-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

            {/* Player Avatar */}
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 flex items-center justify-center shadow-lg relative z-10">
                <User size={28} className="text-gray-500" />
                {player.isCaptain && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-cricket-accent rounded-full border-2 border-cricket-dark flex items-center justify-center">
                        <span className="text-[10px] font-black text-white">C</span>
                    </div>
                )}
            </div>

            <div className="relative z-10 flex-1">
                <h4 className="font-bold text-gray-100 group-hover:text-cricket-accent transition-colors">{player.name}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{player.role}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                    <span className="text-[10px] font-medium text-gray-500">{player.battingStyle}</span>
                </div>
            </div>

            <Award size={20} className="text-gray-800 group-hover:text-yellow-500/50 transition-colors relative z-10" />
        </div>
    );
}
