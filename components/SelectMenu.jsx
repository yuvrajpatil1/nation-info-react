import React from "react";

export default function SelectMenu({setQuery}) {
  return (
    <div className="filter-by-region">
      <a href="/" className="refresh-btn">
        <i className="fa-solid fa-rotate-right"></i>
      </a>
      <select className="filter-by-region-options" onChange={(e) => setQuery(e.target.value.toLowerCase())}>
        <option
          style={{ color: "rgb(166, 166, 166)" }}
          value="FilterbyRegion"
          hidden
        >
          Filter by Region
        </option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}
