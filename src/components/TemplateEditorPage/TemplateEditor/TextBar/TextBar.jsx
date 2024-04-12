import React from "react";
import { Tooltip } from "@mui/material";
import TextAlignment from "./TextAlignment/TextAlignment";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteDroppedObject } from "../../../../redux/slices/CommonSlice";
import {
  handleTextBackgroundColorsDrawer,
  handleTextColorsDrawer,
} from "../../../../redux/slices/DrawerStateSlice";
import TextSize from "./TextSize/TextSize";
import TextOpacity from "./TextOpacity/TextOpacity";
import {
  handleTextBold,
  handleTextItalic,
} from "../../../../redux/slices/TextSlice";
import TextBold from "./TextBold/TextBold";
import TextItalicFont from "./TextItalic/TextItalic";
import TextDuplicate from "./TextDuplicate/TextDuplicate";
import TextCase from "./TextCase/TextCase";
import Position from "../Stickerbar/Position/Position";

const TextBar = () => {
  const dispatch = useDispatch();
  const selectedObject = useSelector((state) => state.common.selectedObject);
  const textItems = useSelector((state) => state.common.textItems);
  const textColor = useSelector((state) => state.text.textColor);
  const background = useSelector((state) => state.text.backgroundColor);

  return (
    <div
      className={`${
        selectedObject && selectedObject.type === "t" && textItems.length !== 0
          ? "block"
          : "hidden"
      } flex justify-center items-center gap-x-4 h-[40px] rounded-full px-4 bg-white`}
    >
      <TextSize />

      <Tooltip title="Color" placement="top" arrow>
        <div
          onClick={() => dispatch(handleTextColorsDrawer())}
          className={`w-5 h-5 rounded-full cursor-pointer`}
          style={{
            backgroundColor: `${textColor !== "" ? textColor : "#000000"}`,
          }}
        ></div>
      </Tooltip>

      <Tooltip title="Background" placement="top" arrow>
        <div
          onClick={() => dispatch(handleTextBackgroundColorsDrawer())}
          className={`w-5 h-5 rounded-full cursor-pointer`}
          style={{
            backgroundColor: `${background !== "" ? background : "#0000FF"}`,
          }}
        ></div>
      </Tooltip>
      <div className="cursor-pointer">
        <TextAlignment />
      </div>

      <Tooltip title="Opacity" placement="top" arrow>
        <div className="cursor-pointer">
          <TextOpacity />
        </div>
      </Tooltip>

      <div className="cursor-pointer">
        <TextCase />
      </div>

      <Tooltip title="Bold" placement="top" arrow>
        <div
          className="cursor-pointer"
          onClick={() => dispatch(handleTextBold())}
        >
          <TextBold />
        </div>
      </Tooltip>

      <Tooltip title="Italic" placement="top" arrow>
        <div
          className="cursor-pointer"
          onClick={() => dispatch(handleTextItalic())}
        >
          <TextItalicFont />
        </div>
      </Tooltip>

      <Tooltip title="Position" placement="top" arrow>
        <div className="cursor-pointer">
          <Position />
        </div>
      </Tooltip>

      <Tooltip title="Duplicate" placement="top" arrow>
        <div className="cursor-pointer">
          <TextDuplicate />
        </div>
      </Tooltip>

      <Tooltip title="Delete" placement="top" arrow>
        <div
          className="cursor-pointer"
          onClick={() => dispatch(deleteDroppedObject({ type: "t" }))}
        >
          <DeleteIcon />
        </div>
      </Tooltip>
    </div>
  );
};

export default TextBar;
