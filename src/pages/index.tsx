import React from "react";
import styles from "../styles/pages/Login.module.css";
import { signIn, signOut, useSession } from "next-auth/client";

const login = () => {
  const [session] = useSession();
  return (
    <div className={styles.containerPageLogin}>
      <div className={styles.containerImage}>
        <img src="./moveItSimbolo.png" />
      </div>
      <div className={styles.containerLogin}>
        <div>
          <img src="./logo.png" />
        </div>
        <div className={styles.login}>
          {!session ? (
            <>
              <h1>Bem-vindo</h1>
              <div className={styles.userNotConnected}>
                <button type="button" onClick={() => signIn("github")}>
                  <img src="Github.png" />
                  <span>Faça seu login utilizando Github</span>
                </button>
              </div>
            </>
          ) : (
            <div className={styles.userConnected}>
              <div>
                <h1>Olá,</h1>
                <div className={styles.profile}>
                  <img src={session.user.image} />
                  <h2>{session.user.name}</h2>
                </div>
              </div>
              <div>
                <button type="button" className={styles.buttonContinue}>
                  <a href="/home">Continue</a>
                </button>
                <button
                  type="button"
                  className={styles.buttonLogout}
                  onClick={() => signOut()}
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default login;
