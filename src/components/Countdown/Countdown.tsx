import { useContext, useEffect, useState } from 'react';
import classes from './Countdown.module.scss';
import cn from 'clsx';
import { ChallengesContext } from '../../contexts/ChallengesContext';

const INITIAL_TIME = 0.05 * 60;
let countdownTimeOut: NodeJS.Timeout;

export function Countdown(): JSX.Element {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(INITIAL_TIME);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minLeft, minRight] = String(minutes).padStart(2, '0').split('');
  const [secondsLeft, secondsRight] = String(seconds)
    .padStart(2, '0')
    .split('');

  function startCountDown(): void {
    setIsActive(true);
  }

  function resetCountDown(): void {
    clearTimeout(countdownTimeOut);
    setIsActive(false);
    setTime(INITIAL_TIME);
  }

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

  return (
    <div>
      <div className={classes.container}>
        <div>
          <span>{minLeft}</span>
          <span>{minRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={classes.button}>
          Cycle has finished
          <img
            className={classes.icon}
            src="assets/icons/level-up.svg"
            alt="levelup"
          />
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={cn(classes.button, classes.active)}
              onClick={resetCountDown}
            >
              Abandon cycle
            </button>
          ) : (
            <button
              type="button"
              className={cn(classes.button, classes.disabled)}
              onClick={startCountDown}
            >
              Initialize cycle
            </button>
          )}
        </>
      )}
    </div>
  );
}
