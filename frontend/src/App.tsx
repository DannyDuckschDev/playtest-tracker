import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../src/styles/variables.css'; //Import the CSS variables
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login"; //Import the Login component
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/*Add more routes here*/}
      </Routes>
    </Router>
  );
};

export default App;