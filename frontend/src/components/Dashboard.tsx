// scr/components/Dashboard.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import SurveyCreation from "./SurveyCreation";

const Dashboard: React.FC = () => {
    const navitage = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem('token'); //Removes token from local storage
        navitage('/authPage'); //navigates user to login page
    };

    return	(
        <div>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
            <hr />
            <h1>Willkommen auf deinem Dashboard, Spielautor*in!</h1>
            <hr />
            <SurveyCreation />
            
        </div>
    );
}; 

export default Dashboard;