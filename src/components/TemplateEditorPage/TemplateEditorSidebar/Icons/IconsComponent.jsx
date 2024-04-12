import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadStickers,
} from "../../../../redux/slices/StickerSlice";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import SearchComponent from "../../../utils/SearchComponent";
import { handleSetReplaceIcon } from "../../../../redux/slices/CommonSlice";

const IconsComponent = () => {
  const dispatch = useDispatch();
  const icons = useSelector((state) => state.drawer.icons);
  const stickers = useSelector((state) => state.sticker.stickers);
  const replacedSelectedObject = useSelector((state) => state.sticker.replacedSelectedObject);

  const loading = useSelector((state) => state.sticker.loading);
  const error = useSelector((state) => state.sticker.error);

  const handleDragStart = (e, obj) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(obj));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(loadStickers());
  }, [dispatch]);

  if (error)
    return (
      <Alert severity="error" className="fixed top-0 w-full">
        {error}
      </Alert>
    );
  return (
    <div
      className={`w-1/4 min-h-screen p-2 flex flex-col gap-y-3 ${
        icons ? "block" : "hidden"
      }`}
    >
      <SearchComponent />
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <CircularProgress />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3 overflow-auto h-screen tab-sidebar">
          {stickers && stickers.length !== 0
            ? stickers.Images.map((sticker, index) => (
                <div
                  key={index}
                  onClick={() => dispatch(handleSetReplaceIcon({replacedValue:replacedSelectedObject,stickerData:sticker}))}
                  className="cursor-pointer"
                  style={{
                    width: "80px",
                    height: "80px",
                  }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, sticker)}
                  onDragOver={handleDragOver}
                >
                  <img
                    src={`${sticker.ImagePath}`}
                    className="w-full h-full"
                    alt=""
                  />
                </div>
              ))
            : "data not found"}
        </div>
      )}
    </div>
  );
};

export default IconsComponent;
