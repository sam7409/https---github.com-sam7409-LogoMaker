import React, { useEffect } from "react";
import TitleIcon from "@mui/icons-material/Title";
import { useDispatch, useSelector } from "react-redux";
import {
  addTextItem,
  handleTextProperties,
} from "../../../../redux/slices/CommonSlice";
import { v4 as uuidv4 } from "uuid";
import { textFontStyles } from "../../../../data/textFontStyles";
import { handleTextFontFamily } from "../../../../redux/slices/TextSlice";
const TextComponent = () => {
  const uniqueId = uuidv4();
  const text = useSelector((state) => state.drawer.text);
  const dispatch = useDispatch();
  const droppedItems = useSelector((state) => state.common.droppedItems);
  const selectedObject = useSelector((state) => state.common.selectedObject);
  const fontFamily = useSelector((state) => state.text.fontFamily);

  
  const handleTextAdd = () => {
    const textObject = {
      type: "t",
      id: uniqueId.toString(),
      text: "Hello World",
      x: 30,
      y: 30,
      fontSize: 28,
      fontFamily: "Arial",
      bold: false,
      italic: false,
      underLine: false,
      textColor: "#ffffff",
      textBgColor: "#000000",
      textAlign: "start",
      textCase: "capitalize",
      width: 250,
      height: 40,
      opacity: 1,
      rotationAngle: 0,
    };

    const updatedItems = [...droppedItems, textObject];

    dispatch(addTextItem({object:updatedItems}));
  };

  useEffect(() => {
    if (selectedObject) {
      dispatch(
        handleTextProperties({
          type: "textFF",
          textFontFamily: fontFamily,
        })
      );
    }
  }, [fontFamily]);

  return (
    <div
      className={`${
        text ? "block" : "hidden"
      } w-1/4 h-screen p-2 flex flex-col gap-y-5`}
    >
      <div className="relative mb-5">
        <div
          onClick={handleTextAdd}
          className="bg-blue-800 text-white cursor-pointer absolute z-20 w-full py-2  flex justify-center items-center gap-x-1"
        >
          <TitleIcon /> Add Text
        </div>
      </div>

      <ul className="flex-1 overflow-auto">
        {textFontStyles.map((text) => (
          <li
          key={text.id}
            onClick={() => dispatch(handleTextFontFamily(text.fontFamily))}
            className="cursor-pointer text-center py-1.5 hover:bg-gray-100 "
          >
            <span
              style={{ fontFamily: `${text.fontFamily}`, fontSize: "30px" }}
            >
              {text.fontFamily}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TextComponent;
