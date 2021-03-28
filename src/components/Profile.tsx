import { useSession } from "next-auth/client";
import React, { useContext } from "react";
import useWindowSize from "../../utils/useWindowSize";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Profile.module.css";

const Profile = ({ username, userPhoto }) => {
  const { level, activeChallenge } = useContext(ChallengesContext);
  const size = useWindowSize();
  const width = size[0];
  return (
    <div
      className={styles.container}
      style={{
        display: activeChallenge && width <= 900 ? "none" : "flex",
      }}
    >
      <img src={userPhoto} alt="Perfil" />
      <div>
        <strong>{username}</strong>
        <p>
          <img src="icons/level.svg" alt="level" />
          {level}
        </p>
      </div>
    </div>
  );
};

export default Profile;
