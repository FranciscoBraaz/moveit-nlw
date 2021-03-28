import React, { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/ExperienceBar.module.css";

const ExperienceBar = () => {
  const { currentExperience, experienceToNextLevel } = useContext(
    ChallengesContext
  );

  let initialExperience = 0;
  const percentToNextLevel = Math.round(
    (currentExperience / experienceToNextLevel) * 100
  );

  return (
    <div className={styles.experienceBar}>
      <span>0 px</span>
      <div>
        <div
          style={{ width: `${percentToNextLevel}%` }}
          className={styles.currentExperienceBar}
        />
        <div
          className={styles.currentExperienceText}
          style={{ left: `${percentToNextLevel}%` }}
        >
          {`${currentExperience} px`}
        </div>
      </div>
      <span>{experienceToNextLevel} px</span>
    </div>
  );
};

export default ExperienceBar;
