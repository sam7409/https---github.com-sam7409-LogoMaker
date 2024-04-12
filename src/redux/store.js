import { configureStore } from "@reduxjs/toolkit";
import stickerReducer from "./slices/StickerSlice";
import commonReducer from "./slices/CommonSlice";
import drawerReducer from "./slices/DrawerStateSlice";
import textReducer from "./slices/TextSlice";
import templateReducer from "./slices/TemplateSlice";

export const store = configureStore({
  reducer: {
    sticker: stickerReducer,
    common: commonReducer,
    drawer: drawerReducer,
    text: textReducer,
    template: templateReducer,
  },
});
