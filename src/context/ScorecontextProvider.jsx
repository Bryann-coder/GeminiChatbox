import { createContext, useContext, useState, useEffect } from "react";
import { Context } from "./Context";
import run from "../config/gemini";
import { EVALUATION } from "../utils/contextUtils";

export const Context2 = createContext();

const ScorecontextProvider = (props) => {
  const { conversationHistory } = useContext(Context);
  const [evaluationData, setEvaluationData] = useState({
    globalScore: 0,
    pertinence: 0,
    precision: 0,
    clarte: 0,
    empathie: 0,
    tempsReponse: 0,
  });

  // Prompt pour l'évaluation détaillée
  const evaluationPrompt = EVALUATION;

  useEffect(() => {
    const evaluateConversation = async () => {
      const conversationContext = conversationHistory
        .map((message) => `${message.role}: ${message.content}`)
        .join("\n");

      const finalPrompt = `${evaluationPrompt}\n${conversationContext}`;

      try {
        const response = await run(finalPrompt);
        // Ajouter ce log

        // Nettoyer la réponse pour enlever les balises Markdown
        const cleanedResponse = response
          .replace(/```json\n/, "")
          .replace(/\n```/, "");

        console.log("API Response:", cleanedResponse);

        // Vérifier si la réponse nettoyée est un JSON valide
        let evaluationResult;
        try {
          evaluationResult = JSON.parse(cleanedResponse);
        } catch (parseError) {
          console.error("Error parsing JSON response:", parseError);
          throw new Error("Invalid JSON response from API");
        }

        setEvaluationData(evaluationResult);
      } catch (error) {
        console.error("Error evaluating conversation:", error);
        setEvaluationData({
          globalScore: 0,
          pertinence: 0,
          precision: 0,
          clarte: 0,
          empathie: 0,
          tempsReponse: 0,
        });
      }
    };

    if (conversationHistory.length > 0) {
      evaluateConversation();
    }
  }, [conversationHistory]);

  return (
    <Context2.Provider value={evaluationData}>
      {props.children}
    </Context2.Provider>
  );
};

export default ScorecontextProvider;
