import { useState } from "react";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, resetState } from "../features/auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useAuthStatus();
  const { user } = useSelector((state) => state.auth);

  const [showUtils, setShowUtils] = useState(false);

  if (!isLoggedIn) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(resetState());
    navigate("/");
  };

  const handleUtilsHover = () => {
    setShowUtils(true);
  };

  const handleUtilsLeave = () => {
    setShowUtils(false);
  };

  if (isLoggedIn && user) {
    return (
      // <div id="navbar">
      //   {/* Sidebar Content */}
      //   <Link to="/dashboard">Dashboard</Link>
      //   <Link to="/active-tickets">Open Tickets</Link>
      //   {user.isAdmin && (
      //     <div>
      //       <Link to="/all-tickets">All Tickets</Link>
      //       <Link to="#">Create Ticket</Link>
      //       <Link to="#">User Actions</Link>
      //       <Link
      //         to="#"
      //         className={showUtils ? "show-utils" : ""}
      //         onMouseEnter={handleUtilsHover}
      //         onMouseLeave={handleUtilsLeave}
      //       >
      //         Utils
      //         <div className="utils-options">
      //           <Link to="#">Option 1</Link>
      //           <Link to="#">Option 2</Link>
      //           <Link to="#">Option 3</Link>
      //         </div>
      //       </Link>
      //     </div>
      //   )}

      //   <button onClick={handleLogout}>Log out</button>
      // </div>
      <div className="navbar">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/active-tickets">Active Tickets</Link>
        {user.isAdmin && (
          <>
            <Link to="/all-tickets">All Tickets</Link>
            <div className="dropdown">
              <button className="dropbtn">
                Utils
                <i className="fa fa-caret-down" />
              </button>
              <div className="dropdown-content">
                <Link to="/create-user">Create User</Link>
                <Link to="#">View Users</Link>
                <Link to="/create-product">Create Product</Link>
                <Link to="/create-ticket">Create Ticket</Link>
              </div>
            </div>
          </>
        )}
        <div className="right">
          <button onClick={handleLogout}>Log out</button>
        </div>
      </div>
    );
  }
}

export default Navbar;
