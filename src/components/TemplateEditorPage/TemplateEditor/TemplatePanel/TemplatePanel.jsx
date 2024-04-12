import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDroppedItem } from "../../../../redux/slices/CommonSlice";
import { getIndustryTemplateFromLocalStorage } from "../../../../redux/slices/TemplateSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { v4 as uuidv4 } from "uuid";
import Sticker from "./Sticker/Sticker";
import Text from "./Text/Text";

const TemplatePanel = ({ objectRef }) => {
  const uniqueId = uuidv4();
  const industryTemplateData = useSelector((state) => state.template.template);
  const droppedItems = useSelector((state) => state.common.droppedItems);
  const templateBackground = useSelector(
    (state) => state.template.templateBackground
  );
  const dispatch = useDispatch();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const droppedItem = JSON.parse(e.dataTransfer.getData("text/plain"));

    const { CategoryName, ThumbPath, IsFree, ...remaining } = droppedItem;

    const stickerItem = {
      id: uniqueId.toString(),
      type: "s",
      x: 30,
      y: 30,
      width: 80,
      height: 80,
      borderColor: "#000000",
      flip: {
        type: "horizontal",
        HorizontalState: false,
        VerticalState: false,
      },
      opacity: 1,
      rotationAngle: 0,
      CategoryName: CategoryName,
      ThumbPath: ThumbPath,
      IsFree: IsFree,
    };
    if (!droppedItems.includes(stickerItem)) {
      const updatedItems = [...droppedItems, stickerItem];
      dispatch(addDroppedItem({ object: updatedItems }));
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("templateData");
    if (storedData !== null) {
      try {
        const parsedData = JSON.parse(storedData);
        dispatch(getIndustryTemplateFromLocalStorage(parsedData));
      } catch (error) {
        console.error("Error parsing JSON from local storage:", error);
      }
    }
  }, [dispatch]);

  return (
    <>
      {industryTemplateData === null ? (
        <div
          className=" flex justify-center items-center"
          style={{
            width: `500px`,
            height: `500px`,
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            key={industryTemplateData.TEMPLATE_ID}
            style={{
              width: `${industryTemplateData.width}px`,
              height: `${industryTemplateData.height}px`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {templateBackground.type === "color" ? (
              <div
                className="absolute top-0"
                style={{
                  width: `${industryTemplateData.width}px`,
                  height: `${industryTemplateData.height}px`,
                  backgroundColor: `${templateBackground.color}`,
                }}
              ></div>
            ) : templateBackground.type === "file" ? (
              <img
                className="w-full h-full templatePanel"
                src={`${templateBackground.file}`}
                alt=""
              />
            ) : (
              <img
                className="w-full h-full templatePanel"
                src={`${industryTemplateData.THUMB_URI}`}
                alt=""
              />
            )}

            {droppedItems.map((obj) =>
              obj.type === "t" ? (
                <Text key={obj.id} obj={obj} objectRef={objectRef} />
              ) : (
                <Sticker key={obj.id} obj={obj} objectRef={objectRef} />
              )
            )}
          </div>
        </>
      )}
    </>
  );
};

export default TemplatePanel;
