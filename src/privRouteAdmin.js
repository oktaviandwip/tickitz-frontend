import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { role } = useSelector((s) => s.users);

  if (role !== "admin") {
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;
