import Head from 'next/head';
import React from 'react';
import { ChallengeBox } from '../components/ChallengeBox/ChallengeBox';
import { CompletedChallanges } from '../components/CompletedChallanges/CompletedChallanges';
import { Countdown } from '../components/Countdown/Countdown';
import { ExperienceBar } from '../components/ExperienceBar/ExperienceBar';
import { Profile } from '../components/Profile/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';
import classes from '../styles/home.module.scss';

export default function Home(): JSX.Element {
  return (
    <div className={classes.container}>
      <Head>
        <title>Home | moveit</title>
      </Head>

      <ExperienceBar />

      <CountdownProvider>
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
      </CountdownProvider>
    </div>
  );
}
