import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, Phone, Mail, Info, LogIn, LogOut } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { signInWithGoogle, signOutUser } from '../../service/firebase.service';

import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleProtectedRoute = (route) => {
    if (!user) {
      toast.error('Veuillez vous connecter', {
        icon: '🔒',
        duration: 3000,
        position: 'top-right',
      });
      
      // Optional: Open login modal or redirect to login
      signInWithGoogle().catch(() => {
        toast.error('Échec de la connexion');
      });
    } else {
      navigate(route);
    }
  };

  const handleAuth = async () => {
    try {
      if (user) {
        await signOutUser();
        toast.success('Déconnexion réussie', {
          icon: '✅',
          duration: 3000,
          position: 'top-right',
        });
      } else {
        const result = await signInWithGoogle();
        console.log(result.user);
        toast.success('Connexion réussie', {
          icon: '✅',
          duration: 3000,
          position: 'top-right',
        });
      }
    } catch (error) {
      toast.error('Échec de la connexion');
    }
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">MedUTOPIA</h1>
        <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu size={24} />
        </button>
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/about" 
            className="nav-link"
          >
            <Info size={20} />
            À propos
          </Link>
          <Link 
            to="/contact" 
            className="nav-link"
          >
            <Phone size={20} />
            Contact
          </Link>

          {user ? 
          
          <div className="nav-link">Bienvenue {user.displayName}</div>

          : null
          }

          <button 
            onClick={handleAuth} 
            className="nav-link auth-button"
          >
            {user ? (
              <>
                <LogOut size={20} />
                Déconnexion
              </>
            ) : (
              <>
                <LogIn size={20} />
                Connexion
              </>
            )}
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;