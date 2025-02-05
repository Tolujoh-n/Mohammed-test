import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import { Web3Provider } from "./components/Web3Provider";

const App = () => {
  return (
    <Web3Provider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </Web3Provider>
  );
};

export default App;
