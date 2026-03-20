export default function CommentaryList({ events }) {
    if (!events || events.length === 0) {
        return (
            <div className="text-center p-8 text-gray-500 italic border border-dashed border-white/10 rounded-xl mt-4">
                No commentary available yet.
            </div>
        );
    }

    // Reverse to show latest first
    const reversedEvents = [...events].reverse();

    return (
        <div className="space-y-4 mt-4 animate-in fade-in duration-500">
            {reversedEvents.map((ev, i) => {
                let badgeColor = 'bg-white/10 text-gray-300 border border-white/5';
                let display = '0';
                let text = 'Dot ball, solid defense.';

                if (ev.wicket) {
                    display = 'W';
                    badgeColor = 'bg-red-500/20 text-red-500 border border-red-500/50';
                    text = 'OUT! What a delivery. The batsman has to walk back.';
                } else if (ev.extra === 'wide') {
                    display = 'WD';
                    badgeColor = 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
                    text = 'Wide ball down the leg side.';
                } else if (ev.extra === 'no-ball') {
                    display = 'NB';
                    badgeColor = 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30';
                    text = 'No ball! Free hit coming up.';
                } else if (ev.runs !== undefined) {
                    display = ev.runs.toString();
                    if (ev.runs === 4) {
                        badgeColor = 'bg-blue-500/20 text-blue-400 border border-blue-500/50';
                        text = 'FOUR! Slammed through the covers for a boundary.';
                    } else if (ev.runs === 6) {
                        badgeColor = 'bg-cricket-accent/20 text-cricket-accent border border-cricket-accent/50 shadow-lg shadow-cricket-accent/20';
                        text = 'SIX! Massive hit! Out of the ground!';
                    } else if (ev.runs > 0) {
                        text = `Worked away for ${ev.runs} run(s).`;
                    }
                }

                return (
                    <div key={i} className="flex gap-4 p-4 glass-panel items-start hover:bg-white/5 transition-colors">
                        {/* Over info placeholder for now */}
                        <div className="w-12 text-sm text-gray-500 font-mono text-center flex-shrink-0 pt-1">
                            --
                        </div>

                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${badgeColor}`}>
                            {display}
                        </div>

                        <div className="pt-2">
                            <p className="text-gray-200 text-sm leading-relaxed">{ev.desc || text}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
