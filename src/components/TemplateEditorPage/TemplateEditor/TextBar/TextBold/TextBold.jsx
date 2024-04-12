import React, { useEffect } from "react";
import { TextB } from "@phosphor-icons/react";
import { useSelector, useDispatch } from "react-redux";
import { handleTextProperties } from "../../../../../redux/slices/CommonSlice";
const TextBold = () => {
  const dispatch = useDispatch();
  const selectedObject = useSelector((state) => state.common.selectedObject);
  const bold = useSelector((state) => state.text.bold);

  useEffect(() => {
    if (selectedObject) {
      dispatch(handleTextProperties({ type: "textBold", textBold: bold }));
    }
  }, [bold,dispatch]);
  return (
    <>
      <TextB size={24} />
    </>
  );
};

export default TextBold;
