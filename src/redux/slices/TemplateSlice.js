import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  industries: [],
  templates: [],
  loading: false,
  templateBackground: {
    type: "",
    color: "",
    file: "",
  },
  error: null,
  template: null,
};

export const loadIndustryTemplates = createAsyncThunk(
  "data/fetchIndustries",
  async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_INDUSTRIES_TEMPLATES_API}`
      );
      const results = await response.json();
      return results;
    } catch (error) {
      throw error;
    }
  }
);

export const loadTemplatesByIndustry = createAsyncThunk(
  "data/fetchTemplatesByIndustry",
  async (industryName) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_TEMPLATES_BY_INDUSTRY_API}=${industryName}`
      );
      const results = await response.json();
      return results;
    } catch (error) {
      throw error;
    }
  }
);

export const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    handleIndustryTemplate: (state, action) => {
      const templateData = action.payload;
      const updatedTemplateData = { ...templateData, width: 500, height: 500 };
      localStorage.setItem("templateData", JSON.stringify(updatedTemplateData));
      state.template = updatedTemplateData;
    },
    getIndustryTemplateFromLocalStorage: (state, action) => {
      state.template = action.payload;
    },
    handleTemplateBackground: (state, action) => {
      if (action.payload.type === "color") {
        state.templateBackground.type = action.payload.type;
        state.templateBackground.color = action.payload.color;
      } else {
        state.templateBackground.type = action.payload.type;
        state.templateBackground.file = action.payload.file;
      }
    },
    resetTemplateBackground: (state) => {
      state.templateBackground = { color: "", file: "" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIndustryTemplates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadIndustryTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.industries = action.payload;
      })
      .addCase(loadIndustryTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loadTemplatesByIndustry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTemplatesByIndustry.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload;
      })
      .addCase(loadTemplatesByIndustry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  handleIndustryTemplate,
  getIndustryTemplateFromLocalStorage,
  handleTemplateBackground,
  resetTemplateBackground,
} = templateSlice.actions;

export default templateSlice.reducer;
