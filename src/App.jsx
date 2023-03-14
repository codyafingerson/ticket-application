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
import CreateTicket from "./pages/CreateTicket";
import CreateProduct from "./pages/CreateProduct";
import CreateUser from "./pages/CreateUser";

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

          <Route path="/create-ticket" element={<ProtectedRoute adminRoute={true}/>}>
            <Route path="/create-ticket" element={<CreateTicket />} />
          </Route>

          <Route path="/create-product" element={<ProtectedRoute adminRoute={true}/>}>
            <Route path="/create-product" element={<CreateProduct />} />
          </Route>

          <Route path="/create-user" element={<ProtectedRoute adminRoute={true}/>}>
            <Route path="/create-user" element={<CreateUser />} />
          </Route>
          
          <Route
            path="/not-authorized"
            element={<h1>You are not authorized to view this page</h1>}
          />

          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
    </Router>
  );
}

export default App;
