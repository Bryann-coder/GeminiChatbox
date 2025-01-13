import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { useState } from "react";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInDB, setUserInDB] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Vérifier si l'utilisateur existe dans Firestore
        const userRef = doc(firestore, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);
        setUserInDB(docSnap.exists());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return user && userInDB ? children : <Navigate to="/login" />;
};


export default ProtectedRoute;