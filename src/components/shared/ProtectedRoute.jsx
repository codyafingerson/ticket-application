import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import { useAuthStatus } from "../../hooks/useAuthStatus";

function ProtectedRoute({ adminRoute }) {
  const { isLoggedIn, checkingStatus, isAdmin } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (adminRoute && !isAdmin) {
    return <Navigate to="/not-authorized" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
