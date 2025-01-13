import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import './Main.css';
import { Context } from '../../context/Context';
import { Context2 } from '../ScoreContext/ScorecontextProvider';
import AlertDialogSlide from '../AlertDialogSlide/AlertDialogSlide';
import { Search } from 'lucide-react';



const Main = () => {
    const { onSent, setInput, input, conversationHistory } = useContext(Context);
    const [loadingIndex, setLoadingIndex] = useState(null); // Index du loader pour le message en cours
    const [clicked, SetClicked] = useState(false)
    const [isDisable, setDisable] = useState(false) 
    const { result } = useContext(Context2)

    console.log('apres avoir pris le contexte',result)

    const [finished, setFinished] = useState(false)


    useEffect(() => {
        // Remettre isDisable à false à chaque fois que la page est rechargée
        setDisable(false);
    }, []);



    const handleScore = () =>{
        setDisable(true)
    }
    const handleSend = () => {
        if (input.trim()) {
            onSent(); // Envoie le message et met à jour l'historique
            setInput('');
        }
    };

    useEffect(() => {
        if (conversationHistory.length > 0) {
            const lastMessage = conversationHistory[conversationHistory.length - 1];
            if (lastMessage.role === 'Patient') {
                setLoadingIndex(conversationHistory.length - 1); // Activer le loader pour le dernier message
                setTimeout(() => {
                    setLoadingIndex(null); // Désactiver le loader après 3 secondes
                }, 3000);
            }
        }
    }, [conversationHistory]);

    useEffect(() => {
        const messageHistory = document.querySelector('.conversation-history');
        if (messageHistory) {
          messageHistory.scrollTop = messageHistory.scrollHeight;
        }
      }, [conversationHistory]);

    return (
        <div className="main">
            <div className="nav">
                <div className="nav-titre">MedUTOPIA</div>
                {conversationHistory.length === 0 ? null : 
                (
                
                <AlertDialogSlide note={result} title='VOTRE SCORE' handleScore={handleScore}/>

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

                                {loadingIndex === index && message.role === 'Patient' ? (
                                    <div className="loader">
                                        <hr />
                                        <hr />
                                        <hr />
                                    </div>
                                ) : (
                                    <div className="message">{message.content.replaceAll("Assistant:","").replaceAll("Patient:","")}</div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="bottom">
                <div className="search-box" style={{ backgroundColor: isDisable ? '#c0c0c0' : 'rgb(114, 124, 220)' }}>
                    <input
                        type="text"
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        disabled={isDisable}
                        placeholder="Entrer un message"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSend();
                            }
                        }}
                    />
                    <div className="icon">
                        <img src={assets.send_icon} alt="Envoyer" onClick={handleSend} />
                    </div>
                </div>

                <p className="bottom-info">
                    MedUTOPIA est un environnement immersif qui aide les jeunes étudiants médecins à poser des diagnostics médicaux.
                </p>
            </div>
        </div>
    );
};

export default Main;
