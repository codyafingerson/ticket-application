import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import IndexPage from "./pages/IndexPage";
import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/shared/ProtectedRoute";

// Protect pages
import Dashboard from "./pages/Dashboard";
import ActiveTickets from "./pages/ActiveTickets";
import TicketDetails from "./pages/TicketDetails";

// Admin pages
import AllTickets from "./pages/AllTickets";

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/active-tickets" element={<ProtectedRoute />}>
            <Route path="/active-tickets" element={<ActiveTickets />} />
          </Route>

          <Route path="/ticket/:ticketId" element={<ProtectedRoute />}>
            <Route path="/ticket/:ticketId" element={<TicketDetails />} />
          </Route>

          <Route path="/all-tickets" element={<ProtectedRoute adminRoute={true}/>}>
            <Route path="/all-tickets" element={<AllTickets />} />
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
