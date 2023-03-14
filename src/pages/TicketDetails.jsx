import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  getTicketById,
  addNewNoteToTicket,
  removeNoteFromTicket,
  deleteTicket,
  addStationDetails,
  resetState
} from "../features/tickets/ticketSlice";

import MainContainer from "../components/shared/MainContainer";

function TicketDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [noteText, setNoteText] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);

  const { ticketId } = useParams();

  const { ticket, isError, isLoading, errorMessage } = useSelector(
    (state) => state.tickets
  );

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getTicketById(ticketId));
    if (isError) alert(errorMessage);
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const handleAddNote = () => {
    const id = ticketId;
    const note = {
      body: noteText,
      createdBy: user.firstName + " " + user.lastName,
    };
    dispatch(addNewNoteToTicket({ id, note })).then(() => {
      dispatch(getTicketById(ticketId));
    });
    setNoteText("");
    setShowNoteInput(false);
  };

  const handleDeleteNote = (noteId) => {
    const id = ticketId;
    if (window.confirm("Are you sure you want to delete this note?")) {
      dispatch(removeNoteFromTicket({ id, noteId })).then(() => {
        dispatch(getTicketById(ticketId));
      });
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      dispatch(deleteTicket(ticketId));
      dispatch(resetState());
      navigate(-1);
    }
  };
  
  

  // if (isLoading) return <Spinner />;

  return (
    <MainContainer>
      <button onClick={goBack}>Back</button>
      {user.isAdmin && (
          <>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      {ticket.status === "open" ? <p style={{ color: "green" }}>Open</p> : ""}

      {ticket.status === "in-progress" ? (
        <p style={{ color: "orange" }}>In-Progress</p>
      ) : (
        ""
      )}

      {ticket.status === "closed" ? <p style={{ color: "red" }}>Closed</p> : ""}

      <h2>{ticket.ticketNumber}</h2>

      <table>
        <tbody>
          <tr>
            <th>Product Name</th>
            <td>{ticket.productName}</td>
          </tr>
          <tr>
            <th>Revision</th>
            <td>{ticket.revision}</td>
          </tr>
          <tr>
            <th>Internal Lot Number</th>
            <td>{ticket.lotNumber}</td>
          </tr>
          <tr>
            <th>Quantity</th>
            <td>{ticket.quantity}</td>
          </tr>
        </tbody>
      </table>
      <br />
      {ticket && ticket.partInventory && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Part Number</th>
                <th>Description</th>
                <th>Current Lot</th>
              </tr>
            </thead>
            <tbody>
              {ticket.partInventory.map((part) => (
                <tr key={part._id}>
                  <td>{part.partNumber}</td>
                  <td>{part.description}</td>
                  <td>{part.currentLot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {ticket.stationRecords && ticket.stationRecords.length > 0 && (
        <div>
          <h3>Stations</h3>
          <table>
            <thead>
              <tr>
                <th>Station</th>
                <th>Name</th>
                <th>Time</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {ticket.stationRecords.map((s) => (
                <tr key={s._id}>
                  <td>{s.station}</td>
                  <td>{s.completedBy}</td>
                  <td>{s.timeTaken}</td>
                  <td>
                    {s.dateCompleted != null ? new Date(s.dateCompleted).toLocaleDateString("en-US") : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
              {user.isAdmin && (
                <button onClick={() => handleDeleteNote(note._id)}>
                  Remove Note
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <button onClick={() => setShowNoteInput(true)}>Add Note</button>
      {showNoteInput && (
        <div>
          <input
            type="text"
            placeholder="Type your note here"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          <button onClick={handleAddNote}>Save Note</button>
          <button onClick={() => setShowNoteInput(false)}>Cancel</button>
        </div>
      )}
    </MainContainer>
  );
}

export default TicketDetails;
