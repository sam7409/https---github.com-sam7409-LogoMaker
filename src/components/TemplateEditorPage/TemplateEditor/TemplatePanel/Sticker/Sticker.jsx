import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeselectObject,
  handleMouseDownOnObject,
  handleSelectObject,
} from "../../../../../redux/slices/CommonSlice";
import StickerFrame from "./StickerFrame";
import { handleReplaceIconFalseState } from "../../../../../redux/slices/StickerSlice";

const Sticker = ({ obj, objectRef }) => {
  const dispatch = useDispatch();

  const selectedObject = useSelector((state) => state.common.selectedObject);
  const isFlip = useSelector((state) => state.sticker.isFlip);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectedObject &&
        objectRef.current &&
        objectRef.current[selectedObject.id]
      ) {
        const selectedObjectRef = objectRef.current[selectedObject.id];
        if (!selectedObjectRef.contains(event.target)) {
          if (event.target.classList.contains("templatePanel")) {
            dispatch(handleDeselectObject());
            dispatch(handleReplaceIconFalseState())
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedObject]);

  const addRef = (key, ref) => {
    if (objectRef.current) {
      objectRef.current[key] = ref;
    }
  };
  const handleMouseDownActon = (e, obj) => {
    e.preventDefault();
    dispatch(
      handleMouseDownOnObject({
        eventX: e.clientX,
        eventY: e.clientY,
        object: obj,
      })
    );
  };
  return (
    <div
      onClick={() => dispatch(handleSelectObject(obj))}
      onMouseDown={(e) => handleMouseDownActon(e, obj)}
      key={obj.id}
      ref={(ref) => addRef(obj?.id, ref)}
      style={{
        position: "absolute",
        left: `${obj.x}px`,
        top: `${obj.y}px`,
        width: `${obj.width}px`,
        height: `${obj.height}px`,
        transform: `rotate(${obj.rotationAngle}deg)`,
      }}
      className={`${
        selectedObject && selectedObject.id === obj.id ? "z-10" : null
      }`}
    >
      <div
        className={`relative ${
          selectedObject && selectedObject.id === obj.id
            ? "border-2 border-dashed cursor-move "
            : null
        }`}
        style={{
          width: `${obj.width}px`,
          height: `${obj.height}px`,
        }}
      >
        <img
          src={`${obj.ThumbPath}`}
          alt="loading..."
          className="w-full h-full"
          draggable="false"
          style={{
            transform: `${
              obj.flip.type === isFlip.type
                ? obj.flip.HorizontalState
                  ? "scaleX(-1)"
                  : obj.flip.VerticalState
                  ? "scaleY(-1)"
                  : "none"
                : "none"
            }`,
            opacity: obj.opacity,
          }}
        />
        {selectedObject && selectedObject.id === obj.id && (
          <StickerFrame obj={obj} objectRef={objectRef} />
        )}
      </div>
    </div>
  );
};

export default Sticker;