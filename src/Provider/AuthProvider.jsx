import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
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
  const [paidBills, setPaidBills] = useState([]);
  console.log("data", user, loading);

  useEffect(() => {
    if (user) {
      const storedPaidBills = localStorage.getItem(`paidBills_${user.uid}`);
      setPaidBills(storedPaidBills ? JSON.parse(storedPaidBills) : []);
    }
  }, [user]);

  const markBillAsPaid = (billId) => {
    setPaidBills((prev) => {
      const newPaidBills = [...prev, billId];
      if (user) {
        localStorage.setItem(
          `paidBills_${user.uid}`,
          JSON.stringify(newPaidBills)
        );
      }
      return newPaidBills;
    });
  };

  // Update userBalance in localStorage
  useEffect(() => {
    if (user && userBalance !== undefined) {
      localStorage.setItem(`balance_${user.uid}`, userBalance.toString());
    }
  }, [userBalance, user]);

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

  //! Password Reset
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email).finally(() => setLoading(false));
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
        // Check if user has a stored balance
        const storedBalance = localStorage.getItem(
          `balance_${currentUser.uid}`
        );
        if (storedBalance) {
          setUserBalance(parseInt(storedBalance, 10));
        } else {
          setUserBalance(10000);
          localStorage.setItem(`balance_${currentUser.uid}`, "10000");
        }
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
    resetPassword,
    paidBills,
    markBillAsPaid,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
