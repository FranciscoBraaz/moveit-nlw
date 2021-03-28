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

import useFetch from "./api/useFetch";
import { useSession } from "next-auth/client";

export default function Home({ data, BASE_URL }) {
  const [session, loading] = useSession();

  if (loading) {
    return <h1>LOADING...</h1>;
  }

  if (!loading && !session) {
    return <p>You must be signed in to view this page</p>;
  }

  let id = verifyUser();

  function verifyUser() {
    let condition: boolean = false;

    for (let i = 0; i <= data.length - 1 && !condition; i++) {
      if (session.user.email == JSON.parse(JSON.stringify(data[i])).email) {
        condition = true;
        id = JSON.parse(JSON.stringify(data[i])).id;
      }
    }
    return id;
  }

  const user = data[id - 1];

  return (
    <ChallengesProvider
      level={Number(user.level)}
      currentExperience={Number(user.currentExperience)}
      challengesCompleted={Number(user.challengesCompleted)}
      idUser={Number(id)}
      url={BASE_URL}
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

export const getServerSideProps: GetServerSideProps = async () => {
  const { data, BASE_URL } = await useFetch();

  return {
    props: {
      data,
      BASE_URL,
    },
  };
};
