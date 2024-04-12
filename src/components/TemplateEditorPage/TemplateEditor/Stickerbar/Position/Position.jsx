import React, { useEffect, useRef, useState } from "react";
import LayersIcon from "@mui/icons-material/Layers";
import { handleObjectPosition } from "../../../../../redux/slices/CommonSlice";
import { useDispatch, useSelector } from "react-redux";

const Position = () => {
  const [positionToggleState, setPositionToggleState] = useState(false);
  const industryTemplateData = useSelector((state) => state.template.template);
  const positionRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (positionRef.current) {
        if (!positionRef.current.contains(event.target)) {
          const targetClassList = event.target.classList;
          if (
            targetClassList.contains("parentPanel") ||
            targetClassList.contains("templatePanel")
          ) {
            setPositionToggleState(false);
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [positionToggleState]);
  return (
    <div className="relative flex flex-col">
      <LayersIcon
        onClick={() => setPositionToggleState(!positionToggleState)}
      />
      {positionToggleState ? (
        <div
          className="absolute top-8 z-20 bg-white w-52 place-items-center grid grid-cols-3 text-sm"
          ref={positionRef}
        >
          <p
            className="hover:bg-gray-100 text-center py-1 w-full"
            onClick={() =>
              dispatch(
                handleObjectPosition({
                  positionType: "TL",
                  templateData: industryTemplateData,
                })
              )
            }
          >
            TL
          </p>
          <p
            className="hover:bg-gray-100 text-center py-1 w-full"
            onClick={() =>
              dispatch(
                handleObjectPosition({
                  positionType: "T",
                  templateData: industryTemplateData,
                })
              )
            }
          >
            Top
          </p>
          <p
            className="hover:bg-gray-100 text-center py-1 w-full"
            onClick={() =>
              dispatch(
                handleObjectPosition({
                  positionType: "TR",
                  templateData: industryTemplateData,
                })
              )
            }
          >
            TR
          </p>
          <p
            className="hover:bg-gray-100 text-center py-1 w-full"
            onClick={() =>
              dispatch(
                handleObjectPosition({
                  positionType: "L",
                  templateData: industryTemplateData,
                })
              )
            }
          >
            Left
          </p>
          <p
            className="hover:bg-gray-100 text-center py-1 w-full"
            onClick={() =>
              dispatch(
                handleObjectPosition({
                  positionType: "center",
                  templateData: industryTemplateData,
                })
              )
            }
          >
            Center
          </p>
          <p
            className="hover:bg-gray-100 text-center py-1 w-full"
            onClick={() =>
              dispatch(
                handleObjectPosition({
                  positionType: "R",
                  templateData: industryTemplateData,
                })
              )
            }
          >
            Right
          </p>
          <p
            className="hover:bg-gray-100 text-center py-1 w-full"
            onClick={() =>
              dispatch(
                handleObjectPosition({
                  positionType: "BL",
                  templateData: industryTemplateData,
                })
              )
            }
          >
            BL
          </p>
          <p
            className="hover:bg-gray-100 text-center py-1 w-full"
            onClick={() =>
              dispatch(
                handleObjectPosition({
                  positionType: "B",
                  templateData: industryTemplateData,
                })
              )
            }
          >
            Bottom
          </p>
          <p
            className="hover:bg-gray-100 text-center py-1 w-full"
            onClick={() =>
              dispatch(
                handleObjectPosition({
                  positionType: "BR",
                  templateData: industryTemplateData,
                })
              )
            }
          >
            BR
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Position;
