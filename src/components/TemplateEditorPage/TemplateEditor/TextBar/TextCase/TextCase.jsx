import { Tooltip } from "@mui/material";
import {
  TextAa
} from "@phosphor-icons/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { handleTextProperties } from "../../../../../redux/slices/CommonSlice";

const TextCase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const textCaseRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (textCaseRef.current) {
        if (!textCaseRef.current.contains(event.target)) {
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

  const handleTextCase = (textCase) => {
    dispatch(
      handleTextProperties({ type: "txtCase", textCase: textCase})
    );
  };

  return (
    <div
      className="bg-white rounded-lg p-0.5 relative"
      onClick={() => setIsVisible(!isVisible)}
    >
      <Tooltip title="TextCase" placement="top" arrow>
        <div>
        <TextAa size={24} />
        </div>
      </Tooltip>
      {isVisible ? (
        <div
          className="absolute z-10 top-9 bg-white py-1 px-4 flex items-center gap-x-3"
          ref={textCaseRef}
        >
          <Tooltip title="Uppercase" placement="bottom" arrow>
            <div onClick={() => handleTextCase("uppercase")}>
              Upper
            </div>
          </Tooltip>
          <Tooltip title="LowerCase" placement="bottom" arrow>
            <div onClick={() => handleTextCase("lowercase")}>
              Lower
            </div>
          </Tooltip>
          <Tooltip title="Reset" placement="bottom" arrow>
            <div onClick={() => handleTextCase("capitalize")}>
             Reset
            </div>
          </Tooltip>
        </div>
      ) : null}
    </div>
  );
};

export default TextCase;
