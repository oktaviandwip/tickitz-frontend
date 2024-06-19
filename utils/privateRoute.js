import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, role }) => {
  const { isAuth } = useSelector((s) => s.auth);
  const { profile } = useSelector((s) => s.user);

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  if (role === "admin" && profile.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
