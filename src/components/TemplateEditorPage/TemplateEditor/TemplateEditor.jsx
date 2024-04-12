import React, { useRef } from "react";
import Stickerbar from "./Stickerbar/Stickerbar";
import TemplatePanel from "./TemplatePanel/TemplatePanel";
import { useDispatch, useSelector } from "react-redux";
import {
  handleMouseMove,
  handleMouseUpOnObject,
} from "../../../redux/slices/CommonSlice";
import TextBar from "./TextBar/TextBar";

const TemplateEditor = ({ objectRef }) => {
  const dispatch = useDispatch();
  const droppedItems = useSelector((state) => state.common.droppedItems);

  return (
    <div className="bg-gray-300 flex-1 flex flex-col">
      <div
        className={
          "h-[60px] py-4 w-full flex justify-center items-center relative"
        }
      >
        {droppedItems.length !== 0 ? (
          <>
            <Stickerbar />
            <TextBar />
          </>
        ) : null}
      </div>
      <div
        className={`w-full min-h-screen flex justify-center items-start parentPanel`}
        onMouseMove={(e) =>
          dispatch(
            handleMouseMove({
              eventX: e.clientX,
              eventY: e.clientY,
            })
          )
        }
        onMouseUp={() => dispatch(handleMouseUpOnObject())}
      >
        <TemplatePanel objectRef={objectRef} />
      </div>
    </div>
  );
};

export default TemplateEditor;
