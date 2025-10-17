import type { Badge } from '../types';

export const availableBadges: Badge[] = [
  {
    id: 'first-quest',
    name: 'Първи стъпки',
    description: 'Завърши първия си куест',
    icon: '🎯',
    earned: false
  },
  {
    id: 'explorer',
    name: 'Изследовател',
    description: 'Завърши 5 куеста',
    icon: '🔍',
    earned: false
  },
  {
    id: 'master',
    name: 'Мастер',
    description: 'Завърши 10 куеста',
    icon: '👑',
    earned: false
  },
  {
    id: 'team-player',
    name: 'Команден играч',
    description: 'Участвай в Team Battle',
    icon: '⚔️',
    earned: false
  },
  {
    id: 'quick-thinker',
    name: 'Бързо мислене',
    description: 'Завърши куест без подсказки',
    icon: '⚡',
    earned: false
  },
  {
    id: 'perfectionist',
    name: 'Перфекционист',
    description: 'Завърши куест с максимални точки',
    icon: '💎',
    earned: false
  },
  {
    id: 'night-owl',
    name: 'Нощна сова',
    description: 'Завърши куест след 22:00',
    icon: '🦉',
    earned: false
  },
  {
    id: 'early-bird',
    name: 'Ранна птица',
    description: 'Завърши куест преди 8:00',
    icon: '🐦',
    earned: false
  },
  {
    id: 'streak-master',
    name: 'Мастер на сериите',
    description: 'Завърши 3 куеста подред',
    icon: '🔥',
    earned: false
  },
  {
    id: 'social-butterfly',
    name: 'Социална пеперуда',
    description: 'Присъедини се към 5 отбора',
    icon: '🦋',
    earned: false
  },
  {
    id: 'treasure-hunter',
    name: 'Ловец на съкровища',
    description: 'Намери всички скрити локации',
    icon: '🗺️',
    earned: false
  },
  {
    id: 'time-traveler',
    name: 'Пътешественик във времето',
    description: 'Завърши всички тематични куестове',
    icon: '⏰',
    earned: false
  }
];

export const checkBadgeEligibility = (
  user: any,
  completedQuests: any[],
  gameStats: any
): Badge[] => {
  const earnedBadges: Badge[] = [];
  
  // Първи стъпки
  if (completedQuests.length >= 1) {
    earnedBadges.push({
      ...availableBadges[0],
      earned: true,
      earnedAt: new Date()
    });
  }
  
  // Изследовател
  if (completedQuests.length >= 5) {
    earnedBadges.push({
      ...availableBadges[1],
      earned: true,
      earnedAt: new Date()
    });
  }
  
  // Мастер
  if (completedQuests.length >= 10) {
    earnedBadges.push({
      ...availableBadges[2],
      earned: true,
      earnedAt: new Date()
    });
  }
  
  // Бързо мислене (без подсказки)
  if (gameStats.hintsUsed === 0 && completedQuests.length > 0) {
    earnedBadges.push({
      ...availableBadges[4],
      earned: true,
      earnedAt: new Date()
    });
  }
  
  // Перфекционист (максимални точки)
  if (gameStats.score >= 1000) {
    earnedBadges.push({
      ...availableBadges[5],
      earned: true,
      earnedAt: new Date()
    });
  }
  
  // Мастер на сериите
  if (user?.stats?.currentStreak >= 3) {
    earnedBadges.push({
      ...availableBadges[8],
      earned: true,
      earnedAt: new Date()
    });
  }
  
  return earnedBadges;
};
