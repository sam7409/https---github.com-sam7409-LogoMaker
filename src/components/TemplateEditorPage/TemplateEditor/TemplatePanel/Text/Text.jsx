import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextFrame from "./TextFrame";
import TextEdit from "../../TextBar/TextEdit/TextEdit";
import {
  handleDeselectObject,
  handleMouseDownOnObject,
  handleSelectObject,
} from "../../../../../redux/slices/CommonSlice";
import {
  handleTextEditEnable,
  updatedTextSize,
} from "../../../../../redux/slices/TextSlice";

const Text = ({ obj, objectRef }) => {
  const dispatch = useDispatch();
  const selectedObject = useSelector((state) => state.common.selectedObject);

  useEffect(() => {
    dispatch(updatedTextSize(obj.fontSize));
  }, [obj.fontSize]);

  const addRef = (key, ref) => {
    if (objectRef.current) {
      objectRef.current[key] = ref;
    }
  };

  const handleDoubleClick = (e) => {
    dispatch(handleTextEditEnable());
    e.stopPropagation();
    e.preventDefault();
  };

  const handleMouseDownActon = (e, obj) => {
    dispatch(handleSelectObject(obj));
    dispatch(
      handleMouseDownOnObject({
        eventX: e.clientX,
        eventY: e.clientY,
        object: obj,
      })
    );e.stopPropagation();
    e.preventDefault();
    
  };

  const handleSelectObjectAction = (e, obj) => {
    dispatch(handleSelectObject(obj));

    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <>
      <div
        onClick={(e) => handleSelectObjectAction(e, obj)}
        onMouseDown={(e) => handleMouseDownActon(e, obj)}
        onDoubleClick={(e) => handleDoubleClick(e, obj)}
        ref={(ref) => addRef(obj?.id, ref)}
        className={` hover:cursor-move  ${
          selectedObject && selectedObject.id === obj.id
            ? "border-2 border-dashed border-black "
            : null
        }`}
        style={{
          position: "absolute",
          left: `${obj.x}px`,
          top: `${obj.y}px`,
          width: `${obj.width}px`,
          height: `${obj.height}px`,
          transform: `rotate(${obj.rotationAngle}deg)`,
          opacity: `${obj.opacity}`,
        }}
      >
        <TextEdit obj={obj} textRef={objectRef} />

        {selectedObject && selectedObject.id === obj.id && (
          <TextFrame obj={obj} textRef={objectRef} />
        )}
      </div>
    </>
  );
};

export default Text;
