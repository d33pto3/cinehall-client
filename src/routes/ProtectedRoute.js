import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, ...props }) => {
  const { token } = JSON.parse(localStorage.getItem("user"));

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
