import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Lightbulb, 
  CheckCircle, 
  XCircle, 
  Navigation,
  Trophy,
  Star
} from 'lucide-react';
import { getQuestById } from '../data/quests';
import QuestComplete from './QuestComplete';
import type { Quest, QuestTask, GameState } from '../types';
import './GameScreen.css';

interface GameScreenProps {
  user: any;
  gameState: GameState | null;
  setGameState: (state: GameState | null) => void;
}

const GameScreen = ({}: GameScreenProps) => {
  const { questId } = useParams<{ questId: string }>();
  const navigate = useNavigate();
  const [quest, setQuest] = useState<Quest | null>(null);
  const [currentTask, setCurrentTask] = useState<QuestTask | null>(null);
  const [taskIndex, setTaskIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [loading, setLoading] = useState(true);
  const [questCompleted, setQuestCompleted] = useState(false);

  useEffect(() => {
    if (questId) {
      const questData = getQuestById(questId);
      if (questData) {
        setQuest(questData);
        setCurrentTask(questData.tasks[0]);
        setLoading(false);
      }
    }
  }, [questId]);

  const handleAnswerSubmit = () => {
    if (!currentTask) return;

    const correct = userAnswer.toLowerCase().trim() === currentTask.answer.toLowerCase().trim();
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const points = currentTask.points - (hintsUsed * 10);
      setScore(prev => prev + points);
      
      // Mark task as completed
      if (quest) {
        const updatedQuest = {
          ...quest,
          tasks: quest.tasks.map((task, index) => 
            index === taskIndex ? { ...task, completed: true } : task
          )
        };
        setQuest(updatedQuest);
      }
    }

    setTimeout(() => {
      if (correct && quest) {
        if (taskIndex < quest.tasks.length - 1) {
          nextTask();
        } else {
          completeQuest();
        }
      } else {
        setShowResult(false);
        setUserAnswer('');
      }
    }, 2000);
  };

  const nextTask = () => {
    if (quest && taskIndex < quest.tasks.length - 1) {
      const nextIndex = taskIndex + 1;
      setTaskIndex(nextIndex);
      setCurrentTask(quest.tasks[nextIndex]);
      setUserAnswer('');
      setShowHint(false);
      setShowResult(false);
    }
  };

  const completeQuest = () => {
    setQuestCompleted(true);
  };

  const useHint = () => {
    setShowHint(true);
    setHintsUsed(prev => prev + 1);
  };

  const getProgressPercentage = () => {
    if (!quest) return 0;
    return ((taskIndex + 1) / quest.tasks.length) * 100;
  };

  if (loading) {
    return (
      <div className="game-screen-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!quest || !currentTask) {
    return (
      <div className="game-screen-error">
        <h2>Грешка при зареждане на куеста</h2>
        <button onClick={() => navigate('/')}>Назад към начало</button>
      </div>
    );
  }

  if (questCompleted) {
    return (
      <QuestComplete 
        quest={quest}
        score={score}
        timeSpent={0}
        hintsUsed={hintsUsed}
      />
    );
  }

  return (
    <div className={`game-screen game-screen--${quest.theme}`}>
      {/* Header */}
      <header className="game-header">
        <button 
          className="back-btn"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="back-icon" />
          Назад
        </button>
        
        <div className="quest-info">
          <h1>{quest.title}</h1>
          <div className="progress-info">
            <span>Задача {taskIndex + 1} от {quest.tasks.length}</span>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
        </div>

        <div className="score-info">
          <Trophy className="score-icon" />
          <span>{score} точки</span>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="game-main">
        <div className="game-content">
          {/* Task Card */}
          <motion.div
            className="task-card"
            key={taskIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="task-header">
              <div className="task-number">
                {taskIndex + 1}
              </div>
              <h2>{currentTask.title}</h2>
            </div>
            
            <div className="task-description">
              <p>{currentTask.description}</p>
            </div>

            <div className="task-location">
              <MapPin className="location-icon" />
              <span>{currentTask.location.address}</span>
            </div>

            {showHint && (
              <motion.div
                className="task-hint"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <Lightbulb className="hint-icon" />
                <span>{currentTask.hint}</span>
              </motion.div>
            )}
          </motion.div>

          {/* Answer Input */}
          <div className="answer-section">
            <div className="input-group">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Въведете вашия отговор..."
                className="answer-input"
                onKeyPress={(e) => e.key === 'Enter' && handleAnswerSubmit()}
                disabled={showResult}
              />
              <button
                className="submit-btn"
                onClick={handleAnswerSubmit}
                disabled={!userAnswer.trim() || showResult}
              >
                Изпрати
              </button>
            </div>

            <div className="action-buttons">
              <button
                className="hint-btn"
                onClick={useHint}
                disabled={showHint || showResult}
              >
                <Lightbulb className="hint-btn-icon" />
                Подсказка (-10 точки)
              </button>
            </div>
          </div>

          {/* Result Animation */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                className={`result-overlay ${isCorrect ? 'correct' : 'incorrect'}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="result-content">
                  {isCorrect ? (
                    <>
                      <CheckCircle className="result-icon correct" />
                      <h3>Правилно!</h3>
                      <p>+{currentTask.points - (hintsUsed * 10)} точки</p>
                    </>
                  ) : (
                    <>
                      <XCircle className="result-icon incorrect" />
                      <h3>Грешен отговор</h3>
                      <p>Опитайте отново</p>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <aside className="game-sidebar">
          <div className="sidebar-section">
            <h3>Прогрес</h3>
            <div className="progress-stats">
              <div className="stat">
                <span>Завършени:</span>
                <span>{taskIndex} / {quest.tasks.length}</span>
              </div>
              <div className="stat">
                <span>Точки:</span>
                <span>{score}</span>
              </div>
              <div className="stat">
                <span>Подсказки:</span>
                <span>{hintsUsed}</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Карта</h3>
            <div className="mini-map">
              <div className="map-placeholder">
                <Navigation className="map-icon" />
                <span>GPS позиция</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Следваща задача</h3>
            {taskIndex < quest.tasks.length - 1 ? (
              <div className="next-task-preview">
                <h4>{quest.tasks[taskIndex + 1].title}</h4>
                <p>{quest.tasks[taskIndex + 1].description.substring(0, 100)}...</p>
              </div>
            ) : (
              <div className="quest-complete">
                <Star className="complete-icon" />
                <span>Последна задача!</span>
              </div>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default GameScreen;
