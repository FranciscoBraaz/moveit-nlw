import React from "react";
import styles from "../styles/pages/Login.module.css";

const login = () => {
  return (
    <div className={styles.containerPageLogin}>
      <div className={styles.containerImage}>
        <img src="./moveItSimbolo.png" />
      </div>
      <div className={styles.containerLogin}>
        <div>
          <img src="./logo.png" />
        </div>
        <h1>Bem-vindo</h1>
        <div>
          <button type="button">
            <img src="Github.png" />
            <span>Faça seu login utilizando Github</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default login;
