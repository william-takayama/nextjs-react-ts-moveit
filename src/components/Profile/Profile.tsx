import Image from 'next/image';
import React, { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import classes from './Profile.module.scss';

interface ProfileProps {
  imageUrl?: string;
}

export function Profile({ imageUrl }: ProfileProps): JSX.Element {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Profile image"
            width={4.5 * 16}
            height={4.5 * 16}
            objectFit="cover"
            className={classes.profileImage}
          />
        )}
      </div>

      <div className={classes.infoContainer}>
        <strong className={classes.title}>William S. Takayama</strong>
        <p className={classes.levelContainer}>
          <img
            className={classes.levelImg}
            src="assets/icons/level.svg"
            alt="Level"
          />
          Level {level}
        </p>
      </div>
    </div>
  );
}
