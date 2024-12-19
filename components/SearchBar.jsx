import React, { useState } from "react";

export default function SearchBar({setQuery}) {
  return (
    <div className="search-container">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input onChange={(e) => setQuery(e.target.value.toLowerCase())} placeholder="Search for a country..." type="text"/>
            </div>
  )
}
