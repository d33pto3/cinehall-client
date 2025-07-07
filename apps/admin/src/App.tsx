import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";

function App() {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to={user?.role === "admin" ? "/admin" : "/hallowner"} />
          ) : (
            <Login />
          )
        }
      />

      {isAuthenticated && user?.role === "admin" && (
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
      )}

      {isAuthenticated && user?.role === "hallowner" && (
        <Route path="/hallowner" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
      )}

      {/* Redirect everything else to login or dashboard based on auth */}
      <Route
        path="*"
        element={
          isAuthenticated ? (
            <Navigate to={user?.role === "admin" ? "/admin" : "/hallowner"} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}

export default App;
