import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../src/styles/variables.css'; //Import the CSS variables
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./components/Dashboard";
import AuthPage from "./components/AuthPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<AuthPage />} />
        <Route path="/authPage" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/*Add more routes here*/}
      </Routes>
    </Router>
  );
};

export default App;