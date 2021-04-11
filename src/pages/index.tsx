import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import React from 'react';
import ChallengeBox from '../components/ChallengeBox/ChallengeBox';
import CompletedChallanges from '../components/CompletedChallanges/CompletedChallanges';
import Countdown from '../components/Countdown/Countdown';
import ExperienceBar from '../components/ExperienceBar/ExperienceBar';
import PageComponent from '../components/PageComponent/PageComponent';
import Profile from '../components/Profile/Profile';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';
import classes from '../styles/home.module.scss';

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

export default function Home({
  level,
  currentXp,
  challengesCompleted,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <PageComponent>
      <ChallengesProvider
        level={level}
        currentXp={currentXp}
        challengesCompleted={challengesCompleted}
      >
        <div className={classes.container}>
          <Head>
            <title>Home | TimeToMove</title>
          </Head>

          <ExperienceBar />

          <CountdownProvider>
            <section>
              <div>
                <Profile imageUrl="https://github.com/william-takayama.png" />
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
    </PageComponent>
  );
}
