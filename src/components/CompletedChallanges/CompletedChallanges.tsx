import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import classes from './CompletedChallanges.module.scss';

export default function CompletedChallanges(): JSX.Element {
  const { challengesCompleted } = useContext(ChallengesContext);

  return (
    <div className={classes.container}>
      <span>Completed Challenges</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}
