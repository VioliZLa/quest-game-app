import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Clock, MapPin, Users, Star, Zap } from 'lucide-react';
import { getQuestById } from '../data/quests';
import type { Quest } from '../types';
import './QuestDetails.css';

interface QuestDetailsProps {
  user: any;
}

const QuestDetails = ({}: QuestDetailsProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quest, setQuest] = useState<Quest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const questData = getQuestById(id);
      if (questData) {
        setQuest(questData);
      }
      setLoading(false);
    }
  }, [id]);

  const handleStartQuest = () => {
    if (quest) {
      navigate(`/game/${quest.id}`);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '#10b981';
      case 'medium':
        return '#f59e0b';
      case 'hard':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'Лесно';
      case 'medium':
        return 'Средно';
      case 'hard':
        return 'Трудно';
      default:
        return 'Неизвестно';
    }
  };

  if (loading) {
    return (
      <div className="quest-details-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!quest) {
    return (
      <div className="quest-details-error">
        <h2>Куестът не е намерен</h2>
        <button onClick={() => navigate('/')}>Назад към начало</button>
      </div>
    );
  }

  return (
    <div className={`quest-details quest-details--${quest.theme}`}>
      {/* Header */}
      <header className="quest-header">
        <button 
          className="back-btn"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="back-icon" />
          Назад
        </button>
        
        <div className="quest-title">
          <h1>{quest.title}</h1>
          <div className="quest-meta">
            <span 
              className="difficulty"
              style={{ color: getDifficultyColor(quest.difficulty) }}
            >
              {getDifficultyText(quest.difficulty)}
            </span>
            <span className="time">
              <Clock className="time-icon" />
              {quest.estimatedTime} мин
            </span>
            <span className="tasks">
              <Star className="tasks-icon" />
              {quest.tasks.length} задачи
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="quest-hero">
        <div className="hero-image">
          <div className="image-placeholder">
            {quest.theme === 'soul90s' && '🎵'}
            {quest.theme === 'colorful' && '🎨'}
            {quest.theme === 'urban' && '🏙️'}
            {quest.theme === 'romance' && '💕'}
            {quest.theme === 'teamBattle' && '⚔️'}
          </div>
        </div>
        
        <div className="hero-content">
          <motion.div
            className="quest-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>За куеста</h2>
            <p>{quest.description}</p>
          </motion.div>

          <motion.div
            className="quest-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="stat">
              <MapPin className="stat-icon" />
              <span>Градски куест</span>
            </div>
            <div className="stat">
              <Users className="stat-icon" />
              <span>1-4 играчи</span>
            </div>
            <div className="stat">
              <Zap className="stat-icon" />
              <span>Интерактивен</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="quest-preview">
        <motion.div
          className="preview-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3>Примерна задача</h3>
          <div className="preview-task">
            <div className="task-header">
              <span className="task-number">1</span>
              <h4>{quest.tasks[0]?.title}</h4>
            </div>
            <p className="task-description">{quest.tasks[0]?.description}</p>
            <div className="task-hint">
              <span className="hint-label">Подсказка:</span>
              <span className="hint-text">{quest.tasks[0]?.hint}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Action Section */}
      <section className="quest-actions">
        <motion.div
          className="action-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="action-info">
            <h3>Готов ли си за приключението?</h3>
            <p>Започни куеста и открий скритите тайни на града!</p>
          </div>
          
          <motion.button 
            className="start-quest-btn"
            onClick={handleStartQuest}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="start-icon" />
            Започни куеста
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default QuestDetails;
