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
  const [userBalance, setUserBalance] = useState(0);
  console.log("data", user, loading);

  //! Register
  const register = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    );
  };

  //! Login
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    );
  };

  //! Google Login
  const googleLogin = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).finally(() => setLoading(false));
  };

  //! LogOut
  const logoutUser = () => {
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false));
  };

  //! UpdateData
  const updateUser = (updatedData) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, updatedData).then(() => {
        setUser((prevUser) => ({ ...prevUser, ...updatedData }));
        console.log("User profile updated in AuthProvider.");
      });
    }
    return Promise.reject(new Error("No user to update."));
  };

  //! ManageUser
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUserBalance(30000);
      } else {
        setUserBalance(0);
        console.log("user logged out balance 0");
      }
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
    logout: logoutUser,
    loading,
    updateUser,
    userBalance,
    setUserBalance,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
