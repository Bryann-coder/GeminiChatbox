import { createContext, useState, useEffect } from "react";
import run from "../config/gemini";
import {
  auth,
  addMessageToSession,
  createSession,
  getMessagesFromSession,
  updateSessionScore,
  getSessionsForUser,
  deleteSession
} from "../service/firebase.service";
import { CONTEXT } from "../utils/contextUtils";



export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [conversationHistory, setConversationHistory] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [recentPrompt, setRecentPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [sessionId, setSessionId] = useState(null);
    const [user, setUser] = useState(null);
    const [userSessions, setUserSessions] = useState([]);
    const [isSessionCompleted, setIsSessionCompleted] = useState(false);
    const [wasSessionLoaded, setWasSessionLoaded] = useState(false);
    const [isWaitingForPatientResponse, setIsWaitingForPatientResponse] = useState(false);
    const [isNewQuestion, setIsNewQuestion] = useState(false);


    const initialContext = CONTEXT;

    useEffect(() => {
        const initializeUser = async () => {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                setUser(storedUser);
                await loadUserSessions(storedUser.uid);
            }
        };
        initializeUser();
    }, []);

    const loadUserSessions = async (userId) => {
        try {
            const sessions = await getSessionsForUser(userId);
            setUserSessions(sessions);
            // Si aucune session n'existe, en créer une nouvelle
            if (sessions.length === 0) {
                const newSessionId = await createSession(userId);
                setSessionId(newSessionId);
            }
        } catch (error) {
            console.error("Error loading user sessions:", error);
            setUserSessions([]);
        }
    };

    const startNewSession = async () => {
        if (user) {
            const newSessionId = await createSession(user.uid);
            setSessionId(newSessionId);
            setConversationHistory([]);
            setIsSessionCompleted(false);
            setWasSessionLoaded(false);
            await loadUserSessions(user.uid);
        }
    };

    const loadSession = async (selectedSessionId) => {
        if (user) {
            const messages = await getMessagesFromSession(user.uid, selectedSessionId);
            const formattedMessages = messages.map(msg => ({
                role: msg.role,
                content: msg.text
            }));
            setConversationHistory(formattedMessages);
            setSessionId(selectedSessionId);
            setWasSessionLoaded(true);
            setIsSessionCompleted(false);
        }
    };

    const onSent = async (prompt) => {
        // Check if session is completed or a loaded session
        if (isSessionCompleted) return;
    
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setIsWaitingForPatientResponse(true);
        setIsNewQuestion(true); // Mettre à jour l'état pour indiquer une nouvelle question
    
        const conversationContext = conversationHistory
            .map((message) => `${message.role}: ${message.content}`)
            .join("\n");
        const finalPrompt = `${initialContext}\n${conversationContext}\nUtilisateur: ${prompt || input}\nAssistant:`;
        let response = await run(finalPrompt);
    
        const userMessage = { role: "Medecin", content: prompt || input };
        const assistantMessage = { role: "Patient", content: response };
    
        const userId = user.uid;
        await addMessageToSession(userId, sessionId, userMessage);
        await addMessageToSession(userId, sessionId, assistantMessage);
    
        setConversationHistory((prev) => [...prev, userMessage, assistantMessage]);
        setLoading(false);
        setIsWaitingForPatientResponse(false);
        setRecentPrompt(input);
        setInput("");
        setIsNewQuestion(false); // Réinitialiser l'état après avoir reçu la réponse
    };
    

    const completeSession = async (evaluationData) => {
        if (user && sessionId) {
            await updateSessionScore(user.uid, sessionId, evaluationData);
            setIsSessionCompleted(true);
        }
    };
    

    const deleteSessionAndRefresh = async (sessionIdToDelete) => {
        try {
            if (!user || !sessionIdToDelete) return;

            await deleteSession(user.uid, sessionIdToDelete);

            // Mettre à jour la liste des sessions localement
            setUserSessions(prevSessions =>
                prevSessions.filter(session => session.id !== sessionIdToDelete)
            );

            // Si c'était la session courante, charger la session la plus récente
            if (sessionIdToDelete === sessionId) {
                const remainingSessions = userSessions.filter(
                    session => session.id !== sessionIdToDelete
                );

                if (remainingSessions.length > 0) {
                    // Charger la session la plus récente
                    await loadSession(remainingSessions[0].id);
                } else {
                    // S'il ne reste plus de sessions, réinitialiser l'état
                    setSessionId(null);
                    setConversationHistory([]);
                    setIsSessionCompleted(false);
                    setWasSessionLoaded(false);
                }
            }
        } catch (error) {
            console.error("Error deleting session:", error);
        }
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
        user,
        userSessions,
        startNewSession,
        loadSession,
        sessionId,
        isSessionCompleted,
        wasSessionLoaded,
        completeSession,
        isWaitingForPatientResponse,
        deleteSessionAndRefresh
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
