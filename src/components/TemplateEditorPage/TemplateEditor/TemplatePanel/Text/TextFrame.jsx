import React from "react";
import CachedIcon from "@mui/icons-material/Cached";
import { useDispatch, useSelector } from "react-redux";
import {
  handleMouseDownResize,
  handleRotationOnMouseDown,
} from "../../../../../redux/slices/CommonSlice";

const TextFrame = ({ obj, textRef }) => {
  const dispatch = useDispatch();
  const selectedObject = useSelector((state) => state.common.selectedObject);

  const handleMouseDownRotateAction = (e, obj, textRef) => {
    e.stopPropagation();
    e.preventDefault();
    if (selectedObject && textRef.current[selectedObject.id] != null) {
      const rect = textRef.current[selectedObject.id].getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      dispatch(
        handleRotationOnMouseDown({
          eventX: e.clientX,
          eventY: e.clientY,
          object: obj,
          centerX: centerX,
          centerY: centerY,
        })
      );
    }
  };

  const handleMouseDownResizeAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      handleMouseDownResize({
        eventX: e.clientX,
        eventY: e.clientY,
        resizeCorner: "BR",
      })
    );
  };
  return (
    <>
      <div
        onMouseDown={handleMouseDownResizeAction}
        draggable="false"
        className={` w-2.5 h-2.5  bg-white absolute rounded-full -bottom-1 -right-1 hover:cursor-nw-resize`}
      />
      <CachedIcon
        onMouseDown={(e) => handleMouseDownRotateAction(e, obj, textRef)}
        size={22}
        weight="fill"
        color="black"
        className={`absolute bg-white rounded-full p-0.5 -bottom-10 left-1/2 -translate-x-1/2 cursor-grab`}
      />
    </>
  );
};

export default TextFrame;
