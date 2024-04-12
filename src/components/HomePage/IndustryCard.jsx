import React from "react";
import { Link } from "react-router-dom";

const IndustryCard = ({ industries }) => {
  return (
    <div className="grid grid-cols-3 gap-2 place-items-center mx-auto px-2 pb-2 md:grid-cols-4 md:w-3/5">
      {industries.Industries.map((industry) => (
        <div
          key={industry.Id}
          className="bg-white w-full h-40  flex flex-col items-center justify-center gap-y-2 px-2 shadow-md "
        >
          <div>
            <img src={`${industry.IndustryThumb}`} alt="" />
          </div>
          <Link
            to={`/templates/${industry.IndustryName}`}
          >{`${industry.IndustryName}`}</Link>
        </div>
      ))}
    </div>
  );
};

export default IndustryCard;
