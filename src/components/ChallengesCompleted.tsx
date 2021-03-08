import React, { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/ChallengesCompleted.module.css";

const ChallengesCompleted = () => {
  const { challengesCompleted } = useContext(ChallengesContext);
  return (
    <div className={styles.challengesCompletedContainer}>
      <p>Desafios completados</p>
      <p>{challengesCompleted}</p>
    </div>
  );
};

export default ChallengesCompleted;
