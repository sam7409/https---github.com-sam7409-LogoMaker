import React from "react";
import CachedIcon from "@mui/icons-material/Cached";
import { useDispatch, useSelector } from "react-redux";
import {
  handleMouseDownResize,
  handleRotationOnMouseDown,
} from "../../../../../redux/slices/CommonSlice";

const StickerFrame = ({ objectRef, obj }) => {
  const dispatch = useDispatch();
  const selectedObject = useSelector((state) => state.common.selectedObject);

  const handleMouseDownRotateAction = (e, obj, objectRef) => {
    e.stopPropagation();
    e.preventDefault();
    if (selectedObject && objectRef.current!= null) {
      const rect = objectRef.current[selectedObject.id].getBoundingClientRect();
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

  // methods of resizing Icons on centers

  const handleMouseDownLeftCenterResize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      handleMouseDownResize({
        eventX: e.clientX,
        eventY: e.clientY,
        resizeCorner: "LC",
      })
    );
  };

  const handleMouseDownTopCenterResize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      handleMouseDownResize({
        eventX: e.clientX,
        eventY: e.clientY,
        resizeCorner: "TC",
      })
    );
  };

  const handleMouseDownRightCenterResize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      handleMouseDownResize({
        eventX: e.clientX,
        eventY: e.clientY,
        resizeCorner: "RC",
      })
    );
  };

  const handleMouseDownBottomCenterResize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      handleMouseDownResize({
        eventX: e.clientX,
        eventY: e.clientY,
        resizeCorner: "BC",
      })
    );
  };

  // methods of resizing Icons on corners

  const handleMouseDownTopLeftResize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      handleMouseDownResize({
        eventX: e.clientX,
        eventY: e.clientY,
        resizeCorner: "TL",
      })
    );
  };

  const handleMouseDownTopRightResize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      handleMouseDownResize({
        eventX: e.clientX,
        eventY: e.clientY,
        resizeCorner: "TR",
      })
    );
  };

  const handleMouseDownBottomRightResize = (e) => {
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

  const handleMouseDownBottomLeftResize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      handleMouseDownResize({
        eventX: e.clientX,
        eventY: e.clientY,
        resizeCorner: "BL",
      })
    );
  };

  return (
    <>
      <div
        onMouseDown={handleMouseDownTopLeftResize}
        draggable="false"
        className={` w-2.5 h-2.5  bg-black absolute  -top-1.5 -left-1.5 hover:cursor-nw-resize`}
      />

      <div
        onMouseDown={handleMouseDownTopRightResize}
        draggable="false"
        className={` w-2.5 h-2.5  bg-black absolute  -top-1.5 -right-1.5 hover:cursor-ne-resize`}
      />
      <div
        onMouseDown={handleMouseDownBottomRightResize}
        draggable="false"
        className={` w-2.5 h-2.5  bg-black absolute  -bottom-1.5 -right-1.5 cursor-nw-resize`}
      />
      <div
        onMouseDown={handleMouseDownBottomLeftResize}
        draggable="false"
        className={` w-2.5 h-2.5  bg-black absolute   -left-1.5 -bottom-1.5 hover:cursor-ne-resize`}
      />

      {/* left center resize icon */}
      <div
        onMouseDown={handleMouseDownLeftCenterResize}
        draggable="false"
        className={` w-2.5 h-2.5  bg-black absolute -translate-y-1/2 -left-1.5 top-1/2 hover:cursor-ew-resize`}
      />
      {/* top center resize icon */}
      <div
        onMouseDown={handleMouseDownTopCenterResize}
        draggable="false"
        className={` w-2.5 h-2.5  bg-black absolute -translate-x-1/2 left-1/2 -top-1.5 hover:cursor-ns-resize`}
      />
      {/* right center resize icon */}
      <div
        onMouseDown={handleMouseDownRightCenterResize}
        draggable="false"
        className={` w-2.5 h-2.5  bg-black absolute -translate-y-1/2 top-1/2 -right-1.5 hover:cursor-ew-resize`}
      />
      {/* bottom center resize icon */}
      <div
        onMouseDown={handleMouseDownBottomCenterResize}
        draggable="false"
        className={` w-2.5 h-2.5  bg-black absolute -translate-x-1/2 left-1/2 -bottom-1.5 hover:cursor-ns-resize`}
      />

      {/* rotating icon */}
      <CachedIcon
        onMouseDown={(e) => handleMouseDownRotateAction(e, obj, objectRef)}
        size={22}
        weight="fill"
        color="black"
        className={`absolute bg-white rounded-full p-0.5 -bottom-10 left-1/2 -translate-x-1/2 cursor-grab`}
      />
    </>
  );
};

export default StickerFrame;
