import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/Context";
import { Context2 } from "../../context/ScorecontextProvider";
import AlertDialogSlide from "../AlertDialogSlide/AlertDialogSlide";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const {
    onSent,
    setInput,
    input,
    conversationHistory,
    isSessionCompleted,
    wasSessionLoaded,
    isWaitingForPatientResponse,
    completeSession,
    sessionId,
    userSessions,
    isNewQuestion, // Ajouter isNewQuestion ici
  } = useContext(Context);

  const evaluationData = useContext(Context2); // Accéder au contexte Context2

  const handleSend = () => {
    if (input.trim()) {
      onSent();
      setInput("");
    }
  };

  const [loadingIndex, setLoadingIndex] = useState(null);

  useEffect(() => {
    if (conversationHistory.length > 0 && isWaitingForPatientResponse) {
      const lastMessage = conversationHistory[conversationHistory.length - 1];
      if (lastMessage.role === "Patient") {
        setLoadingIndex(conversationHistory.length - 1);
      }
    } else {
      setLoadingIndex(null);
    }
  }, [conversationHistory, isWaitingForPatientResponse]);

  useEffect(() => {
    const messageHistory = document.querySelector(".conversation-history");
    if (messageHistory) {
      messageHistory.scrollTop = messageHistory.scrollHeight;
    }
  }, [conversationHistory]);

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleScoreSubmit = () => {
    completeSession(evaluationData);
  };

  // Vérifier si la session actuelle a un score
  const currentSession = userSessions.find(
    (session) => session.id === sessionId
  );
  const hasScore = currentSession ? currentSession.score !== null : false;

  console.log(hasScore);

  return (
    <div className="main">
      <div className="nav">
        <div
          className="nav-titre"
          onClick={handleGoHome}
          style={{ cursor: "pointer" }}
        >
          MedUTOPIA
        </div>
        {conversationHistory.length === 0 ? null : (
          <AlertDialogSlide
            note={evaluationData.globalScore}
            evaluationData={evaluationData}
            title={isSessionCompleted ? "VOIR VOTRE SCORE" : "FIN CONVERSATION"}
            handleScore={handleScoreSubmit}
          />
        )}
      </div>

      <div className="container">
        {conversationHistory.length === 0 ? (
          <div className="greet">
            <p>Bonjour, cher apprenti médecin</p>
            <p>Prêt à apprendre les bases via MedUTOPIA ?</p>
          </div>
        ) : (
          <div className="conversation-history">
            {conversationHistory.map((message, index) => (
              <div key={index} className={message.role}>
                <div className="icon">
                  {message.role === 'Patient' ? (
                    <img src={assets.patient} alt="IA" />
                  ) : (
                    <img src={assets.med_icon} alt="User" />
                  )}
                </div>

                {loadingIndex === index && !isNewQuestion && message.role === 'Patient' ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <div className="message">
                    {message.content
                      .replaceAll("Assistant:", "")
                      .replaceAll("Patient:", "")
                    }
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom">
        <div
          className="search-box"
          style={{
            backgroundColor:
              isSessionCompleted || hasScore ? "#c0c0c0" : "rgb(114, 124, 220)",
          }}
        >
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            disabled={isSessionCompleted || hasScore}
            placeholder="Entrer un message"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />
          <div className="icon">
            <img src={assets.send_icon} alt="Envoyer" onClick={handleSend} />
          </div>
        </div>

        <p className="bottom-info">
          MedUTOPIA est un environnement immersif qui aide les jeunes étudiants
          médecins à poser des diagnostics médicaux.
        </p>
      </div>
    </div>
  );
};

export default Main;
