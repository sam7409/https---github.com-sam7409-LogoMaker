import React from "react";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { handleDuplicateObject } from "../../../../../redux/slices/CommonSlice";
const TextDuplicate = () => {
  const uniqueId = uuidv4();
  const dispatch = useDispatch();

  const selectedObject = useSelector((state) => state.common.selectedObject);
  const droppedItems = useSelector((state) => state.common.droppedItems);

  const handleDuplicateAction = () => {
    const duplicatedObject = {
      ...selectedObject,
      id: uniqueId,
      text: selectedObject.text,
      fontSize: selectedObject.fontSize,
      bold: selectedObject.bold,
      italic: selectedObject.italic,
      underLine: selectedObject.underline,
      textColor: selectedObject.textColor,
      width: selectedObject.width,
      height: selectedObject.height,
      opacity: 1,
      rotationAngle: 0,
      x: 50,
      y: 50,
      flip: false,
    };

    const updatedItems = [...droppedItems, duplicatedObject];

    dispatch(handleDuplicateObject(updatedItems));
  };

  return (
    <div onClick={handleDuplicateAction}>
      <LibraryAddIcon />
    </div>
  );
};

export default TextDuplicate;
