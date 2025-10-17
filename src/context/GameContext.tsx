import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { User, Quest, GameState, Badge } from '../types';

interface GameContextType {
  user: User | null;
  gameState: GameState | null;
  completedQuests: Quest[];
  badges: Badge[];
  updateUser: (user: User) => void;
  startQuest: (quest: Quest) => void;
  completeTask: (taskId: string, points: number) => void;
  completeQuest: (quest: Quest) => void;
  addBadge: (badge: Badge) => void;
  updateScore: (points: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

type GameAction =
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'START_QUEST'; payload: Quest }
  | { type: 'COMPLETE_TASK'; payload: { taskId: string; points: number } }
  | { type: 'COMPLETE_QUEST'; payload: Quest }
  | { type: 'ADD_BADGE'; payload: Badge }
  | { type: 'UPDATE_SCORE'; payload: number };

const gameReducer = (state: any, action: GameAction) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return { ...state, user: action.payload };
    
    case 'START_QUEST':
      return {
        ...state,
        gameState: {
          currentQuest: action.payload,
          currentTask: action.payload.tasks[0],
          taskIndex: 0,
          score: 0,
          hintsUsed: 0,
          startTime: new Date()
        }
      };
    
    case 'COMPLETE_TASK':
      if (!state.gameState) return state;
      
      const updatedTasks = state.gameState.currentQuest.tasks.map((task: any) =>
        task.id === action.payload.taskId
          ? { ...task, completed: true }
          : task
      );
      
      return {
        ...state,
        gameState: {
          ...state.gameState,
          currentQuest: {
            ...state.gameState.currentQuest,
            tasks: updatedTasks
          },
          score: state.gameState.score + action.payload.points
        }
      };
    
    case 'COMPLETE_QUEST':
      const newCompletedQuests = [...state.completedQuests, action.payload];
      const newUser = state.user ? {
        ...state.user,
        completedQuests: [...state.user.completedQuests, action.payload.id],
        stats: {
          ...state.user.stats,
          totalQuestsCompleted: state.user.stats.totalQuestsCompleted + 1,
          totalPoints: state.user.stats.totalPoints + state.gameState?.score || 0
        }
      } : state.user;
      
      return {
        ...state,
        user: newUser,
        completedQuests: newCompletedQuests,
        gameState: null
      };
    
    case 'ADD_BADGE':
      return {
        ...state,
        badges: [...state.badges, action.payload]
      };
    
    case 'UPDATE_SCORE':
      return {
        ...state,
        user: state.user ? {
          ...state.user,
          stats: {
            ...state.user.stats,
            totalPoints: state.user.stats.totalPoints + action.payload
          }
        } : state.user
      };
    
    default:
      return state;
  }
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, {
    user: null,
    gameState: null,
    completedQuests: [],
    badges: []
  });

  const updateUser = (user: User) => {
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  const startQuest = (quest: Quest) => {
    dispatch({ type: 'START_QUEST', payload: quest });
  };

  const completeTask = (taskId: string, points: number) => {
    dispatch({ type: 'COMPLETE_TASK', payload: { taskId, points } });
  };

  const completeQuest = (quest: Quest) => {
    dispatch({ type: 'COMPLETE_QUEST', payload: quest });
  };

  const addBadge = (badge: Badge) => {
    dispatch({ type: 'ADD_BADGE', payload: badge });
  };

  const updateScore = (points: number) => {
    dispatch({ type: 'UPDATE_SCORE', payload: points });
  };

  const value: GameContextType = {
    user: state.user,
    gameState: state.gameState,
    completedQuests: state.completedQuests,
    badges: state.badges,
    updateUser,
    startQuest,
    completeTask,
    completeQuest,
    addBadge,
    updateScore
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
