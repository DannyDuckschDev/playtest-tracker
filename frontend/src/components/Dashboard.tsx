// frontend/src/components/Dashboard.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import SurveyCreation from "./SurveyCreation";
import Header from "./Header";
import '../styles/dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/authPage");
  };

  return (
    <div>
      <Header onLogout={handleLogout} />
      <hr />
      <h1>Welcome to your dashboard, game author!</h1>
      <hr />
      <SurveyCreation />
    </div>
  );
};

export default Dashboard;
