import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ticketService from "./ticketService";

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: "",
};

export const getAllTickets = createAsyncThunk(
  "tickets/getAllTickets",
  async (_, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      const openTickets = await ticketService.getOpenTickets(token);
      const closedTickets = await ticketService.getClosedTickets(token);
      const inProgressTickets = await ticketService.getInProgressTickets(token);

      // Check if any of the arrays are empty before concatenating them
      const allTickets = [];
      if (openTickets.length > 0) {
        allTickets.push(...openTickets);
      }
      if (closedTickets.length > 0) {
        allTickets.push(...closedTickets);
      }
      if (inProgressTickets.length > 0) {
        allTickets.push(...inProgressTickets);
      }

      return allTickets;
    } catch (error) {
      const errorMessage = error.response.data.message;
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const getInProgressTickets = createAsyncThunk(
  "tickets/getInProgressTickets",
  async (_, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await ticketService.getInProgressTickets(token);
    } catch (error) {
      const errorMessage = error.response.data.message;
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const getTicketById = createAsyncThunk(
  "tickets/getTicketById",
  async (id, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await ticketService.getTicketById(id, token);
    } catch (error) {
      const errorMessage = error.response.data.message;
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const addNewNoteToTicket = createAsyncThunk(
  "tickets/addNewNoteToTicket",
  async ({ id, note }, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await ticketService.addNewNoteToTicket(id, note, token);
    } catch (error) {
      const errorMessage = error.response.data.message;
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const removeNoteFromTicket = createAsyncThunk(
  "tickets/removeNoteFromTicket",
  async ({ id, noteId }, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await ticketService.removeNoteFromTicket(id, noteId, token);
    } catch (error) {
      const errorMessage = error.response.data.message;
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const deleteTicket = createAsyncThunk(
  "tickets/deleteTicket",
  async (id, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await ticketService.deleteTicket(id, token);
    } catch (error) {
      const errorMessage = error.response.data.message;
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async (ticketData, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await ticketService.createTicket(ticketData, token);
    } catch (error) {
      const errorMessage = error.response.data.message;
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const addStationDetails = createAsyncThunk(
  "tickets/addStationDetails",
  async (ticketData, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await ticketService.addStationDetails(ticketData, token);
    } catch (error) {
      const errorMessage = error.response.data.message;
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    resetState: (state) => {
      state.tickets = [];
      state.ticket = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(getAllTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(getInProgressTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInProgressTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(getInProgressTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(getTicketById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicketById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(getTicketById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(addNewNoteToTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewNoteToTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(addNewNoteToTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(removeNoteFromTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeNoteFromTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(removeNoteFromTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(deleteTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(deleteTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ticket = action.payload;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(addStationDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addStationDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ticket = action.payload;
      })
      .addCase(addStationDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { resetState } = ticketSlice.actions;

export default ticketSlice.reducer;
