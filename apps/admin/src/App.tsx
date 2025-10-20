import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Layout from "@/components/layout";
import Login from "@/pages/Login";
import NotFound from "@/pages/404";
import { lazy, Suspense } from "react";

// Lazy imports
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));

// Lazy import (Admin)
const Halls = lazy(() => import("@/pages/admin/hall"));
const AddHall = lazy(() => import("@/pages/admin/hall/AddHall"));
const Hall = lazy(() => import("@/pages/admin/hall/HallId"));
const Users = lazy(() => import("@/pages/admin/user"));
const User = lazy(() => import("@/pages/admin/user/userId"));
const AddHallOwner = lazy(() => import("@/pages/admin/user/AddHallowner"));
const Movies = lazy(() => import("@/pages/admin/movie"));
const AddMovie = lazy(() => import("@/pages/admin/movie/AddMovie"));
const Movie = lazy(() => import("@/pages/admin/movie/movieId"));
const Screens = lazy(() => import("@/pages/admin/screen"));
const AddScreen = lazy(() => import("@/pages/admin/screen/AddScreen"));
const Screen = lazy(() => import("@/pages/admin/screen/ScreenId"));
const Shows = lazy(() => import("@/pages/admin/show"));
const AddShow = lazy(() => import("@/pages/admin/show/AddShow"));
const Show = lazy(() => import("@/pages/admin/show/ShowId"));
const Tickets = lazy(() => import("@/pages/admin/ticket"));

// Lazy imports (Hallowner)
const HallownerHalls = lazy(() => import("@/pages/hallowner/hall"));
const HallOwnerAddScreenForm = lazy(
  () => import("@/components/hallowner/screens/add-new-screen/AddNewScreenForm")
);
const HallownerHall = lazy(() => import("@/pages/hallowner/hall/hallId"));
const HallownerScreens = lazy(() => import("@/pages/hallowner/screen"));
const HallownerScreen = lazy(() => import("@/pages/hallowner/screen/screenId"));
const HallownerShows = lazy(() => import("@/pages/hallowner/show"));
const HallownerShow = lazy(() => import("@/pages/hallowner/show/showId"));
const HallownerAddShow = lazy(() => import("@/pages/hallowner/show/AddShow"));

function App() {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-center">
        loading...
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="text-center p-10"></div>}>
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
                {/* halls */}
                <Route path="/admin/halls" element={<Halls />} />
                <Route path="/admin/halls/add-hall" element={<AddHall />} />
                <Route path="/admin/halls/:hallId" element={<Hall />} />
                {/* screens */}
                <Route path="/admin/screens" element={<Screens />} />
                <Route
                  path="/admin/screens/add-screen"
                  element={<AddScreen />}
                />
                <Route path="/admin/screens/:screenId" element={<Screen />} />
                {/* shows */}
                <Route path="/admin/shows" element={<Shows />} />
                <Route path="/admin/shows/add-show" element={<AddShow />} />
                <Route path="/admin/shows/:showId" element={<Show />} />
                {/* tickets */}
                <Route path="/admin/tickets" element={<Tickets />} />
                {/* users */}
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/users/:userId" element={<User />} />
                {/* hallowners */}
                <Route
                  path="/admin/users/add-hallowner"
                  element={<AddHallOwner />}
                />
                {/* movies */}
                <Route path="/admin/movies" element={<Movies />} />
                <Route path="/admin/movies/add-movie" element={<AddMovie />} />
                <Route path="/admin/movies/:movieId" element={<Movie />} />
                {/* seats */}
                {/* bookings */}
                {/* tickets */}
              </>
            )}
            {user?.role === "hallOwner" && (
              <>
                <Route path="/hallowner" element={<AdminDashboard />} />
                {/* halls */}
                <Route path="/hallowner/halls" element={<HallownerHalls />} />
                <Route
                  path="/hallowner/halls/:hallId"
                  element={<HallownerHall />}
                />
                {/* screens */}
                <Route
                  path="/hallowner/screens"
                  element={<HallownerScreens />}
                />
                <Route
                  path="/hallowner/screens/:screenId"
                  element={<HallownerScreen />}
                />
                <Route
                  path="hallowner/screens/add-screen"
                  element={<HallOwnerAddScreenForm />}
                />
                {/* shows */}
                <Route path="/hallowner/shows" element={<HallownerShows />} />
                <Route
                  path="/hallowner/shows/add-show"
                  element={<HallownerAddShow />}
                />
                <Route
                  path="/hallowner/shows/:showId"
                  element={<HallownerShow />}
                />
              </>
            )}
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
