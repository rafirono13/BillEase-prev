import { useContext } from "react";
import AuthContext from "../Provider/AuthContext";

const useAuth = () => useContext(AuthContext);

export default useAuth;
