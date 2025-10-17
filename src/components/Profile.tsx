import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Trophy, 
  Star, 
  Calendar, 
  Target, 
  Award,
  Settings,
  ArrowLeft,
  Edit3
} from 'lucide-react';
import type { User as UserType } from '../types';
import './Profile.css';

interface ProfileProps {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

const Profile = ({ user }: ProfileProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'stats' | 'badges' | 'history' | 'settings'>('stats');

  if (!user) {
    return (
      <div className="profile-error">
        <h2>Потребителят не е намерен</h2>
      </div>
    );
  }

  const tabs = [
    { id: 'stats', label: 'Статистики', icon: Target },
    { id: 'badges', label: 'Значки', icon: Award },
    { id: 'history', label: 'История', icon: Calendar },
    { id: 'settings', label: 'Настройки', icon: Settings }
  ];

  const mockBadges = [
    { id: '1', name: 'Първи стъпки', description: 'Завърши първия си куест', icon: '🎯', earned: true, earnedAt: new Date() },
    { id: '2', name: 'Исследовател', description: 'Завърши 5 куеста', icon: '🔍', earned: true, earnedAt: new Date() },
    { id: '3', name: 'Мастер', description: 'Завърши 10 куеста', icon: '👑', earned: false },
    { id: '4', name: 'Команден играч', description: 'Участвай в Team Battle', icon: '⚔️', earned: false },
    { id: '5', name: 'Бързо мислене', description: 'Завърши куест без подсказки', icon: '⚡', earned: true, earnedAt: new Date() }
  ];

  const mockHistory = [
    { id: '1', quest: 'Soul 90s', completedAt: new Date(), score: 450, time: 95 },
    { id: '2', quest: 'Цветен куест', completedAt: new Date(), score: 320, time: 78 },
    { id: '3', quest: 'Кореняк куест', completedAt: new Date(), score: 680, time: 156 }
  ];

  const renderStats = () => (
    <div className="stats-content">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Trophy className="icon" />
          </div>
          <div className="stat-info">
            <h3>{user.stats.totalQuestsCompleted}</h3>
            <p>Завършени куестове</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Star className="icon" />
          </div>
          <div className="stat-info">
            <h3>{user.stats.totalPoints}</h3>
            <p>Общо точки</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Target className="icon" />
          </div>
          <div className="stat-info">
            <h3>{user.stats.currentStreak}</h3>
            <p>Текуща серия</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Calendar className="icon" />
          </div>
          <div className="stat-info">
            <h3>{user.stats.averageCompletionTime}м</h3>
            <p>Средно време</p>
          </div>
        </div>
      </div>
      
      <div className="level-progress">
        <h3>Ниво {user.level}</h3>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(user.xp % 1000) / 10}%` }}
          />
        </div>
        <p>{user.xp} / 1000 XP</p>
      </div>
    </div>
  );

  const renderBadges = () => (
    <div className="badges-content">
      <div className="badges-grid">
        {mockBadges.map((badge) => (
          <motion.div
            key={badge.id}
            className={`badge-card ${badge.earned ? 'earned' : 'locked'}`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="badge-icon">
              {badge.icon}
            </div>
            <div className="badge-info">
              <h4>{badge.name}</h4>
              <p>{badge.description}</p>
              {badge.earned && badge.earnedAt && (
                <span className="earned-date">
                  Получена: {badge.earnedAt.toLocaleDateString('bg-BG')}
                </span>
              )}
            </div>
            {badge.earned && (
              <div className="badge-status">
                <Award className="earned-icon" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="history-content">
      <div className="history-list">
        {mockHistory.map((item) => (
          <div key={item.id} className="history-item">
            <div className="history-info">
              <h4>{item.quest}</h4>
              <p>Завършен: {item.completedAt.toLocaleDateString('bg-BG')}</p>
            </div>
            <div className="history-stats">
              <div className="history-stat">
                <Trophy className="stat-icon" />
                <span>{item.score} точки</span>
              </div>
              <div className="history-stat">
                <Calendar className="stat-icon" />
                <span>{item.time} мин</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="settings-content">
      <div className="settings-section">
        <h3>Профил</h3>
        <div className="setting-item">
          <label>Потребителско име</label>
          <div className="setting-input">
            <input type="text" value={user.username} readOnly />
            <Edit3 className="edit-icon" />
          </div>
        </div>
      </div>
      
      <div className="settings-section">
        <h3>Уведомления</h3>
        <div className="setting-item">
          <label>Push уведомления</label>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="setting-item">
          <label>Email уведомления</label>
          <input type="checkbox" />
        </div>
      </div>
      
      <div className="settings-section">
        <h3>Игра</h3>
        <div className="setting-item">
          <label>Звуци</label>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="setting-item">
          <label>Анимации</label>
          <input type="checkbox" defaultChecked />
        </div>
      </div>
    </div>
  );

  return (
    <div className="profile">
      {/* Header */}
      <header className="profile-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft className="back-icon" />
          Назад
        </button>
        
        <div className="profile-info">
          <div className="avatar">
            <User className="avatar-icon" />
          </div>
          <div className="user-details">
            <h1>{user.username}</h1>
            <p>Ниво {user.level} • {user.xp} XP</p>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <nav className="profile-tabs">
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

      {/* Quick Navigation */}
      <div className="quick-nav">
        <button 
          className="nav-btn"
          onClick={() => navigate('/stats')}
        >
          <Target className="nav-icon" />
          <span>Подробни статистики</span>
        </button>
        <button 
          className="nav-btn"
          onClick={() => navigate('/achievements')}
        >
          <Award className="nav-icon" />
          <span>Постижения</span>
        </button>
      </div>

      {/* Content */}
      <main className="profile-content">
        {activeTab === 'stats' && renderStats()}
        {activeTab === 'badges' && renderBadges()}
        {activeTab === 'history' && renderHistory()}
        {activeTab === 'settings' && renderSettings()}
      </main>
    </div>
  );
};

export default Profile;
