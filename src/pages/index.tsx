import Head from 'next/head';
import React from 'react';
import { ChallengeBox } from '../components/ChallengeBox/ChallengeBox';
import { CompletedChallanges } from '../components/CompletedChallanges/CompletedChallanges';
import { Countdown } from '../components/Countdown/Countdown';
import { ExperienceBar } from '../components/ExperienceBar/ExperienceBar';
import { Profile } from '../components/Profile/Profile';
import classes from '../styles/home.module.scss';

export default function Home() {
  return (
    <div className={classes.container}>
      <Head>
        <title>Home | moveit</title>
      </Head>

      <ExperienceBar />

      <section>
        <div>
          <Profile />
          <CompletedChallanges />
          <Countdown />
        </div>
        <div>
          <ChallengeBox />
        </div>
      </section>
    </div>
  );
}
