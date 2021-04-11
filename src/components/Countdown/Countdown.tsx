import cn from 'clsx';
import { useContext } from 'react';
import { CountdownContext } from '../../contexts/CountdownContext';
import classes from './Countdown.module.scss';

export default function Countdown(): JSX.Element {
  const {
    resetCountdown,
    isActive,
    startCountdown,
    minutes,
    seconds,
    hasFinished,
  } = useContext(CountdownContext);

  const [minLeft, minRight] = String(minutes).padStart(2, '0').split('');
  const [secondsLeft, secondsRight] = String(seconds)
    .padStart(2, '0')
    .split('');

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
        <button type="button" disabled className={classes.button}>
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
              onClick={resetCountdown}
            >
              Abandon cycle
            </button>
          ) : (
            <button
              type="button"
              className={cn(classes.button, classes.disabled)}
              onClick={startCountdown}
            >
              Initialize cycle
            </button>
          )}
        </>
      )}
    </div>
  );
}
