import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import Movies from "./pages/movies";
import MovieDetail from "./pages/movie-detail";
import Dashboard from "./pages/dashboard";
import AdminMovies from "./pages/admin-movies";
import AddMovie from "./pages/add-movie";
import PrivRouteUser from "./privRouteUser";
import PrivRouteAdmin from "./privRouteAdmin";
import EditMovie from "./pages/edit-movie";
import ReadMovie from "./pages/read-movie";
import Profile from "./pages/profile";

export default createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/sign-in",
    element: <SignIn />,
  },

  {
    path: "/sign-up",
    element: <SignUp />,
  },

  {
    path: "/movies",
    element: (
      <PrivRouteUser>
        <Movies />
      </PrivRouteUser>
    ),
  },

  {
    path: "/:movie_name",
    element: (
      <PrivRouteUser>
        <MovieDetail />
      </PrivRouteUser>
    ),
  },

  {
    path: "/profile/:id",
    element: (
      <PrivRouteUser>
        <Profile />
      </PrivRouteUser>
    ),
  },

  {
    path: "/admin/dashboard",
    element: (
      <PrivRouteAdmin>
        <Dashboard />
      </PrivRouteAdmin>
    ),
  },

  {
    path: "/admin/movies",
    element: (
      <PrivRouteAdmin>
        <AdminMovies />
      </PrivRouteAdmin>
    ),
  },

  {
    path: "/admin/movies/add",
    element: (
      <PrivRouteAdmin>
        <AddMovie />
      </PrivRouteAdmin>
    ),
  },

  {
    path: "/admin/movies/edit/:id",
    element: (
      <PrivRouteAdmin>
        <EditMovie />
      </PrivRouteAdmin>
    ),
  },

  {
    path: "/admin/movies/read/:id",
    element: (
      <PrivRouteAdmin>
        <ReadMovie />
      </PrivRouteAdmin>
    ),
  },
]);
