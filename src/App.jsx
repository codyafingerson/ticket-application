import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import IndexPage from "./pages/IndexPage";
import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/shared/ProtectedRoute";

// Protect pages
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route
            path="/not-authorized"
            element={<h1>User not authorized</h1>}
          />
        </Routes>
    </Router>
  );
}

export default App;
