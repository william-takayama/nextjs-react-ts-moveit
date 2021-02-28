import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import classes from './LevelUpModal.module.scss';

export function LevelUpModal(): JSX.Element {
  const { level, closeModal } = useContext(ChallengesContext);

  return (
    <div className={classes.overlay}>
      <div className={classes.container}>
        <header>{level}</header>

        <strong>Congratulations</strong>
        <p>You&apos;ve reached a new level!</p>

        <button type="button" onClick={closeModal}>
          <img src="/assets/icons/close.svg" alt="Close modal" />
        </button>
      </div>
    </div>
  );
}
