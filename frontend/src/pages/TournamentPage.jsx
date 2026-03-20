import React, { useState } from 'react';
import { Trophy, Plus, Calendar, MapPin, Users, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TournamentForm from '../components/forms/TournamentForm';
import { createTournament } from '../services/api';

const TournamentCard = ({ tournament }) => (
    <Link
        to={`/tournaments/${tournament.id}`}
        className="glass-panel p-6 hover:border-cricket-accent transition-all group relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
            <Trophy size={80} />
        </div>

        <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="p-3 rounded-2xl bg-cricket-accent/10 border border-cricket-accent/20">
                <Trophy size={24} className="text-cricket-accent" />
            </div>
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${tournament.status === 'Ongoing' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'
                }`}>
                {tournament.status}
            </span>
        </div>

        <div className="space-y-4 relative z-10">
            <div>
                <h3 className="text-xl font-black tracking-tight group-hover:text-cricket-accent transition-colors">{tournament.name}</h3>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">{tournament.format} • {tournament.totalTeams} Teams</p>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar size={14} className="text-gray-600" />
                    <span>{tournament.dateRange}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <MapPin size={14} className="text-gray-600" />
                    <span>{tournament.location}</span>
                </div>
            </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center relative z-10">
            <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-white/5 border-2 border-cricket-dark flex items-center justify-center text-[10px] font-bold">
                        T{i}
                    </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-white/5 border-2 border-cricket-dark flex items-center justify-center text-[10px] text-gray-500">
                    +3
                </div>
            </div>
            <ChevronRight size={18} className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>
    </Link>
);

export default function TournamentPage() {
    const [showForm, setShowForm] = useState(false);
    const [tournaments, setTournaments] = useState([
        { id: 't1', name: 'Champions League 2026', format: 'T20', totalTeams: 12, dateRange: 'Mar 15 - Apr 10, 2026', location: 'London, UK', status: 'Ongoing' },
        { id: 't2', name: 'Summer Bash Series', format: 'T20', totalTeams: 8, dateRange: 'May 01 - May 20, 2026', location: 'Sydney, AUS', status: 'Upcoming' },
    ]);

    const handleCreateTournament = async (data) => {
        try {
            // Logic for backend call would go here
            // For now, prepend to mock list
            const newT = {
                id: Date.now().toString(),
                ...data,
                dateRange: `${data.startDate} - ${data.endDate}`,
                status: 'Upcoming'
            };
            setTournaments([newT, ...tournaments]);
            setShowForm(false); // Close form after submission
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black tracking-tight">Tournaments</h2>
                    <p className="text-gray-500 font-medium mt-1">Manage and track your competitive leagues</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-cricket-accent text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-cricket-accent/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                    <Plus size={18} /> Create Tournament
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tournaments.map(t => <TournamentCard key={t.id} tournament={t} />)}
            </div>

            <TournamentForm
                isOpen={showForm}
                onClose={() => setShowForm(false)}
                onSubmit={handleCreateTournament}
            />
        </div>
    );
}
