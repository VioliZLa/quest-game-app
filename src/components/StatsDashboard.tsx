import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Target, 
  Clock, 
  TrendingUp, 
  Award,
  Calendar,
  Zap,
  MapPin
} from 'lucide-react';
import type { User } from '../types';
import './StatsDashboard.css';

interface StatsDashboardProps {
  user: User | null;
  completedQuests: any[];
  gameStats: any;
}

const StatsDashboard = ({ user, completedQuests }: StatsDashboardProps) => {
  const [stats, setStats] = useState({
    totalQuests: 0,
    totalPoints: 0,
    averageScore: 0,
    completionRate: 0,
    streak: 0,
    timePlayed: 0,
    favoriteTheme: '',
    achievements: 0
  });

  useEffect(() => {
    if (user) {
      const newStats = {
        totalQuests: completedQuests.length,
        totalPoints: user.stats.totalPoints,
        averageScore: completedQuests.length > 0 ? user.stats.totalPoints / completedQuests.length : 0,
        completionRate: 100, // За сега 100%, може да се изчисли по-сложно
        streak: user.stats.currentStreak,
        timePlayed: user.stats.averageCompletionTime * completedQuests.length,
        favoriteTheme: getFavoriteTheme(completedQuests),
        achievements: 0 // Ще се изчисли от значките
      };
      setStats(newStats);
    }
  }, [user, completedQuests]);

  const getFavoriteTheme = (quests: any[]) => {
    if (quests.length === 0) return 'Няма';
    
    const themeCount: { [key: string]: number } = {};
    quests.forEach(quest => {
      themeCount[quest.theme] = (themeCount[quest.theme] || 0) + 1;
    });
    
    const favorite = Object.entries(themeCount).reduce((a, b) => 
      themeCount[a[0]] > themeCount[b[0]] ? a : b
    );
    
    return getThemeName(favorite[0]);
  };

  const getThemeName = (theme: string) => {
    const themeNames: { [key: string]: string } = {
      'soul90s': 'Soul 90s',
      'colorful': 'Цветен куест',
      'urban': 'Кореняк куест',
      'romance': 'Ромео и Жулиета',
      'teamBattle': 'Team Battle'
    };
    return themeNames[theme] || theme;
  };

  const getLevel = (points: number) => {
    return Math.floor(points / 1000) + 1;
  };

  const getNextLevelPoints = (points: number) => {
    const currentLevel = getLevel(points);
    return currentLevel * 1000;
  };

  const getProgressToNextLevel = (points: number) => {
    const currentLevel = getLevel(points);
    const currentLevelPoints = (currentLevel - 1) * 1000;
    const nextLevelPoints = currentLevel * 1000;
    const progress = ((points - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;
    return Math.min(progress, 100);
  };

  const statCards = [
    {
      title: 'Общо куестове',
      value: stats.totalQuests,
      icon: <Trophy className="stat-icon" />,
      color: '#f59e0b',
      description: 'Завършени куестове'
    },
    {
      title: 'Общо точки',
      value: stats.totalPoints.toLocaleString(),
      icon: <Star className="stat-icon" />,
      color: '#10b981',
      description: 'Накрая точки'
    },
    {
      title: 'Среден резултат',
      value: Math.round(stats.averageScore),
      icon: <Target className="stat-icon" />,
      color: '#3b82f6',
      description: 'Точки на куест'
    },
    {
      title: 'Текуща серия',
      value: stats.streak,
      icon: <Zap className="stat-icon" />,
      color: '#ef4444',
      description: 'Последователни куестове'
    },
    {
      title: 'Време в игра',
      value: `${Math.round(stats.timePlayed)}м`,
      icon: <Clock className="stat-icon" />,
      color: '#8b5cf6',
      description: 'Общо време'
    },
    {
      title: 'Любима тема',
      value: stats.favoriteTheme,
      icon: <MapPin className="stat-icon" />,
      color: '#06b6d4',
      description: 'Най-играна тема'
    }
  ];

  return (
    <div className="stats-dashboard">
      <div className="stats-header">
        <h1>Статистики</h1>
        <p>Твоят прогрес в ViTa Pathfinder</p>
      </div>

      {/* Level Progress */}
      {user && (
        <motion.div
          className="level-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="level-info">
            <div className="level-badge">
              <Award className="level-icon" />
              <span className="level-number">Ниво {getLevel(user.stats.totalPoints)}</span>
            </div>
            <div className="level-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${getProgressToNextLevel(user.stats.totalPoints)}%` }}
                />
              </div>
              <div className="progress-text">
                <span>{user.stats.totalPoints} / {getNextLevelPoints(user.stats.totalPoints)} XP</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="stat-header">
              <div 
                className="stat-icon-container"
                style={{ backgroundColor: stat.color }}
              >
                {stat.icon}
              </div>
              <div className="stat-content">
                <h3>{stat.title}</h3>
                <p className="stat-description">{stat.description}</p>
              </div>
            </div>
            <div className="stat-value">
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        className="recent-activity"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2>Последна активност</h2>
        <div className="activity-list">
          {completedQuests.slice(-5).reverse().map((quest) => (
            <div key={quest.id} className="activity-item">
              <div className="activity-icon">
                <Calendar className="icon" />
              </div>
              <div className="activity-content">
                <h4>{quest.title}</h4>
                <p>Завършен на {new Date().toLocaleDateString('bg-BG')}</p>
              </div>
              <div className="activity-points">
                <Star className="points-icon" />
                <span>{quest.tasks.reduce((sum: number, task: any) => sum + task.points, 0)}</span>
              </div>
            </div>
          ))}
          {completedQuests.length === 0 && (
            <div className="no-activity">
              <p>Все още няма завършени куестове</p>
              <p>Започни първия си куест!</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Achievements Preview */}
      <motion.div
        className="achievements-preview"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2>Постижения</h2>
        <div className="achievements-summary">
          <div className="achievement-stat">
            <Trophy className="achievement-icon" />
            <div>
              <h4>Значки</h4>
              <p>0 получени</p>
            </div>
          </div>
          <div className="achievement-stat">
            <TrendingUp className="achievement-icon" />
            <div>
              <h4>Прогрес</h4>
              <p>Продължавай да играеш!</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StatsDashboard;
