import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { isAuth } = useSelector((s) => s.users);

  if (!isAuth) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default PrivateRoute;
