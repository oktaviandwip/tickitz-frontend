import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./privateRoute";

import Home from "../src/pages/home/Home";
import Login from "../src/pages/auth/Login";
import Signup from "../src/pages/auth/Signup";
import ResetPassword from "../src/pages/auth/ResetPassword";
import MovieList from "../src/pages/movie/MovieList";
import MovieDetails from "../src/pages/movie/MovieDetails";
import Profile from "../src/pages/profile/profile";
import Dashboard from "../src/pages/admin/Dashboard";
import AdminMovies from "../src/pages/admin/AdminMovies";
import AddMovie from "../src/pages/admin/AddMovie";
import EditMovie from "../src/pages/admin/EditMovie";
import ReadMovie from "../src/pages/admin/ReadMovie";

export default createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/reset-password",
    element: <ResetPassword />,
  },

  {
    path: "/movies",
    element: <MovieList />,
  },

  {
    path: "/movies/:name",
    element: (
      <PrivateRoute>
        <MovieDetails />
      </PrivateRoute>
    ),
  },

  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },

  {
    path: "/admin/dashboard",
    element: (
      <PrivateRoute role={"admin"}>
        <Dashboard />
      </PrivateRoute>
    ),
  },

  {
    path: "/admin/movies",
    element: (
      <PrivateRoute role={"admin"}>
        <AdminMovies />
      </PrivateRoute>
    ),
  },

  {
    path: "/admin/movies/add",
    element: (
      <PrivateRoute role={"admin"}>
        <AddMovie />
      </PrivateRoute>
    ),
  },

  {
    path: "/admin/movies/edit/:id",
    element: (
      <PrivateRoute role={"admin"}>
        <EditMovie />
      </PrivateRoute>
    ),
  },

  {
    path: "/admin/movies/read/:id",
    element: (
      <PrivateRoute role={"admin"}>
        <ReadMovie />
      </PrivateRoute>
    ),
  },
]);
