import { useSession } from "next-auth/client";
import React, { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Profile.module.css";

const Profile = ({ username, userPhoto }) => {
  const { level } = useContext(ChallengesContext);
  return (
    <div className={styles.container}>
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
