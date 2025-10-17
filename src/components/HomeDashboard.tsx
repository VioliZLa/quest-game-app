import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, UserCircle, Trophy, Users, Zap } from 'lucide-react';
import { quests } from '../data/quests';
import type { Quest, QuestTheme } from '../types';
import './HomeDashboard.css';

interface HomeDashboardProps {
  user: any;
}

const HomeDashboard = ({ user }: HomeDashboardProps) => {
  const navigate = useNavigate();

  const getThemeIcon = (theme: QuestTheme) => {
    switch (theme) {
      case 'soul90s':
        return '🎵';
      case 'colorful':
        return '🎨';
      case 'urban':
        return '🏙️';
      case 'romance':
        return '💕';
      case 'teamBattle':
        return '⚔️';
      default:
        return '🎯';
    }
  };

  const getThemeClass = (theme: QuestTheme) => {
    return `quest-card quest-card--${theme}`;
  };

  const handleQuestClick = (quest: Quest) => {
    navigate(`/quest/${quest.id}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="home-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <motion.div
            className="logo"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <User className="logo-icon" />
            <span>ViTa Pathfinder</span>
          </motion.div>
          
          <motion.div
            className="user-section"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="user-info">
              <span className="username">Здравей, {user?.username}!</span>
              <div className="user-stats">
                <span className="level">Ниво {user?.level}</span>
                <span className="xp">{user?.xp} XP</span>
              </div>
            </div>
            <button 
              className="profile-btn"
              onClick={() => navigate('/profile')}
            >
              <UserCircle className="profile-icon" />
            </button>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <motion.div
          className="welcome-section"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1>Избери своя приключение</h1>
          <p>Открий скритите тайни на града чрез интерактивни куестове</p>
        </motion.div>

        {/* Quest Categories */}
        <motion.div
          className="quest-categories"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {quests.map((quest) => (
            <motion.div
              key={quest.id}
              className={getThemeClass(quest.theme)}
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuestClick(quest)}
            >
              <div className="quest-card-header">
                <div className="quest-icon">
                  {getThemeIcon(quest.theme)}
                </div>
                <div className="quest-difficulty">
                  {quest.difficulty === 'easy' && '🟢 Лесно'}
                  {quest.difficulty === 'medium' && '🟡 Средно'}
                  {quest.difficulty === 'hard' && '🔴 Трудно'}
                </div>
              </div>
              
              <div className="quest-card-content">
                <h3>{quest.title}</h3>
                <p>{quest.description}</p>
                <div className="quest-meta">
                  <span className="time">⏱️ {quest.estimatedTime} мин</span>
                  <span className="tasks">📋 {quest.tasks.length} задачи</span>
                </div>
              </div>
              
              <div className="quest-card-footer">
                <button className="start-btn">
                  <Zap className="start-icon" />
                  Старт
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="quick-actions"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button 
            className="quick-action-btn"
            onClick={() => navigate('/team-battle')}
          >
            <Users className="action-icon" />
            <span>Team Battle</span>
          </button>
          
          <button className="quick-action-btn">
            <Trophy className="action-icon" />
            <span>Класация</span>
          </button>
          
          <button className="quick-action-btn">
            <Zap className="action-icon" />
            <span>Случаен куест</span>
          </button>
        </motion.div>
      </main>
    </div>
  );
};

export default HomeDashboard;
