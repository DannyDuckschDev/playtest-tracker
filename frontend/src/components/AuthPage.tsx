// src/components/AuthPage.tsx

import React from "react";
import Login from "./Login"; // Import the Login component
import Register from "./Register"; // Import the Register component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles for basic styling
import '../styles/auth.css'; // Import custom styles for the AuthPage

// Define the AuthPage component, which combines the Login and Register components
const AuthPage: React.FC = () => {
    return (
        <div className="auth-container">
            {/* Left section containing the Login component */}
            <div className="auth-left">
                <Login />
            </div>
            {/* Right section containing the Register component */}
            <div className="auth-right">
                <Register />
            </div>
        </div>
    );
};

export default AuthPage;
