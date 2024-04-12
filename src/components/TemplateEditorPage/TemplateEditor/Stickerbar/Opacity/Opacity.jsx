import React, { useEffect, useRef, useState } from "react";
import OpacityIcon from "@mui/icons-material/Opacity";
import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleOpacityOfObject } from "../../../../../redux/slices/StickerSlice";
import { handleTextProperties } from "../../../../../redux/slices/CommonSlice";

const Opacity = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const opacityValue = useSelector((state) => state.sticker.opacityValue);
  const selectedObject = useSelector((state) => state.common.selectedObject);

  const opacityRef = useRef();

  const handleOpacityChange = (e) => {
    const newOpacity = parseFloat(e.target.value);
    dispatch(handleOpacityOfObject(newOpacity));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (opacityRef.current) {
        if (!opacityRef.current.contains(event.target)) {
          const targetClassList = event.target.classList;
          if (targetClassList.contains("parentPanel")) {
            setIsVisible(false);
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  useEffect(() => {
    if (selectedObject) {
      dispatch(
        handleTextProperties({
          type: "stickerOpacity",
          stickerOpacity: opacityValue,
        })
      );
    }
  }, [opacityValue]);

  return (
    <div
      className="bg-white rounded-lg p-0.5 relative"
      onClick={() => setIsVisible(!isVisible)}
    >
      <Tooltip title="Opacity" placement="top" arrow>
        <div>
          <OpacityIcon />
        </div>
      </Tooltip>
      {isVisible ? (
        <div className="absolute z-10 bg-white py-1 px-4" ref={opacityRef}>
          <span>Opacity</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={opacityValue}
            onChange={handleOpacityChange}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Opacity;
