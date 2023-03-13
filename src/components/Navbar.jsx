import { useAuthStatus } from "../hooks/useAuthStatus";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, resetState } from "../features/auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useAuthStatus();
  const { user } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(resetState());
    navigate("/");
  };

  if (isLoggedIn && user) {
    return (
      <div id="sidebar">
        {/* Sidebar Content */}
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/active-tickets">Open Tickets</Link>
        {user.isAdmin && (
          <>
            <Link to="#">All Tickets</Link>
            <Link to="#">Create Ticket</Link>
            <Link to="#">User Actions</Link>
            <Link to="#">Utils</Link>
          </>
        )}

        <button onClick={handleLogout}>Log out</button>
      </div>
    );
  }
}

export default Navbar;
