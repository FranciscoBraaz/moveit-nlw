import React, { useContext, useEffect } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/ChallengeBox.module.css";
import useWindowSize from "../../utils/useWindowSize";

const ChallengeBox = () => {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(
    ChallengesContext
  );

  const { resetCountdown } = useContext(CountdownContext);
  const size = useWindowSize();
  const width = size[0];

  function handleChallengeSucceeded() {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }

  return (
    <div
      // className={!displayState ? styles.ChallengeBoxContainerMobile : ""}
      className={styles.ChallengeBoxContainer}
      style={{ display: !activeChallenge && width <= 900 ? "none" : "flex" }}
    >
      {activeChallenge ? (
        <div className={styles.ChallengeBoxActive}>
          <header>{`Ganhe ${activeChallenge.amount} xp`}</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="body" />
            <strong>Novo Desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeSucceededButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.ChallengeBoxNotActive}>
          <strong>Inicie um ciclo para receber desafios</strong>
          <p>
            <img src="icons/level-up.svg" alt="levelup" />
            Complete os desafios e ganhe experiência para o próximo nível
          </p>
        </div>
      )}
    </div>
  );
};

export default ChallengeBox;
