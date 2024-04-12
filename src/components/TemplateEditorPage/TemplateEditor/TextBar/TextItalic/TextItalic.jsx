import React, { useEffect } from "react";
import { TextItalic } from "@phosphor-icons/react";
import { useSelector, useDispatch } from "react-redux";
import { handleTextProperties } from "../../../../../redux/slices/CommonSlice";
const TextItalicFont = () => {
  const dispatch = useDispatch();
  const selectedObject = useSelector((state) => state.common.selectedObject);
  const italic = useSelector((state) => state.text.italic);

  useEffect(() => {
    if (selectedObject) {
      dispatch(handleTextProperties({ type: "textIt", textItalic: italic }));
    }
  }, [italic, dispatch, selectedObject]);
  return (
    <>
      <TextItalic size={24} />
    </>
  );
};

export default TextItalicFont;
