import { createContext } from "react";
import { Context } from "../../context/Context";
import { useContext } from "react";
import run from "../../config/gemini";
import { useEffect } from "react";
import { useState } from "react";

export const Context2 = createContext();


const ScorecontextProvider = (props) => {
    const {conversationHistory} = useContext(Context);

    const [result, setResult] = useState("");

    const initialContext = "Je fais une application web immersive en 3D pour aider des medecins a poser des diagnostiques. Le patient est atteint de paludisme. J'envoie l'historique de notre conversation et tu devras noter le medecin: Voici les criteres et les points : Qualité des questions posées(Pertinence des questions : 25 points,Clarté des questions : 10 points, Ordre logique des questions : 5 points ), Analyse des réponses du patient(Compréhension des réponses : 15 points, Utilisation des réponses pour orienter le diagnostic : 15 points  ),   Précision du diagnostic( Diagnostic final : 20 points, Justification du diagnostic : 10 points) "
    const massa = "Je vais noter le medecin. DONNE UN SCORE SUR 100. Juste un chiffre"


    useEffect(() => {
        const note = async () => {
            const conversationContext = conversationHistory
                .map((message) => `${message.role}: ${message.content}`)
                .join("\n");

            const finalPrompt = `${massa}\n${conversationContext}`;

            try {
                const score = await run(finalPrompt);
                setResult(score); // Mise à jour du résultat ici
            } catch (error) {
                console.error("Error fetching score:", error);
            } 
        };

        note()
    
    }, [conversationHistory])


    console.log('Score avant de prendre le contexte ', result)
    

    return (
        <Context2.Provider value={result}>
            {props.children}
        </Context2.Provider>
    );

};
export default ScorecontextProvider
