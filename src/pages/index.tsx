import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import { ChallengeBox } from '../components/ChallengeBox/ChallengeBox';
import { CompletedChallanges } from '../components/CompletedChallanges/CompletedChallanges';
import { Countdown } from '../components/Countdown/Countdown';
import { ExperienceBar } from '../components/ExperienceBar/ExperienceBar';
import { Profile } from '../components/Profile/Profile';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';
import classes from '../styles/home.module.scss';
export interface HomeProps {
  level: number;
  currentXp: number;
  challengesCompleted: number;
}

export default function Home({
  level,
  currentXp,
  challengesCompleted,
}: HomeProps): JSX.Element {
  return (
    <ChallengesProvider
      level={level}
      currentXp={currentXp}
      challengesCompleted={challengesCompleted}
    >
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
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { level, currentXp, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentXp: Number(currentXp),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
