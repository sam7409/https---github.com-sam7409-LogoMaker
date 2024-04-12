import { Tooltip } from "@mui/material";
import {
  TextAlignCenter,
  TextAlignLeft,
  TextAlignRight,
} from "@phosphor-icons/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { handleTextProperties } from "../../../../../redux/slices/CommonSlice";

const TextAlignment = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const alignmentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (alignmentRef.current) {
        if (!alignmentRef.current.contains(event.target)) {
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

  const handleTextAlign = (textAlign) => {
    dispatch(
      handleTextProperties({ type: "txtAlign", textAlign: textAlign })
    );
  };

  return (
    <div
      className="bg-white rounded-lg p-0.5 relative"
      onClick={() => setIsVisible(!isVisible)}
    >
      <Tooltip title="Alignment" placement="top" arrow>
        <div>
          <TextAlignCenter size={24} />
        </div>
      </Tooltip>
      {isVisible ? (
        <div
          className="absolute z-10 top-9 bg-white py-1 px-4 flex items-center gap-x-3"
          ref={alignmentRef}
        >
          <Tooltip title="Left" placement="bottom" arrow>
            <div onClick={() => handleTextAlign("start")}>
              <TextAlignLeft size={24} />
            </div>
          </Tooltip>
          <Tooltip title="Center" placement="bottom" arrow>
            <div onClick={() => handleTextAlign("center")}>
              <TextAlignCenter size={24} />
            </div>
          </Tooltip>
          <Tooltip title="Right" placement="bottom" arrow>
            <div onClick={() => handleTextAlign("end")}>
              <TextAlignRight size={24} />
            </div>
          </Tooltip>
        </div>
      ) : null}
    </div>
  );
};

export default TextAlignment;
