import { useNavigate } from 'react-router-dom';

export default function StatsCard({ label, value, subLabel, icon: Icon, colorClass = 'text-cricket-accent' }) {
    return (
        <div className="glass-panel p-5 flex flex-col gap-3 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <Icon size={48} />
            </div>

            <div className="flex items-center gap-2 text-gray-500 font-bold text-[10px] uppercase tracking-widest relative z-10">
                <Icon size={14} className={colorClass} />
                {label}
            </div>

            <div className="relative z-10">
                <div className="text-3xl font-black tabular-nums">{value}</div>
                {subLabel && <div className="text-[10px] text-gray-500 font-medium mt-1">{subLabel}</div>}
            </div>
        </div>
    );
}
