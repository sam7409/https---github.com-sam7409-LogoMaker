import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  icons: false,
  backgrounds: false,
  text: false,
  textColors: false,
  textBackgroundColor: false,
};

export const drawerStateSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    handleIconDrawer: (state) => {
      state.icons = !state.icons;

      if (state.backgrounds || state.text || state.textColors) {
        state.backgrounds = false;
        state.text = false;
        state.textColors = false;
        state.textBackgroundColor = false;
      }
    },
    handleBackgroundDrawer: (state) => {
      state.backgrounds = !state.backgrounds;

      if (state.icons || state.text || state.textColors) {
        state.icons = false;
        state.text = false;
        state.textColors = false;
        state.textBackgroundColor = false;
      }
    },
    handleTextDrawer: (state) => {
      state.text = !state.text;

      if (state.icons || state.backgrounds || state.textColors || state.textBackgroundColor) {
        state.icons = false;
        state.backgrounds = false;
        state.textColors = false;
        state.textBackgroundColor = false;
      }
    },
    handleTextColorsDrawer: (state) => {
      state.textColors = !state.textColors;

      if (
        state.backgrounds ||
        state.text ||
        state.icons ||
        state.textBackgroundColor
      ) {
        state.backgrounds = false;
        state.text = false;
        state.icons = false;
        state.textBackgroundColor = false;
      }
    },
    handleTextBackgroundColorsDrawer: (state) => {
      state.textBackgroundColor = !state.textBackgroundColor;

      if (state.backgrounds || state.text || state.icons || state.textColors) {
        state.backgrounds = false;
        state.text = false;
        state.icons = false;
        state.textColors = false;
      }
    },
  },
});

export const {
  handleIconDrawer,
  handleBackgroundDrawer,
  handleTextDrawer,
  handleTextColorsDrawer,
  handleTextBackgroundColorsDrawer,
} = drawerStateSlice.actions;

export default drawerStateSlice.reducer;
