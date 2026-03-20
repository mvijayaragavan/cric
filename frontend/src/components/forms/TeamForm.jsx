import { useState } from 'react';
import { X, Users, User, Shield, Palette, Type } from 'lucide-react';

export default function TeamForm({ isOpen, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        shortName: '',
        teamManager: '',
        teamColor: '#47adb8',
        logo: ''
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-cricket-dark/80 backdrop-blur-md" onClick={onClose}></div>

            <div className="glass-panel w-full max-w-lg relative z-10 animate-in zoom-in duration-300">
                <div className="flex justify-between items-center p-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                            <Users size={20} className="text-blue-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black tracking-tight">Register Team</h3>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Build a winning squad identity</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-500 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2 space-y-2">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Team Name</label>
                            <div className="relative">
                                <Type size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Mumbai Indians"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-sm focus:outline-none focus:border-cricket-accent transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Short Code</label>
                            <input
                                name="shortName"
                                required
                                maxLength={4}
                                value={formData.shortName}
                                onChange={handleChange}
                                placeholder="MI"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-cricket-accent transition-all text-center font-black uppercase"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Team Manager</label>
                        <div className="relative">
                            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                name="teamManager"
                                value={formData.teamManager}
                                onChange={handleChange}
                                placeholder="Manager Full Name"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-sm focus:outline-none focus:border-cricket-accent transition-all"
                            />
                        </div>
                    </div>

                    <div className="p-6 bg-white/5 rounded-3xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full border-2 border-white/10 shadow-lg" style={{ backgroundColor: formData.teamColor }}></div>
                            <div>
                                <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Theme Color</div>
                                <div className="text-sm font-bold">{formData.teamColor.toUpperCase()}</div>
                            </div>
                        </div>
                        <div className="relative flex items-center gap-2">
                            <Palette size={16} className="text-gray-500" />
                            <input
                                type="color"
                                name="teamColor"
                                value={formData.teamColor}
                                onChange={handleChange}
                                className="w-12 h-12 bg-transparent border-0 rounded-full cursor-pointer overflow-hidden p-0"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all mt-4"
                    >
                        Create Team Identity
                    </button>
                </form>
            </div>
        </div>
    );
}
