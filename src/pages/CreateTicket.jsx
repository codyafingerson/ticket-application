import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTicket, resetState } from "../features/tickets/ticketSlice";
import { getAllTemplates } from "../features/templates/templateSlice";

import MainContainer from "../components/shared/MainContainer";
import TicketNumberGenerator from "../utils/generateTicketNumber";

function CreateTicket() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { templates, template } = useSelector((state) => state.templates);
  const { user } = useSelector((state) => state.auth);

  const [status, setStatus] = useState("");
  const [ticketNumber, setTicketNumber] = useState(
    TicketNumberGenerator.generate()
  );
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [lotNumber, setLotNumber] = useState("");
  const [notes, setNotes] = useState([]);
  const [partInventory, setPartInventory] = useState([]);
  const [stationRecords, setStationRecords] = useState([]);
  const [selectedTicketTemplate, setSelectedTicketTemplate] = useState(null);

  useEffect(() => {
    if (selectedTicketTemplate) {
      setProductName(selectedTicketTemplate.productName);
      setQuantity(selectedTicketTemplate.quantity);
      setPartInventory(selectedTicketTemplate.partInventory);
      setStationRecords(selectedTicketTemplate.stationRecords);
    }
  }, [selectedTicketTemplate]);

  useEffect(() => {
    dispatch(getAllTemplates());
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createTicket({
        status,
        ticketNumber,
        productName,
        quantity,
        lotNumber,
        notes,
        partInventory,
        stationRecords,
      })
    );
    alert("Ticket created successfully");
    navigate(`/tickets/${newTicket._id}`);
    dispatch(resetState());
  };

  const goBack = () => {
    navigate(-1);
  };

  const addNote = () => {
    setNotes([...notes, ""]);
  };

  const updateNote = (index, value) => {
    const newNotes = [...notes];
    newNotes[index] = { body: value, createdBy: user.username };
    setNotes(newNotes);
  };

  const addPart = () => {
    setPartInventory([
      ...partInventory,
      { partNumber: "", partDescription: "", currentLot: "" },
    ]);
  };

  const updatePart = (index, field, value) => {
    const newComponents = [...partInventory];
    newComponents[index][field] = value;
    setPartInventory(newComponents);
  };

  const addStation = () => {
    setStationRecords([
      ...stationRecords,
      { station: "", completedBy: "", timeTaken: 0, date: new Date() },
    ]);
  };

  const updateStation = (index, field, value) => {
    const newStationRecord = [...stationRecords];
    newStationRecord[index][field] = value;
    setStationRecords(newStationRecord);
  };

  const resetFormState = () => {
    setSelectedTicketTemplate(null);
    setStatus("open");
    setTicketNumber(TicketNumberGenerator.generate());
    setProductName("");
    setQuantity("");
    setLotNumber("");
    setNotes([]);
    setPartInventory([]);
    setStationRecords([]);
  };

  return (
    <MainContainer>
      <div className="form-container">
        <button onClick={goBack}>Back</button>
        <h1>Create New Ticket</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="status">Ticket Status</label>
            <select
              name="status"
              id="status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="#">Select a status...</option>
              <option value="open">Open</option>
              <option value="in-progress">In-Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div>
            <label htmlFor="ticketNumber">Ticket Number</label>
            <input
              type="text"
              id="ticketNumber"
              value={ticketNumber}
              onChange={(e) => setTicketNumber(e.target.value)}
              disabled
            />
          </div>
          <div>
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lotNumber">Lot Number</label>
            <input
              type="text"
              id="lotNumber"
              value={lotNumber}
              onChange={(e) => setLotNumber(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="notes">Notes</label>
            {notes.map((note, index) => (
              <div key={index}>
                <input
                  type="text"
                  onChange={(e) => updateNote(index, e.target.value)}
                />
              </div>
            ))}
            <button type="button" onClick={addNote}>
              Add Note
            </button>
          </div>

          <div>
            {partInventory.map((component, index) => (
              <div key={index}>
                <label>Part Number</label>
                <input
                  type="text"
                  value={component.partNumber}
                  onChange={(e) =>
                    updatePart(index, "partNumber", e.target.value)
                  }
                />
                <label>Part Description</label>
                <input
                  type="text"
                  value={component.partDescription}
                  onChange={(e) =>
                    updatePart(index, "partDescription", e.target.value)
                  }
                />
                <label>Current Lot</label>
                <input
                  type="text"
                  value={component.currentLot}
                  onChange={(e) =>
                    updatePart(index, "currentLot", e.target.value)
                  }
                />
              </div>
            ))}
            <button type="button" onClick={addPart}>
              Add Part
            </button>
          </div>

          <div>
            {stationRecords.map((station, index) => (
              <div key={index}>
                <label>Station</label>
                <input
                  type="text"
                  value={station.station}
                  onChange={(e) =>
                    updateStation(index, "station", e.target.value)
                  }
                />
                <label>Completed By</label>
                <input
                  type="text"
                  value={station.completedBy}
                  onChange={(e) =>
                    updateStation(index, "completedBy", e.target.value)
                  }
                />
                <label>Time</label>
                <input
                  type="text"
                  value={station.timeTaken}
                  onChange={(e) => updateStation(index, "time", e.target.value)}
                />
                <label>Date</label>
                <input
                  type="date"
                  value={station.date}
                  onChange={(e) => updateStation(index, "date", e.target.value)}
                />
              </div>
            ))}
            <button type="button" onClick={addStation}>
              Add Station
            </button>
          </div>

          <div>
            <label htmlFor="ticketTemplate">Template</label>
            <select
              name="ticketTemplate"
              id="ticketTemplate"
              value={template ? template.templateName : ""}
              onChange={(e) =>
                setSelectedTicketTemplate(
                  templates.find(
                    (template) => template.templateName === e.target.value
                  )
                )
              }
            >
              <option value="">Select a ticket template...</option>
              {templates.map((template, index) => (
                <option key={index} value={template.templateName}>
                  {template.templateName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button type="submit">Create Ticket</button>
            <button type="button" onClick={resetFormState}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </MainContainer>
  );
}
export default CreateTicket;
