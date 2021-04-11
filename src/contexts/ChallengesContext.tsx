import produce from 'immer';
import Cookies from 'js-cookie';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import challenges from '../../challenges.json';
import LevelUpModal from '../components/LevelUpModal/LevelUpModal';

type ReducerState = {
  level: number;
  currentXp: number;
  challengesCompleted: number;
  isModalOpen: boolean;
  hasLeveledUp: boolean;
  activeChallenge?: Challenge;
};

type ReducerAction =
  | {
      type: 'LEVEL_UP';
    }
  | {
      type: 'START_NEW_CHALLENGE';
      challenge: Challenge;
    }
  | {
      type: 'RESET_CHALLENGE';
    }
  | {
      type: 'COMPLETE_CHALLENGE';
      currentXp: ReducerState['currentXp'];
      challengesCompleted: ReducerState['challengesCompleted'];
    }
  | {
      type: 'CLOSE_MODAL';
    };

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  return produce(state, draft => {
    if (action.type === 'LEVEL_UP') {
      draft.level = state.level + 1;
      draft.isModalOpen = true;
      draft.hasLeveledUp = true;
    }
    if (action.type === 'START_NEW_CHALLENGE') {
      draft.activeChallenge = action.challenge;
    }
    if (action.type === 'RESET_CHALLENGE') {
      draft.activeChallenge = null;
    }
    if (action.type === 'COMPLETE_CHALLENGE') {
      draft.currentXp = action.currentXp;
      draft.challengesCompleted = action.challengesCompleted;
      draft.activeChallenge = null;
    }
    if (action.type === 'CLOSE_MODAL') {
      draft.isModalOpen = false;
    }
  });
}
interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}
interface ChallengesContextData {
  level: number;
  currentXp: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeModal: () => void;
}
export interface HomeProps {
  level: number;
  currentXp: number;
  challengesCompleted: number;
}
interface ChallengesProviderProps extends HomeProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps): JSX.Element {
  const initialState: ReducerState = {
    hasLeveledUp: false,
    level: rest.level ?? 1,
    currentXp: rest.currentXp ?? 0,
    challengesCompleted: rest.challengesCompleted ?? 0,
    activeChallenge: null,
    isModalOpen: false,
  };

  const [
    {
      level,
      currentXp,
      challengesCompleted,
      activeChallenge,
      isModalOpen,
      hasLeveledUp,
    },
    send,
  ] = useReducer<typeof reducer>(reducer, initialState);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  // Side-effects

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentXp', String(currentXp));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentXp, challengesCompleted]);

  // Functions

  const levelUp = useCallback(() => {
    send({ type: 'LEVEL_UP' });
  }, []);

  const startNewChallenge = useCallback(() => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    send({ type: 'START_NEW_CHALLENGE', challenge: challenge as Challenge });

    // eslint-disable-next-line no-new
    new Audio('/assets/notification.mp3');

    if (Notification.permission === 'granted') {
      // eslint-disable-next-line no-new
      new Notification('New challenge 🙋', {
        body: `I dare you! Award ${challenge.amount}xp!`,
      });
    }
  }, []);

  const resetChallenge = useCallback(() => {
    send({ type: 'RESET_CHALLENGE' });
  }, []);

  const completeChallenge = useCallback(() => {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentXp + amount;

    if (finalExperience >= experienceToNextLevel) {
      levelUp();
      finalExperience -= experienceToNextLevel;
    }

    send({
      type: 'COMPLETE_CHALLENGE',
      currentXp: finalExperience,
      challengesCompleted: challengesCompleted + 1,
    });
  }, [
    activeChallenge,
    challengesCompleted,
    currentXp,
    experienceToNextLevel,
    levelUp,
  ]);

  const closeModal = useCallback(() => {
    send({ type: 'CLOSE_MODAL' });
  }, []);

  // Exporting context
  const context = useMemo(
    () => ({
      level,
      currentXp,
      challengesCompleted,
      levelUp,
      startNewChallenge,
      activeChallenge,
      resetChallenge,
      experienceToNextLevel,
      completeChallenge,
      closeModal,
      hasLeveledUp,
    }),
    [
      level,
      currentXp,
      challengesCompleted,
      levelUp,
      startNewChallenge,
      activeChallenge,
      resetChallenge,
      experienceToNextLevel,
      completeChallenge,
      closeModal,
      hasLeveledUp,
    ],
  );

  return (
    <ChallengesContext.Provider value={context}>
      {children}
      {isModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
