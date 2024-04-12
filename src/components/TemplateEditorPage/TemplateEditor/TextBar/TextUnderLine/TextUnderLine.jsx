import React, { useEffect } from "react";
import { TextAUnderline } from "@phosphor-icons/react";
import { useSelector, useDispatch } from "react-redux";
import { handleTextProperties } from "../../../../../redux/slices/CommonSlice";
const TextUnderline = () => {
  const dispatch = useDispatch();
  const selectedObject = useSelector((state) => state.common.selectedObject);
  const underLine = useSelector((state) => state.text.underLine);
console.log(underLine)
  useEffect(() => {
    if (selectedObject) {
      dispatch(
        handleTextProperties({
          type: "textUnder",
          textUnderLine: underLine,
        })
      );
    }
  }, [underLine]);
  return (
    <>
      <TextAUnderline size={24} />
    </>
  );
};

export default TextUnderline;
