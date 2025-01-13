import { useEffect, useState } from 'react';
import { auth } from '../../config/firebase';
import { 
  GoogleAuthProvider, 
  signInWithRedirect, 
  getRedirectResult 
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          console.log("Utilisateur connecté:", result.user.email);
          navigate('/main', { replace: true });
        }
      } catch (error) {
        console.error("Erreur de redirection:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkRedirect();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Chargement de l'authentification...</div>;
  }

  return (
    <div>
      <h1>Connexion</h1>
      <button onClick={handleGoogleLogin}>
        Se connecter avec Google
      </button>
    </div>
  );
}

export default Login;