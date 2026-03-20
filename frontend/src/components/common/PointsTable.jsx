export default function PointsTable({ teams }) {
    return (
        <div className="glass-panel overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-gray-500 font-black">
                            <th className="px-6 py-4">Pos</th>
                            <th className="px-6 py-4">Team</th>
                            <th className="px-4 py-4 text-center">P</th>
                            <th className="px-4 py-4 text-center">W</th>
                            <th className="px-4 py-4 text-center">L</th>
                            <th className="px-4 py-4 text-center">Pts</th>
                            <th className="px-6 py-4 text-right">NRR</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {teams.sort((a, b) => b.pts - a.pts || b.nrr - a.nrr).map((team, index) => (
                            <tr key={team.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black ${index < 4 ? 'bg-cricket-accent/20 text-cricket-accent' : 'text-gray-600'
                                        }`}>
                                        {index + 1}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center font-bold text-[10px] border border-white/10 group-hover:scale-110 transition-transform">
                                            {team.shortName}
                                        </div>
                                        <span className="font-bold text-sm tracking-tight">{team.name}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-center text-sm font-medium text-gray-400">{team.p}</td>
                                <td className="px-4 py-4 text-center text-sm font-bold text-green-500">{team.w}</td>
                                <td className="px-4 py-4 text-center text-sm font-bold text-red-500/50">{team.l}</td>
                                <td className="px-4 py-4 text-center text-sm font-black text-white">{team.pts}</td>
                                <td className={`px-6 py-4 text-right text-sm font-mono ${team.nrr >= 0 ? 'text-blue-400' : 'text-orange-400'}`}>
                                    {team.nrr >= 0 ? '+' : ''}{team.nrr.toFixed(3)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4 bg-white/5 border-t border-white/5">
                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest text-center">
                    Top 4 teams qualify for the playoffs
                </p>
            </div>
        </div>
    );
}
