import React from "react";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { handleDuplicateObject } from "../../../../../redux/slices/CommonSlice";
const Duplicate = () => {
  const uniqueId = uuidv4();
  const dispatch = useDispatch();

  const selectedObject = useSelector((state) => state.common.selectedObject);
  const droppedItems = useSelector((state) => state.common.droppedItems);

  const handleDuplicateAction = () => {
    const duplicatedObject = {
      ...selectedObject,
      x: 50,
      y: 50,
      width: 80,
      height: 80,
      flip: false,
      opacity: 1,
      rotationAngle: 0,
      id: uniqueId,
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

export default Duplicate;
