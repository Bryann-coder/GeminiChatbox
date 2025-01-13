import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>À Propos de MedUTOPIA</h1>
      <div className="about-content">
        <section className="mission">
          <h2>Notre Mission</h2>
          <p>
            MedUTOPIA est un environnement immersif conçu pour les étudiants en médecine, 
            offrant une expérience d'apprentissage révolutionnaire grâce à la puissance de la 3D.
          </p>
        </section>
        
        <section className="how-it-works">
          <h2>Comment Ça Marche</h2>
          <ul>
            <li>Immersion totale dans des scénarios médicaux réalistes</li>
            <li>Interactions guidées par des questions interactives</li>
            <li>Système de scoring pour mesurer et améliorer les performances</li>
            <li>Formations répétables pour une progression continue</li>
          </ul>
        </section>
        
        <section className="key-features">
          <h2>Fonctionnalités Clés</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>Consultation 3D</h3>
              <p>Simulez des consultations médicales dans un environnement immersif</p>
            </div>
            <div className="feature">
              <h3>Système de Score</h3>
              <p>Évaluez et suivez votre progression après chaque session</p>
            </div>
            <div className="feature">
              <h3>Apprentissage Interactif</h3>
              <p>Posez des questions et apprenez en temps réel</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;