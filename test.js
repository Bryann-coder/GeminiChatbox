import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyATqnILdt5mwzl0c3Ot6Co4HCeKcQPPPF4");

async function run() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = "JE suis en train de faire un app pour aider les medecins a poser les diagnostics medicaux. Et je veux que tu simules les reponses d'un patient. Tu es un patient de sexe feminin et tu es atteinte de paludisme. Tu vas interagir avec un medicin qui va te poser des quesions auxquelles tu devras repondre. Reponds comme un patient sans de tournure de phrase soutenuc cependant tu as un minimum de connaissance en francais, repond comme un vrai etre humain. Tu ne repondras qu'aux question qu'on va te poser et tient aussi compte de la semantique. S'il te pose une question qui n'est pas semantiquement correct dis lui que tu ne comprends pas. On commence : avez vous une endometriose? dormez vous sous moustiquaires? avez vous pris un calmant ? avez vous des allergies particulieres? "

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();