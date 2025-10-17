export interface Quest {
  id: string;
  title: string;
  description: string;
  theme: QuestTheme;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // in minutes
  coverImage: string;
  tasks: QuestTask[];
  completed: boolean;
  progress: number; // 0-100
}

export interface QuestTask {
  id: string;
  title: string;
  description: string;
  hint: string;
  answer: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  completed: boolean;
  points: number;
}

export type QuestTheme = 'soul90s' | 'chalga' | 'colorful' | 'urban' | 'romance' | 'teamBattle';

export interface User {
  id: string;
  username: string;
  avatar: string;
  level: number;
  xp: number;
  completedQuests: string[];
  badges: Badge[];
  stats: UserStats;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: Date;
}

export interface UserStats {
  totalQuestsCompleted: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  averageCompletionTime: number;
}

export interface Team {
  id: string;
  name: string;
  members: User[];
  score: number;
  currentQuest?: string;
  joinCode: string;
}

export interface GameState {
  currentQuest?: Quest;
  currentTask?: QuestTask;
  taskIndex: number;
  score: number;
  hintsUsed: number;
  startTime: Date;
}
