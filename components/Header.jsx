import React, { useContext, useState } from "react";
import { useTheme } from "../hooks/useTheme";

const Header = () => {

  const [isDark, setIsDark] =  useTheme()
  return (
    <div>
      <header className={`header-container ${isDark ? 'dark' : ''}`}>
        <div className="header-content">
          <h2 className="title">
            <a href="/">NationInfo</a>
          </h2>
          <p className="theme-changer"
            onClick={() => {
              setIsDark(!isDark)
              localStorage.setItem('isDarkMode', !isDark)
            }}
            >
            <i className={`fa-solid fa-${isDark ? 'sun' : 'moon'}`}></i>&nbsp;&nbsp;{isDark ? 'Light' : 'Dark'} Mode
          </p>
        </div>
      </header>
    </div>
  );
};

export default Header;
