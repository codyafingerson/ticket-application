import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { decryptUser } from "../../utils/userEncryptor";
import authService from "./authService";

const encryptedUser = localStorage.getItem("user");
let user;
if (encryptedUser) {
  user = decryptUser(encryptedUser);
}

const initialState = {
  user: user ? user : null,
  isError: false,
  isLoading: false,
  errorMessage: "",
};

/**
 * Login the user using the object passed in the payload
 * @param {Object} userData
 * @param {String} userData.username
 * @param {String} userData.password
 * @returns {Promise} the user object returned from the server
 * @throws {Error} if the username or password is not provided in the payload or if the server returns an error
 */
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkApi) => {
    try {
      if (userData.username && userData.password) {
        return await authService.login(userData.username, userData.password);
      } else {
        throw new Error("Username and password are required");
      }
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

/**
 * Register the user using the object passed in the payload
 * @param {Object} userData
 * @param {String} userData.isAdmin
 * @param {String} userData.firstName
 * @param {String} userData.lastName
 * @param {String} userData.username
 * @param {String} userData.password
 * @param {String} userData.username
 */
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      return await authService.register(userData);
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

/**
 * Logout the user by removing the user from local storage
 * @returns {Promise} the user object returned from the server
 * @throws {Error} if the server returns an error
 */
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

/**
 * Slice of the redux store that handles the authentication state of the user
 * @module authSlice
 */
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.isError = false;
      state.errorMessage = "";
    },
    resetState: (state) => {
      state.user = null;
      state.isError = false;
      state.isLoading = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
    });
  },
});

export const { clearError, resetState } = authSlice.actions;

export default authSlice.reducer;
