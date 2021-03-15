import ChallengesCompleted from "../components/ChallengesCompleted";
import Countdown from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";

import styles from "../styles/pages/Home.module.css";
import Head from "next/head";
import ChallengeBox from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { GetServerSideProps } from "next";
import { ChallengesProvider } from "../contexts/ChallengesContext";
import { getSession, useSession } from "next-auth/client";
import { Session } from "node:inspector";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  session: Session;
}

export default function Home(props: HomeProps) {
  const [session, loading] = useSession();
  if (loading) {
    return <h1>LOADING...</h1>;
  }
  if (!loading && !session) {
    return <p>You must be signed in to view this page</p>;
  }
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Moveit</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div className={styles.leftContainer}>
              <Profile
                username={session.user.name}
                userPhoto={session.user.image}
              />
              <ChallengesCompleted />
              <Countdown />
            </div>
            <div className={styles.rightContainer}>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
  const session = await getSession(ctx);
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      session: session,
    },
  };
};
