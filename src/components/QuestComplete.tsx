import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Star, 
  Home, 
  RotateCcw,
  Share2,
  Sparkles
} from 'lucide-react';
import type { Quest } from '../types';
import './QuestComplete.css';

interface QuestCompleteProps {
  quest: Quest;
  score: number;
  timeSpent: number;
  hintsUsed: number;
}

const QuestComplete = ({ quest, score, hintsUsed }: QuestCompleteProps) => {
  const navigate = useNavigate();

  const getCompletionMessage = (theme: string) => {
    switch (theme) {
      case 'soul90s':
        return {
          title: 'Поздравления!',
          subtitle: 'Ти си истинско дете на 90-те!',
          message: 'Успешно разгада всички загадки и доказа, че знаеш какво е истинската носталгия. Твоята душа винаги ще принадлежи на златната ера на музиката!',
          emoji: '🎵',
          color: 'soul90s'
        };
      case 'chalga':
        return {
          title: 'Опа-опа!',
          subtitle: 'Ти си топа! Завъртя го тоя куест!',
          message: 'Бляскаво! Ти доказа, че си истинска чалга звезда! С твоята енергия и страст успя да завъртиш най-бляскавия куест в града!',
          emoji: '💎',
          color: 'chalga'
        };
      case 'romance':
        return {
          title: 'Поздравления!',
          subtitle: 'Любовта печели винаги!',
          message: 'Ти доказа, че истинската любов никога не умира. Като истински романтик, успя да намериш пътя към сърцето на града.',
          emoji: '💕',
          color: 'romance'
        };
      case 'colorful':
        return {
          title: 'Поздравления!',
          subtitle: 'Ти си повелителя на цветовете!',
          message: 'Твоята креативност и чувство за красота те направиха истински художник на живота. Градът е по-цветен с теб!',
          emoji: '🎨',
          color: 'colorful'
        };
      case 'urban':
        return {
          title: 'Поздравления!',
          subtitle: 'Ти си истинският кореняк!',
          message: 'Доказа, че познаваш града отвътре навън. Като истински местен, знаеш всички скрити тайни и автентични места.',
          emoji: '🏙️',
          color: 'urban'
        };
      case 'teamBattle':
        return {
          title: 'Поздравления!',
          subtitle: 'Ти си легенда в битката!',
          message: 'Твоята стратегия и командния дух те направиха непобедим воин. Отборът ти е горд с теб!',
          emoji: '⚔️',
          color: 'teamBattle'
        };
      default:
        return {
          title: 'Поздравления!',
          subtitle: 'Ти си истинският майстор!',
          message: 'Успешно завърши куеста и доказа своите умения. Градът е по-добър с теб!',
          emoji: '🏆',
          color: 'default'
        };
    }
  };

  const completionData = getCompletionMessage(quest.theme);

  const handlePlayAgain = () => {
    navigate(`/game/${quest.id}`);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleShare = async () => {
    const shareText = `Завърших "${quest.title}" куеста с ${score} точки! 🎉`;
    const shareUrl = window.location.origin;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ViTa Pathfinder - Куест завършен!',
          text: shareText,
          url: shareUrl
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert('Съобщението е копирано в клипборда!');
    }
  };

  return (
    <div className={`quest-complete quest-complete--${completionData.color}`}>
      <motion.div
        className="completion-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Celebration Animation */}
        <motion.div
          className="celebration"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6, type: "spring", bounce: 0.6 }}
        >
          <div className="trophy-container">
            <Trophy className="trophy-icon" />
            <div className="sparkles">
              <Sparkles className="sparkle sparkle-1" />
              <Sparkles className="sparkle sparkle-2" />
              <Sparkles className="sparkle sparkle-3" />
              <Sparkles className="sparkle sparkle-4" />
            </div>
          </div>
        </motion.div>

        {/* Completion Message */}
        <motion.div
          className="completion-message"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="emoji-large">{completionData.emoji}</div>
          <h1 className="completion-title">{completionData.title}</h1>
          <h2 className="completion-subtitle">{completionData.subtitle}</h2>
          <p className="completion-text">{completionData.message}</p>
        </motion.div>

        {/* Quest Stats */}
        <motion.div
          className="quest-stats"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="stat-item">
            <Star className="stat-icon" />
            <div className="stat-content">
              <span className="stat-value">{score}</span>
              <span className="stat-label">Точки</span>
            </div>
          </div>
          <div className="stat-item">
            <Trophy className="stat-icon" />
            <div className="stat-content">
              <span className="stat-value">{quest.tasks.length}</span>
              <span className="stat-label">Задачи</span>
            </div>
          </div>
          <div className="stat-item">
            <RotateCcw className="stat-icon" />
            <div className="stat-content">
              <span className="stat-value">{hintsUsed}</span>
              <span className="stat-label">Подсказки</span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="action-buttons"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <button 
            className="action-btn primary"
            onClick={handlePlayAgain}
          >
            <RotateCcw className="btn-icon" />
            Играй отново
          </button>
          
          <button 
            className="action-btn secondary"
            onClick={handleShare}
          >
            <Share2 className="btn-icon" />
            Сподели
          </button>
          
          <button 
            className="action-btn tertiary"
            onClick={handleGoHome}
          >
            <Home className="btn-icon" />
            Начало
          </button>
        </motion.div>
      </motion.div>

      {/* Background Effects */}
      <div className="background-effects">
        <div className="confetti confetti-1"></div>
        <div className="confetti confetti-2"></div>
        <div className="confetti confetti-3"></div>
        <div className="confetti confetti-4"></div>
        <div className="confetti confetti-5"></div>
      </div>
    </div>
  );
};

export default QuestComplete;
