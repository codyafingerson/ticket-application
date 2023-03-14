import { Link } from "react-router-dom";

const TicketTable = ({ tickets, expanded }) => {
  if (!expanded) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Ticket Number</th>
            <th scope="col">Product Name</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>
                <Link to={`/ticket/${ticket._id}`}>{ticket.ticketNumber}</Link>
              </td>
              <td>{ticket.productName}</td>
              <td>{ticket.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (expanded) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Ticket Number</th>
            <th scope="col">Product Name</th>
            <th scope="col">Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>
                <Link to={`/ticket/${ticket._id}`}>{ticket.ticketNumber}</Link>
              </td>
              <td>{ticket.productName}</td>
              <td>{ticket.quantity}</td>
              {ticket.status === "in-progress" ? (
                <td>In-Progress</td>
              ): ticket.status === "closed" ? (
                <td>Closed</td>
              ): ticket.status === "open" ? (
                <td>Open</td>
              ): (
                <td>Error</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
};

export default TicketTable;
