import React from 'react'
import Home from './component/Home/Home'
import Chat from './component/Chat/Chat';
import Contact from './component/Contact/Contact';
import About from './component/About/About';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  
})

const auth = firebase.auth();
const firestore = firebase.firestore();

// App Component
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;

