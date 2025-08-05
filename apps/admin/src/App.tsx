import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/layout";
import Login from "@/pages/Login";
import { useAuth } from "./context/AuthContext";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import Halls from "@/pages/admin/hall";
import AddHall from "@/pages/admin/hall/AddHall";
import NotFound from "@/pages/404";
import Users from "./pages/admin/user";

function App() {
  const { loading, isAuthenticated, user } = useAuth();

  if (!loading) {
    return (
      <div className="h-screen flex justify-center items-center text-center">
        loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to={user?.role === "admin" ? "/admin" : "/hallowner"} />
          ) : (
            <Login />
          )
        }
      />

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

      {/* All authenticated routes wrapped with Layout */}
      {isAuthenticated ? (
        <Route element={<Layout />}>
          {user?.role === "admin" && (
            <>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/halls" element={<Halls />} />
              <Route path="/admin/halls/add-hall" element={<AddHall />} />
            </>
          )}
          {user?.role === "hallOwner" && (
            <Route path="/hallowner" element={<AdminDashboard />} />
          )}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
