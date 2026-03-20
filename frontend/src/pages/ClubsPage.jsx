import React, { useState, useEffect } from 'react';
import { Users, Plus, Star, MapPin, Building, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getClubs, createClub } from '../services/api';
import toast from 'react-hot-toast';

const ClubCard = ({ club }) => (
    <Link
        to={`/clubs/${club._id || club.id}`}
        className="glass-panel p-6 hover:border-cricket-accent transition-all group relative overflow-hidden flex flex-col justify-between"
    >
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
            <Building size={80} />
        </div>

        <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="p-3 rounded-2xl bg-cricket-accent/10 border border-cricket-accent/20">
                <Building size={24} className="text-cricket-accent" />
            </div>
            {club.foundedYear && (
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 text-gray-400">
                    Est. {club.foundedYear}
                </span>
            )}
        </div>

        <div className="space-y-4 relative z-10 flex-grow">
            <div>
                <h3 className="text-xl font-black tracking-tight group-hover:text-cricket-accent transition-colors">{club.name}</h3>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1 line-clamp-2">{club.description || 'No description provided'}</p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
                {club.location && (
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <MapPin size={14} className="text-gray-600" />
                        <span>{club.location}</span>
                    </div>
                )}
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Users size={14} className="text-gray-600" />
                    <span>{club.teams?.length || 0} Teams</span>
                </div>
            </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center relative z-10">
            <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-bold">{club.tournaments?.length || 0} Tournaments</span>
            </div>
            <ChevronRight size={18} className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>
    </Link>
);

export default function ClubsPage() {
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // Form state
    const [formData, setFormData] = useState({ name: '', description: '', location: '', foundedYear: '' });

    useEffect(() => {
        fetchClubs();
    }, []);

    const fetchClubs = async () => {
        try {
            const { data } = await getClubs();
            setClubs(data || []);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load clubs');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateClub = async (e) => {
        e.preventDefault();
        try {
            const { data } = await createClub(formData);
            setClubs([data, ...clubs]);
            setShowForm(false);
            setFormData({ name: '', description: '', location: '', foundedYear: '' });
            toast.success('Club created successfully');
        } catch (err) {
            toast.error('Failed to create club');
            console.error(err);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-7xl mx-auto">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black tracking-tight">Organization Hub</h2>
                    <p className="text-gray-500 font-medium mt-1">Manage clubs, academies, and large group entities</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-cricket-accent text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-cricket-accent/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                    <Plus size={18} /> {showForm ? 'Cancel' : 'Create Club'}
                </button>
            </div>

            {showForm && (
                <div className="glass-panel p-6 mb-8 border border-cricket-accent/30 animate-in slide-in-from-top-4">
                    <h3 className="text-lg font-black mb-4">Register New Club</h3>
                    <form onSubmit={handleCreateClub} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Club Name</label>
                            <input
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-cricket-accent text-sm"
                                placeholder="e.g. Royal Strikers Academy"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Location</label>
                            <input
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-cricket-accent text-sm"
                                placeholder="City, Country"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Founded Year</label>
                            <input
                                type="number"
                                value={formData.foundedYear}
                                onChange={e => setFormData({ ...formData, foundedYear: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-cricket-accent text-sm"
                                placeholder="YYYY"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Description</label>
                            <input
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-cricket-accent text-sm"
                                placeholder="Short bio about the club"
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end mt-2">
                            <button type="submit" className="bg-cricket-dark border border-white/20 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition">Save Club</button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading organizations...</div>
            ) : clubs.length === 0 ? (
                <div className="text-center py-16 glass-panel rounded-3xl border border-white/5">
                    <Building size={48} className="mx-auto text-gray-600 mb-4" />
                    <h3 className="text-xl font-black text-gray-400">No clubs found</h3>
                    <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">Create a club to manage multiple teams, host localized tournaments, and track combined stats under one organization.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {clubs.map(club => <ClubCard key={club._id || club.id} club={club} />)}
                </div>
            )}
        </div>
    );
}
