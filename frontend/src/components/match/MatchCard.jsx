import { useNavigate } from 'react-router-dom';

export default function MatchCard({ match }) {
    const navigate = useNavigate();

    const isLive = match.status === 'ongoing';
    const battingTeamObj = match.currentInnings === 1 ? match.score.team1 : match.score.team2;

    return (
        <div
            onClick={() => navigate(`/match/${match._id}`)}
            className="glass-panel p-5 cursor-pointer hover:border-cricket-accent transition-all group relative overflow-hidden flex flex-col gap-4"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-cricket-accent/0 to-cricket-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

            {/* Header */}
            <div className="flex justify-between items-center relative z-10 border-b border-white/5 pb-3">
                <span className="text-xs text-gray-400 font-medium tracking-wide">
                    T20 Match • {match.totalOvers} Overs
                </span>
                {isLive && (
                    <div className="flex items-center gap-1.5 bg-red-500/10 text-red-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border border-red-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                        Live
                    </div>
                )}
            </div>

            {/* Teams & Scores */}
            <div className="relative z-10 flex flex-col gap-3">
                {/* Team 1 */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs text-gray-300">
                            {match.team1.substring(0, 2)}
                        </div>
                        <h4 className="text-lg font-bold">{match.team1}</h4>
                    </div>
                    <div className="text-right">
                        <div className="text-lg font-black tracking-tight">
                            {match.score.team1.runs}/{match.score.team1.wickets}
                        </div>
                        <div className="text-xs text-gray-500 font-mono">
                            {match.score.team1.overs}.{match.score.team1.balls}
                        </div>
                    </div>
                </div>

                {/* Team 2 */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs text-gray-300">
                            {match.team2.substring(0, 2)}
                        </div>
                        <h4 className="text-lg font-bold">{match.team2}</h4>
                    </div>
                    <div className="text-right">
                        <div className="text-lg font-black tracking-tight text-gray-400">
                            {match.score.team2.overs === 0 && match.score.team2.balls === 0 && !isLive ? '0/0' : `${match.score.team2.runs}/${match.score.team2.wickets}`}
                        </div>
                        <div className="text-xs text-gray-500 font-mono">
                            {match.score.team2.overs}.{match.score.team2.balls}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer / Match Summary */}
            <div className="relative z-10 pt-2 border-t border-white/5 text-xs text-brand-accent font-medium text-cricket-accent/80">
                {isLive
                    ? `${match.currentInnings === 1 ? match.team1 : match.team2} is batting`
                    : 'Match ' + match.status}
            </div>
        </div>
    );
}
