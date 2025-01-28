import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp, doc, setDoc, getDocs, getDoc, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import firebaseConfig from '../config/firebaseConfig';


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    console.error("Google Sign-In Error", error);
    throw error;
  }
};

export const signOutUser = () => {
  signOut(auth);
  localStorage.removeItem('user');
};

export const addMessageToSession = async (userId, sessionId, message) => {
  const sessionRef = doc(firestore, `users/${userId}/sessions/${sessionId}`);
  const messagesRef = collection(sessionRef, 'messages');
  const { uid, photoURL } = auth.currentUser;

  return await addDoc(messagesRef, {
    text: message.content,
    createdAt: serverTimestamp(),
    uid,
    photoURL,
    role: message.role
  });
};

export const getMessagesFromSession = async (userId, sessionId) => {
  const sessionRef = doc(firestore, `users/${userId}/sessions/${sessionId}`);
  const messagesRef = collection(sessionRef, 'messages');
  const q = query(messagesRef, orderBy('createdAt'), limit(25));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data());
};

export const updateSessionScore = async (userId, sessionId, evaluationData) => {
  const sessionRef = doc(firestore, `users/${userId}/sessions/${sessionId}`);
  await updateDoc(sessionRef, {
    score: evaluationData.globalScore,
    pertinence: evaluationData.pertinence,
    precision: evaluationData.precision,
    clarte: evaluationData.clarte,
    empathie: evaluationData.empathie,
    tempsReponse: evaluationData.tempsReponse,
    evaluatedAt: serverTimestamp()
  });
};

export const createSession = async (userId) => {
  const userRef = doc(firestore, `users/${userId}`);
  const sessionsRef = collection(userRef, 'sessions');
  const sessionDoc = await addDoc(sessionsRef, {
    score: null,
    pertinence: null,
    precision: null,
    clarte: null,
    empathie: null,
    tempsReponse: null,
    createdAt: serverTimestamp(),
    evaluatedAt: null
  });
  return sessionDoc.id;
};

export const getSessionsForUser = async (userId) => {
  try {
    const sessionsRef = collection(firestore, `users/${userId}/sessions`);
    const q = query(sessionsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error in getSessionsForUser:", error);
    throw error;
  }
};
export const deleteSession = async (userId, sessionId) => {
  const db = getFirestore();
  const batch = writeBatch(db);

  try {
    // Référence à la session et ses messages
    const sessionRef = doc(db, `users/${userId}/sessions/${sessionId}`);
    const messagesRef = collection(sessionRef, 'messages');
    
    // Obtenir tous les messages
    const messagesSnapshot = await getDocs(messagesRef);
    
    // Ajouter chaque suppression de message au batch
    messagesSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    
    // Ajouter la suppression de la session au batch
    batch.delete(sessionRef);
    
    // Exécuter toutes les suppressions en une seule transaction
    await batch.commit();
    
    return true;
  } catch (error) {
    console.error("Error in deleteSession:", error);
    throw error;
  }
};