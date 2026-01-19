import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     EMAIL + PASSWORD SIGNUP ✅
  ========================= */
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  /* =========================
     EMAIL + PASSWORD LOGIN
  ========================= */
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  /* =========================
     GOOGLE LOGIN
  ========================= */
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  /* =========================
     LOGOUT
  ========================= */
  const logout = () => {
    return signOut(auth);
  };

  /* =========================
     AUTH STATE LISTENER
  ========================= */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    user,
    signup,       // ✅ VERY IMPORTANT
    login,
    googleLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}