import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import "./Ladding.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { signInWithGoogle } from "../../service/firebase.service";

const Ladding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    if (user && buttonClicked) {
      navigate("/chat");
    }
  }, [user, buttonClicked, navigate]);

  const handleStart = async () => {
    setButtonClicked(true);
    if (!user) {
      toast.error("Veuillez vous connecter", {
        icon: "🔒",
        duration: 3000,
        position: "top-right",
      });

      try {
        await signInWithGoogle();
      } catch (error) {
        toast.error("Échec de la connexion");
      }
    }
  };

  return (
    <>
      <main className="main-content">
        <div className="content-container">
          <div className="content-grid">
            <div className="image-container">
              <div className="main-image">
                <img
                  src={assets.med}
                  alt="Doctor with patient"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="content-text">
              <h2 className="content-title">
                Transformez votre apprentissage médical avec la puissance de la
                3D
              </h2>
              <p className="content-description">
                Plongez dans une expérience immersive d'apprentissage qui
                révolutionne la formation médicale. Développez vos compétences
                diagnostiques avec des cas réels en 3D.
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
};

export default Ladding;
