import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import IndustryTemplatePreview from "./IndustryTemplatePreview";
import { Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { handleIndustryTemplate } from "../../redux/slices/TemplateSlice";

const TemplateCard = ({ templates }) => {

  const dispatch = useDispatch()
  const [id, setId] = useState("");

  const handleMouseEnter = (templateId) => {
    setId(templateId);
  };

  const handleMouseLeave = () => {
    setId("");
  };
  return (
    <>
      <div className="grid grid-cols-3 gap-2 place-items-center mx-auto px-2 pb-2 md:grid-cols-4 md:w-3/5">
        {templates.Templates.map((industry) => (
          <div
            key={industry.TEMPLATE_ID}
            className="relative"
            onMouseEnter={() => handleMouseEnter(industry.TEMPLATE_ID)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="bg-white w-full h-40  flex flex-col items-center justify-center gap-y-2  shadow-md ">
              <img
                src={`${industry.THUMB_URI}`}
                className="w-full h-full"
                alt=""
              />
            </div>
            <div
              className={`${
                industry.TEMPLATE_ID === id ? "block" : "hidden"
              }  backdrop-blur-sm bg-slate-800/30 w-full h-full absolute z-10 top-0 cursor-pointer`}
            >
              <div className="flex items-center gap-x-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Tooltip title="Use this template" placement="top">
                  <Link onClick={()=>dispatch(handleIndustryTemplate(industry))}
                    to={`/logo-maker/dashboard`}
                    className="bg-blue-800 p-2 rounded-lg text-white"
                  >
                    <DashboardIcon />
                  </Link>
                </Tooltip>

                <IndustryTemplatePreview
                  templateUrl={industry.THUMB_URI}
                  type={industry.TYPE}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TemplateCard;
