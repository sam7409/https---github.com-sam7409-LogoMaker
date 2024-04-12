import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  textEdit: false,
  textColor: "",
  fontSize: 28,
  fontFamily: "Arial",
  opacity: 1,
  bold: false,
  italic: false,
  backgroundColor: "",
  textAlign: "",
};

export const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    handleTextFontFamily: (state, action) => {
      state.fontFamily = action.payload;
    },
    handleTextEditEnable: (state) => {
      state.textEdit = true;
    },

    handleTextEditDisable: (state) => {
      state.textEdit = false;
    },

    handleTextFontSizeDecreaseByOne: (state) => {
      state.fontSize = state.fontSize - 1;
    },
    handleTextFontSizeIncreaseByOne: (state) => {
      state.fontSize = state.fontSize + 1;
    },

    updatedTextSize: (state, action) => {
      state.fontSize = action.payload;
    },

    handleTextColor: (state, action) => {
      state.textColor = action.payload.textColor;
    },
    handleBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload.textBgColor;
    },

    handleTextAlign: (state, action) => {
      state.textAlign = action.payload;
    },

    handleTextOpacity: (state, action) => {
      state.opacity = action.payload;
    },
    handleTextBold: (state) => {
      state.bold = !state.bold;
    },
    handleTextItalic: (state) => {
      state.italic = !state.italic;
    },

    resetTextColor: (state) => {
      state.textColor = "";
    },
    resetTextBackgroundColor: (state) => {
      state.backgroundColor = "";
    },
  },
});

export const {
  handleTextFontFamily,
  handleTextEditEnable,
  handleTextEditDisable,
  updatedTextSize,
  handleBackgroundColor,
  handleTextAlign,
  handleTextColor,
  handleTextOpacity,
  handleTextBold,
  handleTextItalic,
  handleTextUnderline,
  handleTextFontSizeIncreaseByOne,
  handleTextFontSizeDecreaseByOne,
  resetTextColor,
  resetTextBackgroundColor,
} = textSlice.actions;

export default textSlice.reducer;
