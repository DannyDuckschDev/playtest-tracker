// src/components/Register.tsx

import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/register.css';
import { useFormvalidation } from "../hooks/useFormValidation";
import { usePasswordToggle } from "../hooks/usePasswordToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Spinner from 'react-bootstrap/Spinner';

const Register: React.FC = () => {
    // State variables for managing form inputs and status
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false); // Track focus on password field
    const [loading, setLoading] = useState<boolean>(false); // Loading state

    // Custom hook for form validation with specific validation rules
    const { errors, validateForm, handleFieldChange } = useFormvalidation({
        username: { required: true }, // Username is required
        email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }, // Email validation pattern
        password: { required: true, minLength: 8 }, // Minimum length for password
        confirmPassword: {
            required: true,
            validate: (value: string) => value === password || "Passwords must match", // Custom validation for password confirmation
        },
    });

    // Custom hooks for toggling password visibility
    const [passwordType, togglePasswordVisibility] = usePasswordToggle();
    const [confirmPasswordType, toggleConfirmedPasswordVisibility] = usePasswordToggle();

    // Password complexity criteria
    const passwordCriteria = [
        {rule: "Your password must be at least 8 characters long.", isValid: password.length >= 8 },
        {rule: "Your password must contain at least one uppercase letter.", isValid: /[A-Z]/.test(password)},
        {rule: "Your password must contain at least one lowercase letter.", isValid: /[a-z]/.test(password)},
        {rule: "Your password must contain at least one number.", isValid: /[0-9]/.test(password)},
        {rule: "Your password must contain at least one special character.", isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password)}
    ];

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent default form submission behavior
        setLoading(true); //Set loading to true when request starts

        const isValid = validateForm({ username, email, password, confirmPassword }); // Validate form fields

        if (isValid) {
            try {
                const response = await fetch('http://localhost:3000/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }), // Send form data to backend
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setError(errorData.msg || 'An error occurred during registration.'); // Handle registration error
                    setLoading(false); //Stope loading on error
                    return;
                }

                setSuccess(true); // Mark registration as successful
                setError(null); // Clear previous errors
                console.log('Registration successful');

            } catch (err) {
                setError('An unexpected error occurred. Please try again.');
                console.error('Registration error:', err); // Log registration error
            } finally {
                setLoading(false); //Always stop loading after the request completes
            }
        } else {
            setLoading(false); //Stop loading if form is not valid
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                {error && <p className="error">{error}</p>} {/* Display error message */}
                {success && <p className="success">Registration successful! You can now log in.</p>} {/* Display success message */}
                <div>
                    <label htmlFor="register-username" className="form-label">Username</label>
                    <input 
                        type="text"
                        id="register-username"
                        className="form-control"
                        value={username}
                        onChange={(e) => handleFieldChange('username', e.target.value, setUsername)}
                        required
                        disabled={loading} //Disable input while loading
                    />
                    {errors.username && <p className="errors">{errors.username}</p>} {/* Display username validation error */}
                </div>
                <div>
                    <label htmlFor="register-email" className="form-label">Email</label>
                    <input 
                        type="email"
                        id="register-email"
                        className="form-control"
                        value={email}
                        onChange={(e) => handleFieldChange('email', e.target.value, setEmail)}
                        required
                        disabled={loading} //Disable input while loading
                    />
                    {errors.email && <p className="error">{errors.email}</p>} {/* Display email validation error */}
                </div>
                <div>
                    <label htmlFor="register-password" className="form-label">Password</label>
                    <div className="password-input-container">
                        <input 
                            type={passwordType}
                            id="register-password"
                            className="form-control"
                            value={password}
                            onFocus={() => setIsPasswordFocused(true)} // Show password criteria when focused
                            onBlur={() => setIsPasswordFocused(false)} // Hide password criteria when focus is lost
                            onChange={(e) => handleFieldChange('password', e.target.value, setPassword)}
                            required
                            disabled={loading} //Disable input while loading
                        />
                        <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={passwordType === "password" ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    {isPasswordFocused && (
                        <ul className="password-criteria-list">
                            {passwordCriteria.map((criteria, index) => (
                                <li key={index} className={criteria.isValid ? "valid" : "invalid"}>
                                    {criteria.rule}
                                </li>
                            ))}
                        </ul>
                    )}
                    {errors.password && <p className="error">{errors.password}</p>} {/* Display password validation error */}
                </div>
                <div>
                    <label htmlFor="register-confirmPassword" className="form-label">Confirm Password</label>
                    <div className="password-input-container">
                        <input 
                            type={confirmPasswordType}
                            id="register-confirmPassword"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => handleFieldChange('confirmPassword', e.target.value, setConfirmPassword)}
                            required
                            disabled={loading} //Disable input while loading
                        />
                        <span className="password-toggle-icon" onClick={toggleConfirmedPasswordVisibility}>
                            <FontAwesomeIcon icon={confirmPasswordType === "password" ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>} {/* Display confirm password validation error */}
                </div>
                <button type="submit" className="btn btn-primary">
                    {loading? <Spinner animation="border" size="sm" /> : "Register"}
                </button>
            </form>
        </div>
    );
};

export default Register;
