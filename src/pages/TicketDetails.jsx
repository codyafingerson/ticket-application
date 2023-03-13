import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getTicketById } from "../features/tickets/ticketSlice";

import Spinner from "../components/shared/Spinner";

function TicketDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ticketId } = useParams();

  const { ticket, isError, isLoading, errorMessage } = useSelector(
    (state) => state.tickets
  );

  useEffect(() => {
    dispatch(getTicketById(ticketId));
    if (isError) alert(errorMessage);
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  if (isLoading) return <Spinner />;

  return (
    <div>
      <button onClick={goBack}>Back</button>
      <h1>{ticket.productName}</h1>
      <h2>{ticket.ticketNumber}</h2>

      {ticket && ticket.partInventory && (
        <div>
          <h3>Product Details</h3>
          {ticket.partInventory.map((part) => (
            <div key={part._id}>
              <p>{part.partNumber}</p>
              <p>{part.description}</p>
              <p>{part.currentLot}</p>
            </div>
          ))}
        </div>
      )}

      {ticket && ticket.notes && (
        <div>
          <h3>Notes</h3>
          {ticket.notes.map((note) => (
            <div key={note._id}>
              <p>
                <b>{note.createdBy}</b>: {note.body}
              </p>
            </div>
          ))}
        </div>
      )}

      {ticket.stationRecords && ticket.stationRecords.length > 0 && (
        <div>
          <h3>Stations</h3>
          {ticket.stationRecords.map((s) => (
            <div key={s._id}>
              <p>{s.station}</p>
              <p>{s.completedBy}</p>
              <p>{s.timeTaken}</p>
              <p>{new Date(s.dateCompleted).toLocaleDateString('en-US')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TicketDetails;
