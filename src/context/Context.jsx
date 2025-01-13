import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    // États pour la discussion
    const [input, setInput] = useState(""); // Input utilisateur
    const [conversationHistory, setConversationHistory] = useState([]); // Historique des messages
    const [showResult, setShowResult] = useState(false);
    const [recentPrompt,setRecentPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");



    // Prompt initial pour le contexte général
    const initialContext = import.meta.env.VITE_CONTEXT;


    // Fonction principale pour gérer l'envoi des messages
    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        // Construire le message complet avec l'historique
        const conversationContext = conversationHistory
            .map((message) => `${message.role}: ${message.content}`)
            .join("\n");
        const finalPrompt = `${initialContext}\n${conversationContext}\nUtilisateur: ${prompt || input}\nAssistant:`;
        // Appeler l'API avec le prompt complet
        let response = await run(finalPrompt);

        // Ajouter le message utilisateur et la réponse à l'historique
        const userMessage = { role: "Medecin", content: prompt || input };
        const assistantMessage = { role: "Patient", content: response };
        setConversationHistory((prev) => [...prev, userMessage, assistantMessage]);

        // Réinitialisation des états
        setLoading(false);
        setRecentPrompt(input);
        setInput("");



    };

    const contextValue = {
        conversationHistory,
        onSent,
        showResult,
        loading,
        recentPrompt,
        resultData,
        input,
        setInput,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
