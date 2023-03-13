import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getTicketById } from "../features/tickets/ticketSlice";

function TicketDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ticketId } = useParams();

  const { ticket, isError, isLoading, errorMessage } = useSelector(
    (state) => state.tickets
  );

  useEffect(() => {
    dispatch(getTicketById(ticketId));
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <button onClick={goBack}>Back</button>
      <h1>{ticket.productName}</h1>
      <h2>{ticket.ticketNumber}</h2>

      <div>
        <h3>Product Details</h3>
        {ticket.partInventory.map((part) => (
          <div>
            <p>{part.partNumber}</p>
            <p>{part.description}</p>
            <p>{part.currentLot}</p>
          </div>
        ))}
      </div>
      <div>
        <h3>Notes</h3>
        {ticket.notes.map((note) => (
          <div>
            <p><b>{note.createdBy}</b>: {note.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicketDetails;
