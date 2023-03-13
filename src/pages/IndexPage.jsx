import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";

import Spinner from "../components/shared/Spinner";

function IndexPage() {
  const { user, isError, isLoading, errorMessage } = useSelector(
    (state) => state.auth
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }

    if (isError) {
      alert(errorMessage);
    }
  }, [user, navigate, isError, errorMessage]);

  const handleLoginForm = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    } else {
      const userData = {
        username,
        password,
      };
      dispatch(loginUser(userData));
    }
  };

  const handleFormReset = () => {
    setUsername("");
    setPassword("");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLoginForm}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Login</button>
          <button type="reset" onClick={handleFormReset}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
export default IndexPage;
