import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "../pages/Signup";
import MovieDetails from "../components/Movie/MovieDetails";
// import BookingDetails from "./components/BookingDetails";
import Login from "../pages/Login";
import Home from "../pages/Home";
import UserDashboard from "../pages/UserDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "./ProtectedRoute";
import AddMoviePage from "../components/Movie/AddMovie";
import Theater from "../components/Theaters/Theater";

const AppRoutes = () => {
  const { user } = JSON.parse(localStorage.getItem("user"));
  const { role } = user;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          {role === "admin" && (
            <>
              <Route path="/admin/:id" element={<AdminDashboard />} />
              <Route path="/addMovie" element={<AddMoviePage />} />
              <Route path="/theater" element={<Theater />} />
            </>
          )}
          <Route path="/user/:id" element={<UserDashboard />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
