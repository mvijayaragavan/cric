import { useState } from 'react';
import { X, Trophy, Calendar, MapPin, Users, Settings, Tag } from 'lucide-react';

export default function TournamentForm({ isOpen, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        format: 'T20',
        matchType: 'League',
        startDate: '',
        endDate: '',
        location: '',
        totalTeams: 8,
        organizerName: '',
        rules: {
            oversPerBowler: 4,
            powerplayOvers: 6
        }
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <div className="absolute inset-0 bg-cricket-dark/80 backdrop-blur-md" onClick={onClose}></div>

            <div className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 animate-in zoom-in duration-300">
                <div className="flex justify-between items-center p-6 border-b border-white/5 sticky top-0 bg-cricket-dark/50 backdrop-blur-xl z-20">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cricket-accent/20 flex items-center justify-center">
                            <Trophy size={20} className="text-cricket-accent" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black tracking-tight">Create Tournament</h3>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Set up your new professional league</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-500 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Basic Info Container */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Tournament Name</label>
                            <input
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Champions League 2026"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-cricket-accent transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Format</label>
                            <select
                                name="format"
                                value={formData.format}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-cricket-accent transition-all appearance-none"
                            >
                                <option value="T20">T20 (20 Overs)</option>
                                <option value="ODI">ODI (50 Overs)</option>
                                <option value="Test">Test Match</option>
                                <option value="Custom">Custom Overs</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                required
                                value={formData.startDate}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-cricket-accent transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Match Type</label>
                            <select
                                name="matchType"
                                value={formData.matchType}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-cricket-accent transition-all appearance-none"
                            >
                                <option value="League">League (Round Robin)</option>
                                <option value="Knockout">Knockout (Elimination)</option>
                                <option value="League + Knockout">Hybrid (League + Playoff)</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Venue / Location</label>
                            <div className="relative">
                                <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. London Staduim"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-sm focus:outline-none focus:border-cricket-accent transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Total Teams</label>
                            <div className="relative">
                                <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="number"
                                    name="totalTeams"
                                    value={formData.totalTeams}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-sm focus:outline-none focus:border-cricket-accent transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Rules Section */}
                    <div className="p-6 bg-white/5 rounded-3xl space-y-6">
                        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cricket-accent border-b border-white/5 pb-4">
                            <Settings size={14} /> Tournament Rules
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 font-black tracking-widest uppercase">Max Overs / Bowler</label>
                                <input
                                    type="number"
                                    name="rules.oversPerBowler"
                                    value={formData.rules.oversPerBowler}
                                    onChange={handleChange}
                                    className="w-full bg-cricket-dark border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-cricket-accent transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 font-black tracking-widest uppercase">Powerplay Overs</label>
                                <input
                                    type="number"
                                    name="rules.powerplayOvers"
                                    value={formData.rules.powerplayOvers}
                                    onChange={handleChange}
                                    className="w-full bg-cricket-dark border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-cricket-accent transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 sticky bottom-0 bg-cricket-dark py-4 mt-8 border-t border-white/5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 font-bold py-4 rounded-2xl transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] bg-cricket-accent hover:bg-cricket-accent/90 text-white font-black py-4 rounded-2xl shadow-xl shadow-cricket-accent/30 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            Launch Tournament
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
