import React, { useEffect } from "react";
import {
  handleTextFontSizeDecreaseByOne,
  handleTextFontSizeIncreaseByOne,
} from "../../../../../redux/slices/TextSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { handleTextProperties } from "../../../../../redux/slices/CommonSlice";

const TextSize = () => {
  const dispatch = useDispatch();
  const selectedObject = useSelector((state) => state.common.selectedObject);
  const fontSize = useSelector((state) => state.text.fontSize);

  useEffect(() => {
    if (selectedObject) {
      dispatch(handleTextProperties({ type: "textSize", textSize: fontSize }));
    }
  }, [fontSize, dispatch, selectedObject]);

  return (
    <div className="flex items-center gap-x-2">
      <RemoveIcon
        className="cursor-pointer"
        onClick={() => dispatch(handleTextFontSizeDecreaseByOne())}
      />

      <span className="cursor-default">{Math.floor(fontSize)}</span>
      <AddIcon
        className="cursor-pointer"
        onClick={() => dispatch(handleTextFontSizeIncreaseByOne())}
      />
    </div>
  );
};

export default TextSize;
