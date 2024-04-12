import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeselectObject,
  handleMouseDownOnObject,
  handleSelectObject,
  handleTextProperties,
} from "../../../../../redux/slices/CommonSlice";
import {
  handleTextEditDisable,
  handleTextEditEnable,
} from "../../../../../redux/slices/TextSlice";

const TextEdit = ({ obj, textRef }) => {
  const [value, setValue] = useState(obj.text);

  const dispatch = useDispatch();
  const isTextEdit = useSelector((state) => state.text.textEdit);

  const selectedObject = useSelector((state) => state.common.selectedObject);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectedObject && textRef.current && textRef.current[selectedObject.id]) {
        const selectedObjectRef = textRef.current[selectedObject.id];
        if (!selectedObjectRef.contains(event.target)) {
          if (event.target.classList.contains("templatePanel")) {
            if (selectedObjectRef.value !== "") { 
              dispatch(
                handleTextProperties({
                  type: "text",
                  textData: selectedObjectRef.value, 
                })
              );
            }
            dispatch(handleTextEditDisable());
            dispatch(handleDeselectObject());
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedObject]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };



  useEffect(() => {
    if (isTextEdit && textRef.current) {
      textRef.current[selectedObject?.id].focus();
    }
  }, [isTextEdit, selectedObject]);

  return (
    <>
      <input
        type="text"
        ref={(el) => textRef.current[obj.id] = el}
        onChange={handleChange}
        value={value}
        readOnly={!isTextEdit}
        style={{
          color: `${obj.textColor}`,
          backgroundColor: `${obj.textBgColor}`,
          textAlign: `${obj.textAlign}`,
          fontFamily: `${obj.fontFamily}`,
          fontSize: `${obj.fontSize}px`,
          fontWeight: `${obj.bold ? "bold" : "normal"}`,
          fontStyle: `${obj.italic ? "italic" : "normal"}`,
          textTransform: `${obj.textCase}`,
        }}
        className="w-full h-full cursor-move  focus:outline-none"
      />
    </>
  );
};

export default TextEdit;
