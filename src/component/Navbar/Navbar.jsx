import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Phone, Mail, Info } from 'lucide-react';

import "./Navbar.css" 
// Navbar Component
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="navbar-logo">MedUTOPIA</h1>
          <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={24} />
          </button>
          <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
            <a href="/about"  className="nav-link">
              <Info size={20} />
              À propos
            </a>
            <a href="/contact" className="nav-link">
              <Phone size={20} />
              Contact
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};


export default Navbar

