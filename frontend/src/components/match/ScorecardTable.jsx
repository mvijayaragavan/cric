export default function ScorecardTable({ match }) {
    // A simplistic scorecard view based on available match data
    // Since our model only tracks team totals and not individual players right now,
    // we will build a placeholder table that reflects the data we have and mocks what a real one looks like.

    const teams = [
        { name: match.team1, score: match.score.team1 },
        { name: match.team2, score: match.score.team2 },
    ];

    return (
        <div className="space-y-6 mt-4 animate-in fade-in">
            {teams.map((t, idx) => (
                <div key={idx} className="glass-panel overflow-hidden border border-white/5">
                    {/* Header */}
                    <div className="bg-white/5 px-4 py-3 flex justify-between items-center border-b border-white/5">
                        <h3 className="font-bold text-cricket-accent">{t.name} Innings</h3>
                        <div className="font-mono font-bold text-gray-300">
                            {t.score.runs}/{t.score.wickets} <span className="text-xs text-gray-500 font-normal">({t.score.overs}.{t.score.balls} Ov)</span>
                        </div>
                    </div>

                    {/* Batting Mock Table */}
                    <div className="p-0 overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-black/20">
                                <tr>
                                    <th className="px-4 py-3">Batter</th>
                                    <th className="px-4 py-3 text-right">R</th>
                                    <th className="px-4 py-3 text-right">B</th>
                                    <th className="px-4 py-3 text-right">4s</th>
                                    <th className="px-4 py-3 text-right">6s</th>
                                    <th className="px-4 py-3 text-right">SR</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-white/5 text-gray-300">
                                    <td className="px-4 py-3 font-medium">Player 1 *</td>
                                    <td className="px-4 py-3 text-right font-bold text-white">{Math.floor(t.score.runs * 0.6)}</td>
                                    <td className="px-4 py-3 text-right text-gray-400">--</td>
                                    <td className="px-4 py-3 text-right text-gray-400">-</td>
                                    <td className="px-4 py-3 text-right text-gray-400">-</td>
                                    <td className="px-4 py-3 text-right text-gray-400">---</td>
                                </tr>
                                <tr className="border-b border-white/5 text-gray-300">
                                    <td className="px-4 py-3 font-medium">Player 2</td>
                                    <td className="px-4 py-3 text-right font-bold text-white">{Math.floor(t.score.runs * 0.4)}</td>
                                    <td className="px-4 py-3 text-right text-gray-400">--</td>
                                    <td className="px-4 py-3 text-right text-gray-400">-</td>
                                    <td className="px-4 py-3 text-right text-gray-400">-</td>
                                    <td className="px-4 py-3 text-right text-gray-400">---</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="px-4 py-3 bg-white/5 border-t border-white/5 text-xs text-gray-400">
                        * Detailed player stats require the advanced player model.
                    </div>
                </div>
            ))}
        </div>
    );
}
