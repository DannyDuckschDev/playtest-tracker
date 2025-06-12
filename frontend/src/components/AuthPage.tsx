// frontend/src/components/AuthPage.tsx

import React from "react";
import Login from "./Login";
import Register from "./Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/auth.css';

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
