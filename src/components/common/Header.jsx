import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="bg-white">
        <Link to="/" className="ml-5 text-xl font-bold py-2 inline-block">
          LogoMaker
        </Link>
      </div>
    </>
  );
};

export default Header;
