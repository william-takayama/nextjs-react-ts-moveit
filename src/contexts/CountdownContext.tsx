import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ChallengesContext } from './ChallengesContext';

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

  const [time, setTime] = useState(INITIAL_TIME);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const resetCountdown = useCallback(() => {
    clearTimeout(countdownTimeOut);
    setIsActive(false);
    setTime(INITIAL_TIME);
    setHasFinished(false);
  }, []);

  const startCountdown = useCallback(() => {
    setIsActive(true);
  }, []);

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeOut = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time, startNewChallenge]);

  const context = useMemo(() => {
    return {
      startCountdown,
      resetCountdown,
      isActive,
      minutes,
      seconds,
      hasFinished,
    };
  }, [hasFinished, isActive, minutes, resetCountdown, seconds, startCountdown]);

  return (
    <CountdownContext.Provider value={context}>
      {children}
    </CountdownContext.Provider>
  );
}
