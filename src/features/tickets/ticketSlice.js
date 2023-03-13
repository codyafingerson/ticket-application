import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ticketService from "./ticketService";

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isLoading: false,
  errorMessage: "",
};

export const getOpenTickets = createAsyncThunk(
  "tickets/getOpenTickets",
  async (_, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await ticketService.getOpenTickets(token);
    } catch (error) {
      const errorMessage = error.response.data.message;
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const getClosedTickets = createAsyncThunk(
  "tickets/getClosedTickets",
  async (_, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await ticketService.getClosedTickets(token);
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
  async (data, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await ticketService.addNewNoteToTicket(
        data.id,
        data.note,
        data.createdBy,
        token
      );
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
      state.isLoading = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOpenTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOpenTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets = action.payload;
      })
      .addCase(getOpenTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(getClosedTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClosedTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets = action.payload;
      })
      .addCase(getClosedTickets.rejected, (state, action) => {
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
        state.ticket = action.payload;
      })
      .addCase(addNewNoteToTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { resetState } = ticketSlice.actions;

export default ticketSlice.reducer;