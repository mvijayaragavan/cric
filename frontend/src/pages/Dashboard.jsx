import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMatches, createMatch } from '../services/api';
import { Plus, Search } from 'lucide-react';
import Tabs from '../components/common/Tabs';
import MatchCard from '../components/match/MatchCard';

export default function Dashboard() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('live');
    const navigate = useNavigate();

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = async () => {
        try {
            const { data } = await getMatches();
            setMatches(data);
        } catch (error) {
            console.error('Failed to fetch matches', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateMatch = async () => {
        try {
            const { data } = await createMatch({
                team1: 'IND',
                team2: 'AUS',
                totalOvers: 20
            });
            navigate(`/match/${data._id}`);
        } catch (error) {
            console.error('Failed to create match', error);
        }
    };

    const tabs = [
        { id: 'live', label: 'Live' },
        { id: 'upcoming', label: 'Upcoming' },
        { id: 'completed', label: 'Completed' },
    ];

    // For demonstration, all matches are basically treated as live or completed based on status
    // Our backend defaults to 'ongoing'.
    const filteredMatches = matches.filter(match => {
        if (activeTab === 'live') return match.status === 'ongoing';
        if (activeTab === 'completed') return match.status === 'completed';
        if (activeTab === 'upcoming') return match.status === 'scheduled';
        return true;
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Search and Action Header */}
            <div className="flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search matches, teams..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-cricket-accent transition-colors"
                    />
                </div>
                <button
                    onClick={handleCreateMatch}
                    className="bg-cricket-accent text-white px-4 rounded-xl flex items-center justify-center hover:bg-cricket-accent/80 transition-colors shadow-lg shadow-cricket-accent/20"
                >
                    <Plus size={20} />
                </button>
            </div>

            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

            {/* Match List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="text-center p-10 text-gray-500 animate-pulse">Loading amazing cricket action...</div>
                ) : filteredMatches.length === 0 ? (
                    <div className="glass-panel p-10 text-center text-gray-500 border-dashed">
                        <div className="text-4xl mb-3">🏏</div>
                        <p className="font-semibold text-gray-300">No {activeTab} matches right now</p>
                        <p className="text-sm mt-1">When action happens, you'll see it here.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredMatches.map(match => (
                            <MatchCard key={match._id} match={match} />
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}
