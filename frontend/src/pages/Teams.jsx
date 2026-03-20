import { useState } from 'react';
import { Search, Plus, Trophy, Users } from 'lucide-react';
import TeamCard from '../components/team/TeamCard';
import TeamForm from '../components/forms/TeamForm';

export default function TeamsPage() {
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState('');
    const [teams, setTeams] = useState([
        { id: '1', name: 'Mumbai Indians', shortName: 'MI', logo: '', wins: 12, losses: 4, nrr: '+0.850', color: '#004BA0' },
        { id: '2', name: 'Chennai Super Kings', shortName: 'CSK', logo: '', wins: 11, losses: 5, nrr: '+0.420', color: '#FFFF00' },
        { id: '3', name: 'Royal Challengers', shortName: 'RCB', logo: '', wins: 9, losses: 7, nrr: '+0.120', color: '#EC1C24' },
        { id: '4', name: 'Delhi Capitals', shortName: 'DC', logo: '', wins: 8, losses: 8, nrr: '-0.150', color: '#00008B' },
    ]);

    const handleCreateTeam = (data) => {
        const newTeam = {
            id: Date.now().toString(),
            ...data,
            wins: 0,
            losses: 0,
            nrr: '0.000',
            color: data.teamColor
        };
        setTeams([newTeam, ...teams]);
    };

    const filteredTeams = teams.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.shortName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black tracking-tight text-white">Teams</h2>
                    <p className="text-gray-500 font-medium mt-1">Manage and explore participating squads</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-500 text-white px-6 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-500/20 hover:scale-[1.05] active:scale-95 transition-all flex items-center gap-2"
                >
                    <Plus size={18} /> Add Team
                </button>
            </div>

            <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                    type="text"
                    placeholder="Search for teams by name or short code..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm focus:outline-none focus:border-blue-500 transition-all shadow-inner"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTeams.map(team => (
                    <TeamCard key={team.id} team={team} />
                ))}
            </div>

            {filteredTeams.length === 0 && (
                <div className="text-center p-20 glass-panel border-dashed border-2 border-white/5 rounded-[40px]">
                    <Users size={48} className="mx-auto text-gray-700 mb-4 opacity-20" />
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No teams found matching your search</p>
                </div>
            )}

            <TeamForm
                isOpen={showForm}
                onClose={() => setShowForm(false)}
                onSubmit={handleCreateTeam}
            />
        </div>
    );
}
