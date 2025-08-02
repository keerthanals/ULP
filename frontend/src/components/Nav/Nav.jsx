import React, { useState } from "react";
import "./Nav.scss";

const Nav = ({ selectedOption, setSelectedOption }) => {
  const toggleSelection = () => {
    setSelectedOption(selectedOption === "mom" ? "dad" : "mom");
  };

  return (
    <nav className="nav">
      <div className="logo">Dad VS Mom</div>
      <div className="select-wrapper">
        <div
          className="selection"
          onClick={toggleSelection}
          style={{ cursor: "pointer" }}
        >
          {selectedOption}
        </div>
        <div className="select-box">
          <div className="list-item">mom</div>
          <div className="list-item">dad</div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
