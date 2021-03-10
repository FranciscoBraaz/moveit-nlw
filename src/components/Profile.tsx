import React, { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Profile.module.css";

const Profile = () => {
  const { level } = useContext(ChallengesContext);
  return (
    <div className={styles.container}>
      <img
        src="https://images.unsplash.com/photo-1614599498129-ae6213a8d43f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        alt="Perfil"
      />
      <div>
        <strong>Francisco Braz</strong>
        <p>
          <img src="icons/level.svg" alt="level" />
          {level}
        </p>
      </div>
    </div>
  );
};

export default Profile;
