import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../src/styles/variables.css'; //Import the CSS variables
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./components/Dashboard";
import AuthPage from "./components/AuthPage";

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes /> {/*Logic is in seperated component*/}
    </Router>
  );
};

//AppRoutes in seperated component, to use useNavigate within the router context
const AppRoutes: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() =>  {
    const token = localStorage.getItem('token');
    if (token) {
      //Navigate to dashboard
      navigate('/dashboard');
    }
  }, [navigate]); //add navigate as depencendiy

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/authPage" element={<AuthPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/*Add more routes here*/}
    </Routes>
  );
};


export default App;