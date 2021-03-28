import React, { useContext } from "react";
import useWindowSize from "../../utils/useCustomResize";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/ChallengesCompleted.module.css";

const ChallengesCompleted = () => {
  const { challengesCompleted, activeChallenge } = useContext(
    ChallengesContext
  );
  const size = useWindowSize();
  const width = size[0];

  return (
    <div
      className={styles.challengesCompletedContainer}
      style={{
        display: activeChallenge && width <= 900 ? "none" : "flex",
      }}
    >
      <p>Desafios completados</p>
      <p>{challengesCompleted}</p>
    </div>
  );
};

export default ChallengesCompleted;
