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
import Hall from "./pages/admin/hall/HallId";
import User from "./pages/admin/user/userId";
import AddHallOwner from "./pages/admin/user/AddHallowner";
import Movies from "./pages/admin/movie";
import AddMovie from "./pages/admin/movie/AddMovie";
import Movie from "./pages/admin/movie/movieId";
import Screens from "./pages/admin/screen";
import AddScreen from "./pages/admin/screen/AddScreen";
import Screen from "./pages/admin/screen/ScreenId";
import Shows from "./pages/admin/show";
import AddShow from "./pages/admin/show/AddShow";
import Show from "./pages/admin/show/ShowId";
import Tickets from "./pages/admin/ticket";
import HallownerHalls from "./pages/hallowner/hall";
import HallOwnerAddScreenForm from "./components/hallowner/screens/add-new-screen/AddNewScreenForm";
import HallownerHall from "./pages/hallowner/hall/hallId";
import HallownerScreens from "./pages/hallowner/screen";
import HallownerScreen from "./pages/hallowner/screen/screenId";

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
              <Route path="/admin/screens/add-screen" element={<AddScreen />} />
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
              <Route path="/hallowner/screens" element={<HallownerScreens />} />
              <Route
                path="/hallowner/screens/:screenId"
                element={<HallownerScreen />}
              />
              <Route
                path="hallowner/screens/add-screen"
                element={<HallOwnerAddScreenForm />}
              />
            </>
          )}
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
