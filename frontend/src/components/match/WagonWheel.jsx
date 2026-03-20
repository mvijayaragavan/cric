export default function WagonWheel() {
    const regions = [
        { name: 'Cover', angle: 45, runs: 12 },
        { name: 'Mid Off', angle: 90, runs: 8 },
        { name: 'Mid On', angle: 135, runs: 15 },
        { name: 'Mid Wicket', angle: 180, runs: 22 },
        { name: 'Square Leg', angle: 225, runs: 9 },
        { name: 'Fine Leg', angle: 270, runs: 4 },
        { name: 'Third Man', angle: 315, runs: 6 },
        { name: 'Point', angle: 0, runs: 10 },
    ];

    return (
        <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-black px-1">Wagon Wheel</h3>
            <div className="glass-panel p-8 flex items-center justify-center">
                <div className="relative w-64 h-64 rounded-full border-4 border-[#2d5a27]/30 bg-[#346b2d] flex items-center justify-center overflow-hidden">
                    {/* Inner Pitch */}
                    <div className="absolute w-4 h-16 bg-[#c2d9ad]/40 border border-white/10"></div>

                    {/* Scoring Lines (Simplified) */}
                    {regions.map((region, i) => (
                        <div
                            key={i}
                            className="absolute origin-bottom transition-all hover:opacity-100 opacity-60 flex flex-col items-center"
                            style={{
                                height: '110px',
                                transform: `rotate(${region.angle}deg)`,
                                bottom: '50%'
                            }}
                        >
                            <div
                                className="w-0.5 bg-yellow-400/50"
                                style={{ height: `${Math.min(100, region.runs * 3)}px` }}
                            ></div>
                            <div className="text-[6px] font-black text-white mt-1 uppercase -rotate-45">{region.name}</div>
                        </div>
                    ))}

                    {/* Center Point */}
                    <div className="w-2 h-2 bg-white rounded-full z-10 shadow-lg"></div>
                </div>
            </div>
        </div>
    );
}
