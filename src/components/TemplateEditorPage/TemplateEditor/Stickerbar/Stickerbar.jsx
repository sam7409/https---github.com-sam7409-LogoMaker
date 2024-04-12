import PhotoIcon from "@mui/icons-material/Photo";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import FlipObject from "./Flip/FlipObject";
import Opacity from "./Opacity/Opacity";
import Duplicate from "./Duplicate/Duplicate";
import Position from "./Position/Position";
import { deleteDroppedObject } from "../../../../redux/slices/CommonSlice";
import { handleReplaceIcon } from "../../../../redux/slices/StickerSlice";

const Stickerbar = () => {
  const dispatch = useDispatch();
  const selectedObject = useSelector((state) => state.common.selectedObject);
  const stickerItems = useSelector((state) => state.common.stickerItems);
  const replacedSelectedObject = useSelector(
    (state) => state.sticker.replacedSelectedObject
  );
  return (
    <div
      className={`${
        selectedObject && selectedObject.type === "s" && stickerItems.length!==0 ? "block" : "hidden"
      } flex justify-center items-center gap-x-4  h-[40px] rounded-full px-4 bg-white`}
    >
      <Tooltip title="Replace icon" placement="top" arrow>
        <div
          className={`cursor-pointer flex items-center ${
            replacedSelectedObject ? "text-blue-800" : ""
          }`}
          onClick={() => dispatch(handleReplaceIcon())}
        >
          <PhotoIcon />
          Replace icon
        </div>
      </Tooltip>

      <Tooltip
        // title={`${stickerColor !== "" ? stickerColor : "#000000"}`}
        title="#000000"
        placement="top"
        arrow
      >
        <div
          className={`w-6 h-6 rounded-full cursor-pointer`}
          style={{
            backgroundColor: "#000000",
          }}
        ></div>
      </Tooltip>

      <Tooltip title="Flip" placement="top" arrow>
        <div className="cursor-pointer">
          <FlipObject />
        </div>
      </Tooltip>

      <Tooltip title="Opacity" placement="top" arrow>
        <div className="cursor-pointer">
          <Opacity />
        </div>
      </Tooltip>

      <Tooltip title="Position" placement="top" arrow>
        <div className="cursor-pointer">
          <Position />
        </div>
      </Tooltip>

      <Tooltip title="Duplicate" placement="top" arrow>
        <div className="cursor-pointer">
          <Duplicate />
        </div>
      </Tooltip>

      <Tooltip title="Delete" placement="top" arrow>
        <div
          className="cursor-pointer"
          onClick={() => dispatch(deleteDroppedObject({type:"s"}))}
        >
          <DeleteIcon />
        </div>
      </Tooltip>
    </div>
  );
};

export default Stickerbar;
