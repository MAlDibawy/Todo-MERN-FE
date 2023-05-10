import { useState } from "react";
import "./App.css";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./theme";
import { Switch } from "@mui/material";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header/Header";

function App() {
  const [theme, setTheme] = useState("light");
  const isDarkTheme = theme === "dark";
  const toggleTheme = () => setTheme(isDarkTheme ? "light" : "dark");

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyles />

      <div className="App container-fluid m-auto">
        {/* <h2 className=" mb-4 text-center">Todo List</h2> */}
        <Router>
          <Header />
          <label>switch to {isDarkTheme ? "light" : "dark"} theme</label>

          <Switch onChange={toggleTheme} />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
