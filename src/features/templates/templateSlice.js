import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import templateService from "./templateService";

const initialState = {
  templates: [],
  template: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: "",
};

export const getAllTemplates = createAsyncThunk(
  "templates/getAllTemplates",
  async (_, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await templateService.getTemplates(token);
    } catch (error) {
      const errorMessage = error.response.data.message;
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const getTemplateById = createAsyncThunk(
  "templates/getTemplateById",
  async (id, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await templateService.getTemplateById(id, token);
    } catch (error) {
      const errorMessage = error.response.data.message;
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const createTemplate = createAsyncThunk(
  "templates/createTemplate",
  async (templateData, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await templateService.createTemplate(templateData, token);
    } catch (error) {
      const errorMessage = error.response.data.message;
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const updateTemplate = createAsyncThunk(
  "templates/updateTemplate",
  async (templateData, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await templateService.updateTemplate(
        templateData.id,
        templateData,
        token
      );
    } catch (error) {
      const errorMessage = error.response.data.message;
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const deleteTemplate = createAsyncThunk(
  "templates/deleteTemplate",
  async (id, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await templateService.deleteTemplate(id, token);
    } catch (error) {
      const errorMessage = error.response.data.message;
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const templateSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    resetState: (state) => {
      state.templates = [];
      state.template = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTemplates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTemplates.fulfilled, (state, action) => {
        state.templates = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllTemplates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(getTemplateById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTemplateById.fulfilled, (state, action) => {
        state.template = action.payload;
        state.isLoading = false;
      })
      .addCase(getTemplateById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(createTemplate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTemplate.fulfilled, (state, action) => {
        state.templates.push(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createTemplate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(updateTemplate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTemplate.fulfilled, (state, action) => {
        const index = state.templates.findIndex(
          (template) => template.id === action.payload.id
        );
        state.templates[index] = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateTemplate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(deleteTemplate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTemplate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.template = action.payload;
      })
      .addCase(deleteTemplate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { resetState } = templateSlice.actions;

export default templateSlice.reducer;
