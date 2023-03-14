import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createTemplate,
  resetState,
} from "../features/templates/templateSlice";

import MainContainer from "../components/shared/MainContainer";

function CreateProduct() {
  const dispatch = useDispatch();

  const [templateName, setTemplateName] = useState("");
  const [productName, setProductName] = useState("");
  const [revision, setRevision] = useState("");
  const [quantity, setQuantity] = useState("");
  const [lotNumber, setLotNumber] = useState("");
  const [partInventory, setPartInventory] = useState([]);
  const [stationRecords, setStationRecords] = useState([]);

  const addPart = () => {
    setPartInventory([
      ...partInventory,
      { partNumber: "", description: "", currentLot: "" },
    ]);
  };

  const addStation = () => {
    setStationRecords([
      ...stationRecords,
      { station: "", completedBy: "", timeTaken: 0, dateCompleted: "" },
    ]);
  };

  const updatePart = (index, field, value) => {
    const newPart = [...partInventory];
    newPart[index][field] = value;
    setPartInventory(newPart);
  };

  const updateStation = (index, field, value) => {
    const newStation = [...stationRecords];
    newStation[index][field] = value;
    setStationRecords(newStation);
  };

  const createNewTemplate = (e) => {
    e.preventDefault();
    dispatch(
      createTemplate({
        templateName,
        productName,
        revision,
        quantity,
        lotNumber,
        partInventory,
        stationRecords,
      })
    );
    alert("Template created successfully");
    dispatch(resetState());
  }

  return (
    <MainContainer>
      <h1>New Product</h1>
      <div>
        <form onSubmit={createNewTemplate}>
        <div>
          <label htmlFor="templateName">Template Name</label>
          <input
            type="text"
            id="templateName"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
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
          <label htmlFor="revision">Revision</label>
          <input
            type="text"
            id="revision"
            value={revision}
            onChange={(e) => setRevision(e.target.value)}
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
                value={component.description}
                onChange={(e) =>
                  updatePart(index, "description", e.target.value)
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
            </div>
          ))}
          <button type="button" onClick={addStation}>
            Add Station
          </button>
        </div>

        <div>
          <button type="submit">Create Product</button>
        </div>
        </form>
      </div>
    </MainContainer>
  );
}
export default CreateProduct;
