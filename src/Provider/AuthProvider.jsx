import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../Firebase/firebase.init";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("data", user, loading);

  //! Register
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //! Login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //! Google Login
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  //! LogOut
  const logout = () => signOut(auth);

  //! UpdateData
  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  //! ManageUser
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const value = {
    user,
    setUser,
    register,
    login,
    googleLogin,
    logout,
    loading,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
