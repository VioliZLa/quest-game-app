import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Plus, 
  UserPlus, 
  Trophy, 
  Crown, 
  Zap,
  ArrowLeft,
  Copy,
  CheckCircle,
} from 'lucide-react';
import type { User, Team } from '../types';
import './TeamBattle.css';

interface TeamBattleProps {
  user: User | null;
}

const TeamBattle = ({ user }: TeamBattleProps) => {
  const [activeTab, setActiveTab] = useState<'create' | 'join' | 'leaderboard'>('create');
  const [teamName, setTeamName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [showCodeCopied, setShowCodeCopied] = useState(false);

  // Mock data
  const mockTeams: Team[] = [
    {
      id: '1',
      name: 'Градските детективи',
      members: [
        { id: '1', username: 'Detective1', avatar: '', level: 5, xp: 1200, completedQuests: [], badges: [], stats: { totalQuestsCompleted: 8, totalPoints: 1200, currentStreak: 3, longestStreak: 5, averageCompletionTime: 45 } },
        { id: '2', username: 'Sleuth2', avatar: '', level: 4, xp: 950, completedQuests: [], badges: [], stats: { totalQuestsCompleted: 6, totalPoints: 950, currentStreak: 2, longestStreak: 4, averageCompletionTime: 52 } }
      ],
      score: 2150,
      joinCode: 'ABC123'
    },
    {
      id: '2',
      name: 'Тайните агенти',
      members: [
        { id: '3', username: 'AgentX', avatar: '', level: 6, xp: 1500, completedQuests: [], badges: [], stats: { totalQuestsCompleted: 10, totalPoints: 1500, currentStreak: 4, longestStreak: 7, averageCompletionTime: 38 } }
      ],
      score: 1500,
      joinCode: 'XYZ789'
    }
  ];

  useEffect(() => {
    setTeams(mockTeams);
  }, []);

  const generateJoinCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateTeam = () => {
    if (teamName.trim()) {
      const newTeam: Team = {
        id: Date.now().toString(),
        name: teamName,
        members: user ? [user] : [],
        score: 0,
        joinCode: generateJoinCode(),
        currentQuest: undefined
      };
      setTeams(prev => [...prev, newTeam]);
      setCurrentTeam(newTeam);
      setTeamName('');
    }
  };

  const handleJoinTeam = () => {
    const team = teams.find(t => t.joinCode === joinCode.toUpperCase());
    if (team && user) {
      const updatedTeam = {
        ...team,
        members: [...team.members, user]
      };
      setTeams(prev => prev.map(t => t.id === team.id ? updatedTeam : t));
      setCurrentTeam(updatedTeam);
      setJoinCode('');
    }
  };

  const copyJoinCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setShowCodeCopied(true);
    setTimeout(() => setShowCodeCopied(false), 2000);
  };

  const tabs = [
    { id: 'create', label: 'Създай отбор', icon: Plus },
    { id: 'join', label: 'Присъедини се', icon: UserPlus },
    { id: 'leaderboard', label: 'Класация', icon: Trophy }
  ];

  const renderCreateTeam = () => (
    <div className="create-team">
      <div className="form-section">
        <h3>Създай нов отбор</h3>
        <div className="input-group">
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Име на отбора"
            className="team-input"
          />
          <button 
            className="create-btn"
            onClick={handleCreateTeam}
            disabled={!teamName.trim()}
          >
            <Plus className="btn-icon" />
            Създай
          </button>
        </div>
      </div>

      {currentTeam && (
        <motion.div
          className="team-created"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h4>Отборът е създаден!</h4>
          <div className="team-info">
            <div className="team-details">
              <h5>{currentTeam.name}</h5>
              <p>Код за присъединяване:</p>
              <div className="join-code">
                <span className="code">{currentTeam.joinCode}</span>
                <button 
                  className="copy-btn"
                  onClick={() => copyJoinCode(currentTeam.joinCode)}
                >
                  {showCodeCopied ? <CheckCircle className="copy-icon" /> : <Copy className="copy-icon" />}
                </button>
              </div>
            </div>
            <div className="team-members">
              <h6>Членове ({currentTeam.members.length})</h6>
              <div className="members-list">
                {currentTeam.members.map((member) => (
                  <div key={member.id} className="member">
                    <div className="member-avatar">
                      <Users className="avatar-icon" />
                    </div>
                    <span>{member.username}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );

  const renderJoinTeam = () => (
    <div className="join-team">
      <div className="form-section">
        <h3>Присъедини се към отбор</h3>
        <div className="input-group">
          <input
            type="text"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            placeholder="Код на отбора"
            className="join-input"
            maxLength={6}
          />
          <button 
            className="join-btn"
            onClick={handleJoinTeam}
            disabled={!joinCode.trim()}
          >
            <UserPlus className="btn-icon" />
            Присъедини се
          </button>
        </div>
      </div>

      <div className="available-teams">
        <h4>Достъпни отбори</h4>
        <div className="teams-list">
          {teams.map((team) => (
            <div key={team.id} className="team-card">
              <div className="team-header">
                <h5>{team.name}</h5>
                <span className="member-count">{team.members.length} членове</span>
              </div>
              <div className="team-stats">
                <div className="stat">
                  <Trophy className="stat-icon" />
                  <span>{team.score} точки</span>
                </div>
                <div className="stat">
                  <Users className="stat-icon" />
                  <span>Ниво {Math.floor(team.members.reduce((acc, m) => acc + m.level, 0) / team.members.length)}</span>
                </div>
              </div>
              <button 
                className="join-team-btn"
                onClick={() => setJoinCode(team.joinCode)}
              >
                <UserPlus className="btn-icon" />
                Присъедини се
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="leaderboard">
      <h3>Класация на отборите</h3>
      <div className="leaderboard-list">
        {teams
          .sort((a, b) => b.score - a.score)
          .map((team, index) => (
            <motion.div
              key={team.id}
              className={`leaderboard-item ${index < 3 ? 'podium' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="rank">
                {index === 0 && <Crown className="crown-icon" />}
                <span className="rank-number">{index + 1}</span>
              </div>
              <div className="team-info">
                <h5>{team.name}</h5>
                <p>{team.members.length} членове</p>
              </div>
              <div className="team-score">
                <Trophy className="score-icon" />
                <span>{team.score}</span>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );

  return (
    <div className="team-battle">
      {/* Header */}
      <header className="battle-header">
        <button className="back-btn">
          <ArrowLeft className="back-icon" />
          Назад
        </button>
        
        <div className="header-content">
          <h1>Team Battle</h1>
          <p>Състезавай се с други отбори в епични битки</p>
        </div>
      </header>

      {/* Tabs */}
      <nav className="battle-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              <Icon className="tab-icon" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Content */}
      <main className="battle-content">
        {activeTab === 'create' && renderCreateTeam()}
        {activeTab === 'join' && renderJoinTeam()}
        {activeTab === 'leaderboard' && renderLeaderboard()}
      </main>

      {/* Battle Status */}
      {currentTeam && (
        <motion.div
          className="battle-status"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="status-content">
            <div className="team-info">
              <h4>{currentTeam.name}</h4>
              <span>{currentTeam.members.length} членове</span>
            </div>
            <div className="battle-actions">
              <button className="start-battle-btn">
                <Zap className="action-icon" />
                Започни битка
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TeamBattle;
