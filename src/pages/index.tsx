import React, { useEffect, useState } from "react";
import styles from "../styles/pages/Login.module.css";
import { signIn, signOut, useSession } from "next-auth/client";
import useFetch from "../pages/api/useFetch";
import { GetServerSideProps } from "next";

const login = ({ data, BASE_URL }) => {
  const [session] = useSession();
  const [stateChange, setStateChange] = useState(false);
  let id = 0;

  if (!data) return null;

  if (session) {
    if (!verifyUser() && !stateChange) {
      console.log("oi");
      fetch(`${BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session.user),
      });
    }
    if (!stateChange) {
      setStateChange(true);
    }
  }

  function verifyUser() {
    let condition: boolean = false;

    for (let i = 0; i <= data.length - 1 && !condition; i++) {
      if (session.user.email == data.email) {
        condition = true;
      }
    }
    return condition;
  }

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

export const getServerSideProps: GetServerSideProps = async () => {
  const { data, BASE_URL } = await useFetch();
  return {
    props: {
      data,
      BASE_URL,
    },
  };
};

export default login;
