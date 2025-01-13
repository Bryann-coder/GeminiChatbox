import React, { useContext } from 'react'
import { Menu, Phone, Mail, Info } from 'lucide-react';
import "./Footer.css"

// Footer Component
const Footer = () => (
    <>
      
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-section">
              <h3>MedUTOPIA</h3>
              <p>Formation médicale innovante en 3D</p>
            </div>
            <div className="footer-section">
              <h3>Contact</h3>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'inherit'}}>
                <Mail size={16} />
                contact@medutopia.com
              </div>
            </div>
            <div className="footer-section">
              <h3>Suivez-nous</h3>
              <p>Réseaux sociaux</p>
            </div>
          </div>
          <div className="footer-bottom">
            © 2024 MedUTOPIA. Tous droits réservés.
          </div>
        </div>
      </footer>
    </>
  );


export default Footer