import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GlobalLayout from './components/layout/GlobalLayout';
import Dashboard from './pages/Dashboard';
import ScoringPage from './pages/ScoringPage';
import TeamsPage from './pages/Teams';
import SquadScreen from './pages/SquadScreen';
import PlayerProfile from './pages/PlayerProfile';
import PlayerComparison from './pages/PlayerComparison';
import TournamentHighlights from './pages/TournamentHighlights';
import SearchPage from './pages/SearchPage';
import TournamentPage from './pages/TournamentPage';
import TournamentDetail from './pages/TournamentDetail';
import ClubsPage from './pages/ClubsPage';
import AiScoreGenerator from './pages/AiScoreGenerator';

// Placeholder for Players List using existing components
import PlayerCard from './components/team/PlayerCard';
const PlayersPage = () => {
  const mockPlayers = [
    { id: 'p1', name: 'Virat Kohli', role: 'batsman', battingStyle: 'Right-hand', isCaptain: true },
    { id: 'p2', name: 'Jasprit Bumrah', role: 'bowler', battingStyle: 'Right-hand', isCaptain: false },
    { id: 'p3', name: 'Hardik Pandya', role: 'allrounder', battingStyle: 'Right-hand', isCaptain: false },
  ];
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-4xl font-black tracking-tight">Top Players</h2>
        <p className="text-gray-500 font-medium mt-1">Discover elite talent across all tournaments</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockPlayers.map(p => <PlayerCard key={p.id} player={p} />)}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<GlobalLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/matches" element={<Dashboard />} />
          <Route path="/match/:id" element={<ScoringPage />} />
          <Route path="/tournaments" element={<TournamentPage />} />
          <Route path="/tournaments/:id" element={<TournamentDetail />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/ai-scorer" element={<AiScoreGenerator />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/teams/:teamId" element={<SquadScreen />} />
          <Route path="/players" element={<PlayersPage />} />
          <Route path="/players/:playerId" element={<PlayerProfile />} />
          <Route path="/profile" element={<PlayerProfile />} />
          <Route path="/comparison" element={<PlayerComparison />} />
          <Route path="/highlights" element={<TournamentHighlights />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
