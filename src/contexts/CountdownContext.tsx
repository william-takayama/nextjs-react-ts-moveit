import produce from 'immer';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { ChallengesContext } from './ChallengesContext';

type ReducerState = {
  time: number;
  isActive: boolean;
  hasFinished: boolean;
};

type ReducerAction =
  | {
      type: 'START_COUNTDOWN';
    }
  | {
      type: 'RESET_COUNTDOWN';
      time: ReducerState['time'];
    }
  | {
      type: 'UPDATE_TIME';
      time: ReducerState['time'];
    }
  | {
      type: 'END_COUNTDOWN';
      startNewChallenge: () => void;
    };

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  return produce(state, draft => {
    if (action.type === 'START_COUNTDOWN') {
      draft.isActive = true;
    }

    if (action.type === 'RESET_COUNTDOWN') {
      draft.time = action.time;
      draft.hasFinished = false;
      draft.isActive = false;
    }

    if (action.type === 'UPDATE_TIME') {
      draft.time = action.time;
    }

    if (action.type === 'END_COUNTDOWN') {
      draft.hasFinished = true;
      draft.isActive = false;
      action.startNewChallenge();
    }
  });
}

interface CountdownProviderProps {
  children: ReactNode;
}

interface CountdownContextData {
  isActive: boolean;
  resetCountdown: () => void;
  startCountdown: () => void;
  minutes: number;
  seconds: number;
  hasFinished: boolean;
}

const INITIAL_TIME = 0.05 * 60;
let countdownTimeOut: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({
  children,
}: CountdownProviderProps): JSX.Element {
  const { startNewChallenge } = useContext(ChallengesContext);

  const initialState: ReducerState = {
    time: INITIAL_TIME,
    isActive: false,
    hasFinished: false,
  };

  const [{ hasFinished, isActive, time }, send] = useReducer<typeof reducer>(
    reducer,
    initialState,
  );

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const resetCountdown = useCallback(() => {
    clearTimeout(countdownTimeOut);
    send({ type: 'RESET_COUNTDOWN', time: INITIAL_TIME });
  }, []);

  const startCountdown = useCallback(() => {
    send({ type: 'START_COUNTDOWN' });
  }, []);

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeOut = setTimeout(() => {
        send({ type: 'UPDATE_TIME', time: time - 1 });
      }, 1000);
    } else if (isActive && time === 0) {
      send({ type: 'END_COUNTDOWN', startNewChallenge });
    }
  }, [isActive, time, startNewChallenge]);

  const context = useMemo(
    () => ({
      startCountdown,
      resetCountdown,
      isActive,
      minutes,
      seconds,
      hasFinished,
    }),
    [hasFinished, isActive, minutes, resetCountdown, seconds, startCountdown],
  );

  return (
    <CountdownContext.Provider value={context}>
      {children}
    </CountdownContext.Provider>
  );
}
