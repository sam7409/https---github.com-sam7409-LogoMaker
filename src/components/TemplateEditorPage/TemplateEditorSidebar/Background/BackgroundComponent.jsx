import React, { useEffect, useRef, useState } from "react";
import { background, backgroundColors } from "../../../../data/backgrounds";
import { useDispatch, useSelector } from "react-redux";

import ImageIcon from "@mui/icons-material/Image";
import {
  handleTemplateBackground,
  resetTemplateBackground,
} from "../../../../redux/slices/TemplateSlice";

const BackgroundComponent = () => {
  const backgrounds = useSelector((state) => state.drawer.backgrounds);
  const imageRef = useRef(null);
  const dispatch = useDispatch();
  const [fileData, setFileData] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFileData(reader.result);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleBackgroundColor = (color) => {
    dispatch(handleTemplateBackground({ type: "color", color: color }));
  };

  useEffect(() => {
    if (fileData != null) {
      dispatch(handleTemplateBackground({ type: "file", file: fileData }));
    }
  }, [fileData, dispatch]);
  return (
    <div
      className={`${
        backgrounds ? "block" : "hidden"
      } w-1/4 min-h-screen p-2 flex flex-col gap-y-5`}
    >
      <div className="relative mb-5">
        <div
          onClick={() => imageRef.current.click()}
          className="bg-gray-200 cursor-pointer absolute z-20 w-full py-1  flex justify-center items-center gap-x-1"
        >
          <ImageIcon /> Choose Image
        </div>
        <input
          type="file"
          ref={imageRef}
          onChange={handleFileChange}
          className="absolute top-0 "
        />
      </div>

      <div className="flex flex-col gap-y-2">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 font-semibold text-xs">default colors</p>
          <p
            onClick={() => dispatch(resetTemplateBackground())}
            className="text-gray-500 font-semibold text-xs cursor-pointer"
          >
            Reset
          </p>
        </div>
        <div className="grid grid-cols-8 gap-3">
          {background[0].backgroundColors.map((bgColor) => (
            <div
              key={bgColor.id}
              style={{ backgroundColor: `${bgColor.color}` }}
              onClick={() => handleBackgroundColor(bgColor.color)}
              className="w-10 h-10 cursor-pointer rounded-full border border-1 "
            ></div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <p className="text-gray-500 font-semibold text-xs">Gradient colors</p>
        <div className="grid grid-cols-8 gap-3">
          {background[1].GradientColors.map((bgColor) => (
            <div
              key={bgColor.id}
              style={{ backgroundColor: `${bgColor.color}` }}
              onClick={() => handleBackgroundColor(bgColor.color)}
              className="w-10 h-10 cursor-pointer rounded-full border border-1"
            ></div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <p className="text-gray-500 font-semibold text-xs">Backgrounds</p>
        <div className="grid grid-cols-5 gap-3">
          {background[2].backgroundImages.map((bgImage) => (
            <img
              key={bgImage.id}
              className="w-full h-full"
              src={`${bgImage.url}`}
              onClick={() =>
                dispatch(
                  handleTemplateBackground({ type: "file", file: bgImage.url })
                )
              }
              alt=""
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundComponent;
