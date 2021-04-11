import { motion } from 'framer-motion';
import { useContext, useMemo } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import classes from './ExperienceBar.module.scss';

export default function ExperienceBar(): JSX.Element {
  const { currentXp, experienceToNextLevel } = useContext(ChallengesContext);

  const percentToNextLevel = useMemo(() => {
    const status = (currentXp / experienceToNextLevel) * 100;

    return `${status.toString()}%`;
  }, [currentXp, experienceToNextLevel]);

  return (
    <header className={classes.header}>
      <span>0 xp</span>
      <div>
        <motion.div
          initial={{ width: currentXp }}
          animate={{
            width:
              //   experienceToNextLevel
              Number(percentToNextLevel) !== currentXp
                ? percentToNextLevel
                : currentXp,
          }}
          transition={{ duration: 1.5 }}
        />
        <span
          className={classes.currentExperience}
          style={{ left: percentToNextLevel }}
        >
          {currentXp}xp
        </span>
      </div>
      <span>{experienceToNextLevel}xp</span>
    </header>
  );
}
