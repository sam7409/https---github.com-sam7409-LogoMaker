import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
function SearchComponent() {
  const [value, setValue] = useState("");
  return (
    <div className="flex justify-between items-center gap-x-2 border rounded-lg p-1">
      <div className="flex items-center gap-x-2 pl-2 w-full">
        <SearchIcon fontSize={"medium"} />
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full pr-2 focus:outline-none"
          placeholder="Search..."
        />
      </div>
      <button
        className={` ${
          value.length !== 0 ? "bg-blue-600" : "bg-blue-300"
        } p-2 rounded-lg w-24 text-white`}
      >
        Search
      </button>
    </div>
  );
}
export default SearchComponent;
