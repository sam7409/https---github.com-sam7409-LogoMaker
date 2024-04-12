import React, { useEffect, useRef, useState } from "react";
import FlipIcon from "@mui/icons-material/Flip";
import { useDispatch, useSelector } from "react-redux";
import { handleFlipObject } from "../../../../../redux/slices/StickerSlice";
import { handleStickerFLipping } from "../../../../../redux/slices/CommonSlice";

const FlipObject = () => {
  const [flipToggleState, setFlipToggleState] = useState(false);

  const dispatch = useDispatch();
  const flipRef = useRef();
  const isHorizontalFlip = useSelector(
    (state) => state.sticker.isFlip.HorizontalFlip
  );
  const isVerticalFlip = useSelector(
    (state) => state.sticker.isFlip.VerticalFlip
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (flipRef.current) {
        if (!flipRef.current.contains(event.target)) {
          const targetClassList = event.target.classList;
          if (
            targetClassList.contains("parentPanel") ||
            targetClassList.contains("templatePanel")
          ) {
            setFlipToggleState(false);
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [flipToggleState]);

  const handleHorizontalFlipObjectAction = (flip) => {
    dispatch(
      handleFlipObject({
        flipType: flip,
      })
    );

    dispatch(
      handleStickerFLipping({
        type: flip,
        flipType: flip,
        HorizontalFlipState: isHorizontalFlip,
      })
    );
  };

  const handleVerticalFlipObjectAction = (flip) => {
    dispatch(
      handleFlipObject({
        flipType: flip,
      })
    );

    dispatch(
      handleStickerFLipping({
        type: flip,
        flipType: flip,
        VerticalFlipState: isVerticalFlip,
      })
    );
  };

  return (
    <div className="relative flex flex-col">
      <FlipIcon onClick={() => setFlipToggleState(!flipToggleState)} />
      {flipToggleState ? (
        <div
          className="absolute top-8 z-10 bg-white w-32 flex flex-col text-sm"
          ref={flipRef}
        >
          <p
            className="hover:bg-gray-100 px-2 py-1"
            onClick={() => handleHorizontalFlipObjectAction("horizontal")}
          >
            Flip Horizontal
          </p>
          <p
            className="hover:bg-gray-100 px-2 py-1"
            onClick={() => handleVerticalFlipObjectAction("vertical")}
          >
            Flip Vertical
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default FlipObject;
