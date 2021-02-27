import classes from './ChallengeBox.module.scss';
import cn from 'clsx';
import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';

export function ChallengeBox(): JSX.Element {
  const { activeChallenge, resetChallenge } = useContext(ChallengesContext);

  return (
    <div className={classes.container}>
      <div
        className={cn({
          [classes.active]: activeChallenge,
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
                onClick={resetChallenge}
              >
                Fail
              </button>
              <button type="button" className={classes.succeded}>
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
