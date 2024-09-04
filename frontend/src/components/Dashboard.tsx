// scr/components/Dashboard.tsx

import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
    const navitage = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem('token'); //Removes token from local storage
        navitage('/authPage'); //navigates user to login page
    };

    return	(
        <div>
            <h1>Willkommen auf deinem Dashboard, Spielautor*in!</h1>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>
    );
};

export default Dashboard;