import ChallengesCompleted from "../components/ChallengesCompleted";
import Countdown from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";

import styles from '../styles/pages/Home.module.css'
import  Head  from 'next/head'
import ChallengeBox from "../components/ChallengeBox";

export default function Home() {
  return (
      <div className={styles.container}>
        <Head>
          <title>Moveit</title>
        </Head>
        <ExperienceBar />
        <section>
          <div className={styles.leftContainer}>
            <Profile />
            <ChallengesCompleted />
            <Countdown />
          </div>
          <div className={styles.rightContainer}>
            <ChallengeBox />
          </div>
        </section>
      </div>
  )
}
