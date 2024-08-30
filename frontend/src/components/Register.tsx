// src/components/Register.tsx

import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles for basic styling
import '../styles/register.css'; // Import custom styles for the Register component
import { useFormvalidation } from "../hooks/useFormValidation"; // Import the custom form validation hook

// Define the Register component, which manages the user registration process
const Register: React.FC = () => {
    // State variables to manage form inputs
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [confirmPassword, setConfirmPassword] = useState<string | undefined>();

    // Destructure validation functions and errors from the custom hook
    const { errors, validateForm, handleFieldChange } = useFormvalidation({
        username: { required: true },
        email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        password: { required: true, minLength: 6 },
        confirmPassword: {
            required: true,
            validate: (value: string) => value === password || "Passwords must match",
        },
    });

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Validate the entire form
        const isValid = validateForm({ username, email, password, confirmPassword });

        if (isValid) {
            // Implement the registration logic here
            console.log("Registration successful");
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div>
                    <label htmlFor="username" className="form-label">Username</label>
                    <input 
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => handleFieldChange('username', e.target.value, setUsername)}
                        required
                    />
                    {errors.username && <p className="errors">{errors.username}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => handleFieldChange('email', e.target.value, setEmail)}
                        required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => handleFieldChange('password', e.target.value, setPassword)}
                        required
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input 
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => handleFieldChange('confirmPassword', e.target.value, setConfirmPassword)}
                        required
                    />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default Register;
