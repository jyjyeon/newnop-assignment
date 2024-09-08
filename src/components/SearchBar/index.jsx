import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import "./style.css";

const SearchBar = ({ onSearch }) => {
  const [searchName, setSearchName] = useState("");

  //set input text to value
  const handleChange = (event) => {
    const value = event.target.value;
    setSearchName(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <IoSearchSharp />
      <input
        type="text"
        placeholder="Search name"
        value={searchName}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
