import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  stickers: [],
  isFlip: {
    type: "",
    HorizontalFlip: false,
    VerticalFlip: false,
  },
  opacityValue: 1,
  objectBackground: null,
  replacedSelectedObject: false,
  loading: false,
  error: null,
};

export const loadStickers = createAsyncThunk("data/fetchStickers", async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_STICKERS_API}`);
    const results = await response.json();
    return results;
  } catch (error) {
    throw error;
  }
});

export const stickerSlice = createSlice({
  name: "sticker",
  initialState,
  reducers: {
    handleDraggingState: (state) => {
      state.isDragging = true;
    },

    handleReplaceIcon: (state) => {
      state.replacedSelectedObject = !state.replacedSelectedObject;
    },

    handleReplaceIconFalseState: (state) => {
      state.replacedSelectedObject = false;
    },

    handleFlipObject: (state, action) => {
      const { flipType } = action.payload;

      if (flipType === "horizontal") {
        state.isFlip.type = flipType;
        state.isFlip.HorizontalFlip = !state.isFlip.HorizontalFlip;
      } else {
        state.isFlip.type = flipType;
        state.isFlip.VerticalFlip = !state.isFlip.VerticalFlip;
      }
    },

    handleOpacityOfObject: (state, action) => {
      state.opacityValue = action.payload;
    },

    handleDuplicateObject: (state, action) => {
      state.droppedItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadStickers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadStickers.fulfilled, (state, action) => {
        state.loading = false;
        state.stickers = action.payload;
      })
      .addCase(loadStickers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  addDroppedSticker,
  updateDroppedStickers,
  handleMouseDownOnObject,
  handleMouseMove,
  handleMouseUpOnObject,
  handleRotateMouseDown,
  handleSelectObject,
  deleteSticker,
  handleDeselectObject,
  handleFlipObject,
  handleOpacityOfObject,
  handleReplaceIcon,
  handleReplaceIconFalseState,
  handleDuplicateObject,
} = stickerSlice.actions;

export default stickerSlice.reducer;
