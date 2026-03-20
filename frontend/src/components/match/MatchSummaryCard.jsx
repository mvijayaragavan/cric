import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { Download, Share2, Award } from 'lucide-react';

export default function MatchSummaryCard({ match }) {
    const cardRef = useRef(null);

    const exportCard = async () => {
        if (!cardRef.current) return;
        const canvas = await html2canvas(cardRef.current, {
            backgroundColor: '#0f172a',
            scale: 2,
        });
        const link = document.createElement('a');
        link.download = `match-summary-${match.id}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center px-1">
                <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-black">Shareable Summary</h3>
                <button
                    onClick={exportCard}
                    className="flex items-center gap-2 text-[10px] font-black uppercase text-cricket-accent hover:underline"
                >
                    <Download size={14} /> Download PNG
                </button>
            </div>

            <div
                ref={cardRef}
                className="w-full aspect-[1.91/1] bg-gradient-to-br from-slate-900 to-cricket-dark border border-white/10 rounded-[40px] p-10 relative overflow-hidden shadow-2xl"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-cricket-accent opacity-10 blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 opacity-10 blur-[100px]"></div>

                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Match Completed</span>
                            </div>
                            <h2 className="text-sm font-black text-gray-500 uppercase tracking-widest">Stumps Professional League</h2>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-black text-white italic">STUMPS</div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center py-4">
                        <div className="text-center space-y-2">
                            <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-2xl text-white shadow-xl">
                                {match.team1.substring(0, 3).toUpperCase()}
                            </div>
                            <div className="text-sm font-black text-white">{match.team1}</div>
                            <div className="text-xl font-black text-cricket-accent">{match.score.team1.runs}/{match.score.team1.wickets}</div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <div className="text-xs font-black text-gray-600 italic">VS</div>
                            <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
                        </div>

                        <div className="text-center space-y-2">
                            <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-2xl text-white shadow-xl">
                                {match.team2.substring(0, 3).toUpperCase()}
                            </div>
                            <div className="text-sm font-black text-white">{match.team2}</div>
                            <div className="text-xl font-black text-cricket-accent">{match.score.team2.runs}/{match.score.team2.wickets}</div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Award className="text-yellow-500" size={20} />
                            <div>
                                <div className="text-[8px] font-black uppercase tracking-widest text-gray-500">Player of the Match</div>
                                <div className="text-xs font-black text-white">Virat Kohli (85 runs)</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-[8px] font-black uppercase tracking-widest text-gray-500">Result</div>
                            <div className="text-xs font-black text-green-500">{match.team1} won by 42 runs</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
