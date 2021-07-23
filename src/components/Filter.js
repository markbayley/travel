import React from "react";

const Filter = ({ setFilterParam }) => {
  return (
    <div className="select">
      <select
        onChange={(e) => {
          setFilterParam(e.target.value);
        }}
        className="custom-select"
        aria-label="Filter Countries By Countries"
      >
        <option value="All">Filter By Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
      <span className="focus"></span>
    </div>
  );
};

export default Filter;
