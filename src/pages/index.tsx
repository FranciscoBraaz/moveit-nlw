import React from "react";
import styles from "../styles/pages/Login.module.css";
import { signIn, signOut, useSession } from "next-auth/client";
import useFetch from "../pages/api/useFetch";
import { GetStaticProps, GetServerSideProps } from "next";

const login = ({ dataUsers }) => {
  console.log(dataUsers);
  const [session] = useSession();
  if (session) {
    if (verifyUser() === false && dataUsers) {
      fetch("https://605b363e27f0050017c06862.mockapi.io/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify(session.user),
      });
    }
  }
  function verifyUser() {
    let condition: boolean = false;
    let find: boolean = false;
    console.log("oi");
    for (let i = 1; i <= dataUsers.length && !find; i++) {
      if (session.user.email === dataUsers[i].email) {
        condition = true;
        find = true;
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

export const getServerSideProps = async () => {
  const { dataUsers } = await useFetch();

  return {
    props: {
      dataUsers,
    },
  };
};

export default login;
