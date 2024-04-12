import React from "react";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import TextureIcon from "@mui/icons-material/Texture";
import { useDispatch } from "react-redux";
import {
  handleBackgroundDrawer,
  handleIconDrawer,
  handleTextDrawer,
} from "../../../redux/slices/DrawerStateSlice";
import { TextT } from "@phosphor-icons/react";

const TemplateEditorSidebar = () => {
  const dispatch = useDispatch();
  return (
    <ul className="w-fit flex flex-col items-center gap-y-3  min-h-screen border border-r-1 border-r-gray-300 cursor-pointer">
      <li
        onClick={() => dispatch(handleIconDrawer())}
        className="flex flex-col w-full p-2 justify-center items-center  hover:text-blue-700"
        //   onClick={handleIcons}
        //   style={{
        //     backgroundColor: `${openIcons ? "#eaeaea" : "white"}`,
        //     color: `${openIcons ? "#2d4fe3" : "#000000"}`,
        //   }}
      >
        <span
          className="bg-gray-200 p-1 rounded-md"
          // style={{ backgroundColor: `${openIcons ? "#ffffff" : "#eaeaea"}` }}
        >
          <AddReactionIcon />
        </span>

        <span className="text-xs font-semibold">Icons</span>
      </li>
      <li
        className="flex flex-col w-full p-2 justify-center items-center  hover:text-blue-700"
        onClick={() => dispatch(handleTextDrawer())}
        //   style={{
        //     backgroundColor: `${openBackground ? "#eaeaea" : "white"}`,
        //     color: `${openBackground ? "#2d4fe3" : "#000000"}`,
        //   }}
      >
        <span
          className="bg-gray-200 p-1 rounded-md"

          // style={{
          //   backgroundColor: `${openBackground ? "#ffffff" : "#eaeaea"}`,
          // }}
        >
          <TextT size={32} />
        </span>
        <span className="text-xs font-semibold">Text</span>
      </li>
      <li
        className="flex flex-col w-full p-2 justify-center items-center  hover:text-blue-700"
        onClick={() => dispatch(handleBackgroundDrawer())}
        //   style={{
        //     backgroundColor: `${openBackground ? "#eaeaea" : "white"}`,
        //     color: `${openBackground ? "#2d4fe3" : "#000000"}`,
        //   }}
      >
        <span
          className="bg-gray-200 p-1 rounded-md"
          // style={{
          //   backgroundColor: `${openBackground ? "#ffffff" : "#eaeaea"}`,
          // }}
        >
          <TextureIcon />
        </span>
        <span className="text-xs font-semibold">Background</span>
      </li>
    </ul>
  );
};

export default TemplateEditorSidebar;
