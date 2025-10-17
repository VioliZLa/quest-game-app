import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GameProvider } from './context/GameContext';
import SplashScreen from './components/SplashScreen';
import HomeDashboard from './components/HomeDashboard';
import QuestDetails from './components/QuestDetails';
import GameScreen from './components/GameScreen';
import Profile from './components/Profile';
import TeamBattle from './components/TeamBattle';
import Achievements from './components/Achievements';
import StatsDashboard from './components/StatsDashboard';
import type { User, GameState } from './types';
import './App.css';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and user initialization
    const timer = setTimeout(() => {
      setUser({
        id: '1',
        username: 'QuestMaster',
        avatar: '/images/default-avatar.png',
        level: 1,
        xp: 0,
        completedQuests: [],
        badges: [],
        stats: {
          totalQuestsCompleted: 0,
          totalPoints: 0,
          currentStreak: 0,
          longestStreak: 0,
          averageCompletionTime: 0
        }
      });
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <GameProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<HomeDashboard user={user} />} />
            <Route path="/quest/:id" element={<QuestDetails user={user} />} />
            <Route path="/game/:questId" element={<GameScreen user={user} gameState={gameState} setGameState={setGameState} />} />
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
            <Route path="/team-battle" element={<TeamBattle user={user} />} />
            <Route path="/achievements" element={<Achievements user={user} completedQuests={[]} gameStats={{}} />} />
            <Route path="/stats" element={<StatsDashboard user={user} completedQuests={[]} gameStats={{}} />} />
          </Routes>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;
