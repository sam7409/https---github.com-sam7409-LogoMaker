import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import UTurnRightIcon from "@mui/icons-material/UTurnRight";
import UTurnLeftIcon from "@mui/icons-material/UTurnLeft";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Link } from "react-router-dom";
import { Tooltip } from "@chakra-ui/react";
import {useDispatch} from 'react-redux'
import DownloadButton from "./DownloadButton/DownloadButton";

const TemplateEditorHeader = () => {
  const dispatch = useDispatch()
  return (
    <div className="flex justify-between items-center px-5 py-2 border border-b-1 border-b-gray-300">
      <div className="flex justify-center items-center gap-x-1.5">
        <Link to="/" className="flex items-center">
          <HomeIcon /> Home
        </Link>
      </div>
      <div className="flex items-center gap-x-4">
        <Tooltip label="Undo" placement="bottom">
          <UTurnLeftIcon
            style={{ transform: "rotate(90deg)", cursor: "pointer" }}
          />
        </Tooltip>
        <Tooltip label="Redo" placement="bottom">
          <UTurnRightIcon
            style={{ transform: "rotate(-90deg)", cursor: "pointer" }}
          />
        </Tooltip>
        <Tooltip label="Reset" placement="bottom">
          <RestartAltIcon style={{ cursor: "pointer" }} />
        </Tooltip>
      </div>
      <div className="flex justify-center items-center gap-x-1.5">
       <DownloadButton/>
      </div>
    </div>
  );
};

export default TemplateEditorHeader;
