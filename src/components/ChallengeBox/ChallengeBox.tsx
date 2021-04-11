import cn from 'clsx';
import { useCallback, useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import { CountdownContext } from '../../contexts/CountdownContext';
import classes from './ChallengeBox.module.scss';

export default function ChallengeBox(): JSX.Element {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(
    ChallengesContext,
  );
  const { resetCountdown } = useContext(CountdownContext);

  const handleChallengeSucceeded = useCallback(() => {
    completeChallenge();
    resetCountdown();
  }, [completeChallenge, resetCountdown]);

  const handleChallengeFailed = useCallback(() => {
    resetChallenge();
    resetCountdown();
  }, [resetChallenge, resetCountdown]);

  return (
    <div className={classes.container}>
      <div
        className={cn({
          [classes.active]: Boolean(activeChallenge),
          [classes.nonActive]: !activeChallenge,
        })}
      >
        {activeChallenge ? (
          <>
            <header>Gain {activeChallenge.amount}xp</header>
            <main>
              <img src={`assets/icons/${activeChallenge.type}.svg`} alt="" />
              <strong>New Challenge</strong>
              <p>{activeChallenge.description}</p>
            </main>

            <footer>
              <button
                type="button"
                className={classes.failed}
                onClick={handleChallengeFailed}
              >
                Fail
              </button>
              <button
                type="button"
                className={classes.succeeded}
                onClick={handleChallengeSucceeded}
              >
                Completed!
              </button>
            </footer>
          </>
        ) : (
          <>
            <strong>Finalize a cycle to receive more challenges</strong>
            <p>
              <img src="assets/icons/level-up.svg" alt="level up" />
              Upgrade level by completing challenges.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
