import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Award, Zap, Crown } from 'lucide-react';
import { availableBadges, checkBadgeEligibility } from '../data/badges';
import type { Badge, User } from '../types';
import './Achievements.css';

interface AchievementsProps {
  user: User | null;
  completedQuests: any[];
  gameStats: any;
}

const Achievements = ({ user, completedQuests, gameStats }: AchievementsProps) => {
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const [showNewBadge, setShowNewBadge] = useState<Badge | null>(null);

  useEffect(() => {
    if (user) {
      const newBadges = checkBadgeEligibility(user, completedQuests, gameStats);
      setEarnedBadges(newBadges);
      
      // Показване на нова значка ако има такава
      const latestBadge = newBadges.find(badge => 
        !earnedBadges.some(earned => earned.id === badge.id)
      );
      
      if (latestBadge) {
        setShowNewBadge(latestBadge);
        setTimeout(() => setShowNewBadge(null), 3000);
      }
    }
  }, [user, completedQuests, gameStats]);

  const getBadgeIcon = (badge: Badge) => {
    switch (badge.id) {
      case 'first-quest':
        return <Trophy className="badge-icon" />;
      case 'explorer':
        return <Star className="badge-icon" />;
      case 'master':
        return <Crown className="badge-icon" />;
      case 'team-player':
        return <Zap className="badge-icon" />;
      default:
        return <Award className="badge-icon" />;
    }
  };

  const getBadgeRarity = (badge: Badge) => {
    switch (badge.id) {
      case 'master':
      case 'perfectionist':
        return 'legendary';
      case 'explorer':
      case 'streak-master':
        return 'epic';
      case 'quick-thinker':
      case 'treasure-hunter':
        return 'rare';
      default:
        return 'common';
    }
  };

  return (
    <div className="achievements">
      {/* New Badge Notification */}
      <AnimatePresence>
        {showNewBadge && (
          <motion.div
            className="new-badge-notification"
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="notification-content">
              <div className="badge-preview">
                {getBadgeIcon(showNewBadge)}
                <span className="badge-emoji">{showNewBadge.icon}</span>
              </div>
              <div className="notification-text">
                <h3>Нова значка!</h3>
                <h4>{showNewBadge.name}</h4>
                <p>{showNewBadge.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievements Grid */}
      <div className="achievements-grid">
        {availableBadges.map((badge) => {
          const earnedBadge = earnedBadges.find(earned => earned.id === badge.id);
          const isEarned = !!earnedBadge;
          const rarity = getBadgeRarity(badge);
          
          return (
            <motion.div
              key={badge.id}
              className={`achievement-card ${isEarned ? 'earned' : 'locked'} ${rarity}`}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="achievement-icon">
                {isEarned ? getBadgeIcon(badge) : <Award className="badge-icon locked" />}
                <span className="badge-emoji">{badge.icon}</span>
              </div>
              
              <div className="achievement-info">
                <h4 className={isEarned ? 'earned' : 'locked'}>
                  {badge.name}
                </h4>
                <p className={isEarned ? 'earned' : 'locked'}>
                  {badge.description}
                </p>
                
                {isEarned && earnedBadge?.earnedAt && (
                  <span className="earned-date">
                    Получена: {earnedBadge.earnedAt.toLocaleDateString('bg-BG')}
                  </span>
                )}
                
                {!isEarned && (
                  <div className="progress-hint">
                    {getProgressHint(badge.id, user, completedQuests)}
                  </div>
                )}
              </div>
              
              {isEarned && (
                <div className="achievement-status">
                  <Star className="earned-star" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const getProgressHint = (badgeId: string, user: any, completedQuests: any[]) => {
  switch (badgeId) {
    case 'first-quest':
      return `Завърши ${1 - completedQuests.length} куест(а) повече`;
    case 'explorer':
      return `Завърши ${5 - completedQuests.length} куест(а) повече`;
    case 'master':
      return `Завърши ${10 - completedQuests.length} куест(а) повече`;
    case 'team-player':
      return 'Участвай в Team Battle';
    case 'quick-thinker':
      return 'Завърши куест без подсказки';
    case 'perfectionist':
      return 'Завърши куест с максимални точки';
    case 'streak-master':
      return `Завърши ${3 - (user?.stats?.currentStreak || 0)} куест(а) подред`;
    default:
      return 'Продължи да играеш!';
  }
};

export default Achievements;
