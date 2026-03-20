import { useState } from 'react';
import { RotateCcw, UserMinus, Plus } from 'lucide-react';

export default function ScoreControls({ handleScore, onUndo }) {
    const [showWicketOptions, setShowWicketOptions] = useState(false);
    const [showExtraOptions, setShowExtraOptions] = useState(false);

    const dismissalTypes = [
        { id: 'bowled', label: 'Bowled' },
        { id: 'caught', label: 'Caught' },
        { id: 'lbw', label: 'LBW' },
        { id: 'runout', label: 'Run Out' },
        { id: 'stumped', label: 'Stumped' },
        { id: 'retired', label: 'Retired' }
    ];

    const extras = [
        { id: 'wd', label: 'Wide', val: 1 },
        { id: 'nb', label: 'No Ball', val: 1 },
        { id: 'lb', label: 'Leg Bye', val: 1 },
        { id: 'b', label: 'Bye', val: 1 }
    ];

    if (showWicketOptions) {
        return (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
                <div className="flex justify-between items-center px-2">
                    <h3 className="text-sm font-black uppercase tracking-widest text-red-500">Select Dismissal Type</h3>
                    <button onClick={() => setShowWicketOptions(false)} className="text-[10px] font-black uppercase text-gray-500 hover:text-white">Cancel</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {dismissalTypes.map(type => (
                        <button
                            key={type.id}
                            onClick={() => {
                                handleScore('WICKET', type.id);
                                setShowWicketOptions(false);
                            }}
                            className="glass-panel p-4 text-xs font-black uppercase hover:bg-red-500 hover:border-red-500 transition-all text-center"
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    if (showExtraOptions) {
        return (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
                <div className="flex justify-between items-center px-2">
                    <h3 className="text-sm font-black uppercase tracking-widest text-cricket-accent">Select Extra Type</h3>
                    <button onClick={() => setShowExtraOptions(false)} className="text-[10px] font-black uppercase text-gray-500 hover:text-white">Cancel</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {extras.map(extra => (
                        <button
                            key={extra.id}
                            onClick={() => {
                                handleScore('EXTRA', extra.id);
                                setShowExtraOptions(false);
                            }}
                            className="glass-panel p-4 text-xs font-black uppercase hover:bg-cricket-accent hover:border-cricket-accent transition-all text-center"
                        >
                            {extra.label}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                {[0, 1, 2, 3, 4, 6].map(runs => (
                    <button
                        key={runs}
                        onClick={() => handleScore('RUNS', runs)}
                        className="w-full aspect-square md:aspect-auto md:h-20 glass-panel flex flex-col items-center justify-center gap-1 hover:border-cricket-accent hover:bg-white/5 group transition-all"
                    >
                        <span className="text-2xl font-black group-hover:scale-110 transition-transform">{runs}</span>
                        <span className="text-[8px] font-black uppercase text-gray-500 tracking-widest">Runs</span>
                    </button>
                ))}
                <button
                    onClick={onUndo}
                    className="w-full aspect-square md:aspect-auto md:h-20 glass-panel flex flex-col items-center justify-center gap-1 hover:border-yellow-500/50 hover:bg-yellow-500/5 group transition-all"
                >
                    <RotateCcw size={20} className="text-yellow-500 group-hover:rotate-[-45deg] transition-transform" />
                    <span className="text-[8px] font-black uppercase text-gray-500 tracking-widest">Undo</span>
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => setShowExtraOptions(true)}
                    className="bg-white/5 border border-white/10 hover:border-cricket-accent py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-sm uppercase tracking-widest transition-all group"
                >
                    <Plus size={18} className="text-cricket-accent group-hover:rotate-90 transition-transform" />
                    Extras
                </button>
                <button
                    onClick={() => setShowWicketOptions(true)}
                    className="bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:border-red-500 py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-sm uppercase tracking-widest transition-all group"
                >
                    <UserMinus size={18} className="text-red-500 group-hover:text-white transition-colors" />
                    Wicket
                </button>
            </div>
        </div>
    );
}
