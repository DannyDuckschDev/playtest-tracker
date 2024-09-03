// src/components/Login.tsx

import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.css';
import { useFormvalidation } from "../hooks/useFormValidation";
import { useLogin } from "../hooks/useLogin";
import { usePasswordToggle } from "../hooks/usePasswordToggle";
import { Spinner } from "react-bootstrap";

// Import FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login: React.FC = () => {
    // State variables for email, password, and form submission status
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [ loading, setLoading] = useState<boolean>(false); //Loading state

    // Custom hook to handle login functionality and potential errors
    const { login, error } = useLogin();

    // Custom hook to handle form validation, with specific rules for email and password
    const { errors, validateForm, handleFieldChange } = useFormvalidation({
        email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }, // Email validation pattern
        password: { required: true, minLength: 8 }, // Minimum length for password
    }, {validatePasswordComplexity: false}); // Password complexity validation disabled for login

    // Custom hook to toggle password visibility between text and password types
    const [passwordType, togglePasswordVisibility] = usePasswordToggle();

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent default form submission behavior
        setSubmitted(true); // Mark form as submitted
        setLoading(true); //Set loading to true when request starts

        const isValid = validateForm({ email, password }); // Validate form fields

        if (isValid) {
            try {
                const response = await login(email, password); // Attempt to login
                if (!response.ok) {
                    throw new Error(`HTTP error! status ${response.status}`); // Handle HTTP errors
                }

                console.log('Login successful');
                // Redirect or perform other actions after successful login
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Login error:", error.message); // Log error message
                } else {
                    console.error("An unexpected error occurred:", error); // Log unexpected error
                }
            } finally {
                setLoading(false); //Stop loading spinner regardless of success or failure
            }
        } else {
            setLoading(false); //Stop loading spinner if validation fails
        }
    };

    // Handle field changes and validation in real-time
    const handleChange = (name: string, value: string, setValue: React.Dispatch<React.SetStateAction<string>>) => {
        setSubmitted(false); // Reset submission status
        handleFieldChange(name, value, setValue); // Handle field change and validation
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {submitted && error && <p className="error">{error}</p>} {/* Display error if form submitted with errors */}
                <div>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => handleChange('email', e.target.value, setEmail)}
                        required
                        disabled={loading} //Disable input while loading
                    />
                    {errors.email && <p className="error">{errors.email}</p>} {/* Display email validation error */}
                </div>
                <div>
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="password-input-container">
                        <input 
                            type={passwordType} 
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => handleChange('password', e.target.value, setPassword)}
                            required
                            disabled={loading} //Disable input while loading
                        />
                        <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={passwordType === "password" ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    {errors.password && <p className="error">{errors.password}</p>} {/* Display password validation error */}
                </div>
                <button type="submit" className="btn btn-primary">
                    {loading? <Spinner animation="border" size="sm" /> : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
