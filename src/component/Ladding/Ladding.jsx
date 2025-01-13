import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import "./Ladding.css"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Context } from '../../context/Context'





// Main Content Component
const Ladding = () => {

    const navigate = useNavigate(); // Initialisation du hook useNavigate

    const handleStart = () => {
    navigate("/chat"); // Redirection vers la page Chat
  };

    

    return (
  <>
    <main className="main-content">
      <div className="content-container">
        <div className="content-grid">
          <div className="image-container">
            <div className="main-image">
            <img src= {assets.med} alt="Doctor with patient" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
          </div>
          <div className="content-text">
            <h2 className="content-title">
              Transformez votre apprentissage médical avec la puissance de la 3D
            </h2>
            <p className="content-description">
              Plongez dans une expérience immersive d'apprentissage qui révolutionne la formation médicale. 
              Développez vos compétences diagnostiques avec des cas réels en 3D.
            </p>
            <button className="cta-button" onClick={handleStart}>
              Commencer maintenant
            </button>
          </div>
        </div>
      </div>
    </main>
  </>
);

}


export default Ladding