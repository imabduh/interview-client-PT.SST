import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { apiContext } from "../services/apis";

const PrivateRoute = ({ children }) => {
  const { token } = useContext(apiContext);
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
