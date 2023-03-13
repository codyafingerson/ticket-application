import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ticketService from "./ticketService";

const initialState = {
  tickets: [],
  isError: false,
  isLoading: false,
  errorMessage: "",
};

export const getOpenTickets = createAsyncThunk(
  "tickets/open",
  async (_, thunkApi) => {
    try {
      return await ticketService.getOpenTickets();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.errorMessage) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getClosedTickets = createAsyncThunk(
  "tickets/closed",
  async (_, thunkApi) => {
    try {
      return await ticketService.getClosedTickets();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.errorMessage) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getInProgressTickets = createAsyncThunk(
  "tickets/in-progress",
  async (_, thunkApi) => {
    try {
      return await ticketService.getInProgressTickets();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.errorMessage) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getTicketById = createAsyncThunk(
  "tickets/id",
  async (id, thunkApi) => {
    try {
      return await ticketService.getTicketById(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.errorMessage) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const addNewNoteToTicket = createAsyncThunk(
    "tickets/new-note",
    async ({ ticketId, note, createdBy }, thunkAPI) => {
      // Add createdBy to the destructured arguments
      try {
        console.log(note.body + " from redux");
        const token = thunkAPI.getState().auth.user.token;
        // const noteWithCreatedBy = { ...note, createdBy }; // Add createdBy to the note object
        return await addNote(ticketId, note, createdBy, token);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        return thunkAPI.rejectWithValue(message);
      }
    }
);
