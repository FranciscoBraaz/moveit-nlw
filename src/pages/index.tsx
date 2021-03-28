import React, { useEffect, useState } from "react";
import styles from "../styles/pages/Login.module.css";
import { signIn, signOut, useSession } from "next-auth/client";
import useFetch from "../pages/api/useFetch";
import { GetServerSideProps } from "next";
import { userInfo } from "node:os";

const login = ({ data, BASE_URL }) => {
  const [session] = useSession();
  const [stateChange, setStateChange] = useState(false);
  const [checkProvider, setCheckProvider] = useState(false);

  if (!data) return null;

  if (session) {
    if (!verifyUser() && !stateChange) {
      const userData = {
        ...session.user,
      };

      fetch(`${BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
    }
    if (!stateChange) {
      setStateChange(true);
    }
  }

  function verifyUser() {
    let condition: boolean = false;

    for (let i = 0; i <= data.length - 1 && !condition; i++) {
      if (session.user.email == data[i].email) {
        if (
          session.user.provider != data[i].provider &&
          checkProvider === false
        ) {
          setCheckProvider(true);
        }
        condition = true;
      }
    }

    return condition;
  }

  let displayModal = checkProvider ? "flex" : "none";

  return (
    <>
      <div
        className={styles.containerModalLogin}
        style={{ display: `${displayModal}` }}
      >
        <div className={styles.modalLogin}>
          <header>
            <h2>Olá,</h2>
          </header>
          <main>
            <p>
              Identificamos que apesar dos provedores serem diferentes, o e-mail
              utilizado neles é o mesmo. Desse modo, vamos sicronizar suas
              informações de level, experiência e desafios.
            </p>
          </main>
          <footer>
            <div>
              <button type="button" className={styles.buttonContinue}>
                <a href="/home">Ok</a>
              </button>
              <button
                type="button"
                className={styles.buttonLogout}
                onClick={() => signOut()}
              >
                Log out
              </button>
            </div>
          </footer>
        </div>
      </div>
      <div className={styles.containerPageLogin}>
        <div className={styles.containerImage}>
          <img src="./Simbolo.png" />
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
                  <button type="button" onClick={() => signIn("twitter")}>
                    <img src="twitter.png" />
                    <span>Faça seu login utilizando Twitter</span>
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
    </>
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
