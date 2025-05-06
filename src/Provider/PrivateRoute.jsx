import React, { useContext } from "react";
import AuthContext from "./AuthContext";
import { Navigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import Loading from "../Components/Common/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();
  console.log("Current location on the user", location);

  if (loading) {
    return <Loading></Loading>;
  }

  if (user) {
    return children;
  }

  return <Navigate state={{ from: location }} to="/auth/login" replace />;
};

export default PrivateRoute;
