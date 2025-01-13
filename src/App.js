import React, { useState } from 'react';
import './App.css';

import { initializeApp } from 'firebase/app';
import {useAuthState} from 'react-firebase-hooks/auth'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore';


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBdMZ7t44dzzTbJxXk7sX46vASMBxo7yt4",
  authDomain: "medutopia-12ff0.firebaseapp.com",
  projectId: "medutopia-12ff0",
  storageBucket: "medutopia-12ff0.firebasestorage.app",
  messagingSenderId: "386210220625",
  appId: "1:386210220625:web:a1c6f8ecfdb87617a60670",
  measurementId: "G-0MV0DJ2BN8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);


function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header></header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}



function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => console.error(error));
  };

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  );
}


function SignOut() {
  return auth.currentUser && (
    <button onClick={() => signOut(auth)}>Sign Out</button>
  );
}


function ChatRoom() {
  const messagesRef = collection(firestore, 'messages');
  const q = query(messagesRef, orderBy('createdAt'), limit(25));
  const [messages] = useCollectionData(q, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;
    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
  };

  return (
    <>
      <div>
        {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </div>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type="submit">Send</button>
      </form>

      <div>
        <SignOut />
      </div>
    </>
  );
}



function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      {photoURL && <img src={photoURL} alt="User Avatar" />}
      <p>{text}</p>
    </div>
  );
}


export default App;
