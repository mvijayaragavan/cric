import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import MatchCard from '../components/match/MatchCard';
import TeamCard from '../components/team/TeamCard';
import PlayerCard from '../components/team/PlayerCard';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    // Mock data for search
    const data = {
        matches: [
            { _id: 'm1', team1: 'IND', team2: 'PAK', status: 'completed', totalOvers: 20, score: { team1: { runs: 160, wickets: 8, overs: 20, balls: 0 }, team2: { runs: 159, wickets: 8, overs: 20, balls: 0 } }, currentInnings: 1 },
        ],
        teams: [
            { id: '1', name: 'India', shortName: 'IND' },
            { id: '2', name: 'Australia', shortName: 'AUS' },
        ],
        players: [
            { id: 'p1', name: 'Virat Kohli', role: 'batsman', battingStyle: 'Right-hand' },
            { id: 'p2', name: 'Jasprit Bumrah', role: 'bowler', battingStyle: 'Right-hand' },
        ]
    };

    const filteredMatches = data.matches.filter(m => m.team1.includes(query.toUpperCase()) || m.team2.includes(query.toUpperCase()));
    const filteredTeams = data.teams.filter(t => t.name.toLowerCase().includes(query.toLowerCase()));
    const filteredPlayers = data.players.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                    autoFocus
                    type="text"
                    placeholder="Search matches, teams, players..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-lg focus:outline-none focus:border-cricket-accent transition-all shadow-2xl"
                />
                {query && (
                    <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                        <X size={20} />
                    </button>
                )}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {['all', 'matches', 'teams', 'players'].map(f => (
                    <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all ${activeFilter === f ? 'bg-cricket-accent text-white' : 'bg-white/5 text-gray-500 hover:text-gray-300'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="space-y-8">
                {(activeFilter === 'all' || activeFilter === 'matches') && filteredMatches.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-xs uppercase tracking-widest text-gray-500 font-black px-1">Matches</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {filteredMatches.map(m => <MatchCard key={m._id} match={m} />)}
                        </div>
                    </div>
                )}

                {(activeFilter === 'all' || activeFilter === 'teams') && filteredTeams.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-xs uppercase tracking-widest text-gray-500 font-black px-1">Teams</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {filteredTeams.map(t => <TeamCard key={t.id} team={t} />)}
                        </div>
                    </div>
                )}

                {(activeFilter === 'all' || activeFilter === 'players') && filteredPlayers.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-xs uppercase tracking-widest text-gray-500 font-black px-1">Players</h3>
                        <div className="grid grid-cols-1 gap-3">
                            {filteredPlayers.map(p => <PlayerCard key={p.id} player={p} />)}
                        </div>
                    </div>
                )}

                {query && filteredMatches.length === 0 && filteredTeams.length === 0 && filteredPlayers.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        No results found for "{query}"
                    </div>
                )}

                {!query && (
                    <div className="text-center py-20 text-gray-600 italic">
                        Start typing to search the world of cricket.
                    </div>
                )}
            </div>
        </div>
    );
}
