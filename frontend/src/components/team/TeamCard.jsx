import { Link } from 'react-router-dom';

export default function TeamCard({ team }) {
    return (
        <Link to={`/teams/${team.id}`} className="glass-panel p-6 hover:border-cricket-accent transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-[0.03] -mr-16 -mt-16 rounded-full group-hover:scale-110 transition-transform" style={{ backgroundColor: team.color || '#47adb8' }}></div>

            <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-xl shadow-inner group-hover:scale-110 transition-transform" style={{ color: team.color || '#47adb8' }}>
                    {team.shortName}
                </div>
                <div className="text-right">
                    <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">W / L</div>
                    <div className="text-sm font-black text-white">{team.wins || 0} - {team.losses || 0}</div>
                </div>
            </div>

            <h3 className="text-lg font-black tracking-tight group-hover:text-cricket-accent transition-colors">{team.name}</h3>

            <div className="flex justify-between items-center mt-6">
                <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Net Run Rate</span>
                    <span className={`text-sm font-bold ${parseFloat(team.nrr) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {team.nrr || '0.000'}
                    </span>
                </div>
                <div className="w-2 h-2 rounded-full shadow-[0_0_10px_rgba(71,173,184,0.5)]" style={{ backgroundColor: team.color || '#47adb8' }}></div>
            </div>
        </Link>
    );
}
