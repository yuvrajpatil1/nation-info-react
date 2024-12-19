import React from "react";
import Header from './Components/Header'
import './App.css'
import { Outlet } from "react-router";
import { ThemeProvider } from "./contexts/ThemeContext";

const App = () => {
    return (
          <ThemeProvider>
            <Header/>
            <Outlet/>
          </ThemeProvider>
  )
}

export default App