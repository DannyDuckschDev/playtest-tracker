// src/components/Register.tsx

import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/register.css';
import { useFormvalidation } from "../hooks/useFormValidation";
import { usePasswordToggle } from "../hooks/usePasswordToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);

    const { errors, validateForm, handleFieldChange } = useFormvalidation({
        username: { required: true },
        email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        password: { required: true, minLength: 8 },
        confirmPassword: {
            required: true,
            validate: (value: string) => value === password || "Passwords must match",
        },
    });

    const [passwordType, togglePasswordVisibility] = usePasswordToggle();
    const [confirmPasswordType, toggleConfirmedPasswordVisibility] = usePasswordToggle();

    const passwordCriteria = [
        {rule: "Must be at least 8 characters long", isValid: password.length >= 8 },
        {rule: "Must contain at least one uppercase letter", isValid: /[A-Z]/.test(password)},
        {rule: "Must contain at least one lowercase letter", isValid: /[a-z]/.test(password)},
        {rule: "Must contain at least one number", isValid: /[0-9]/.test(password)},
        {rule: "Must contain at least one special character", isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password)}
    ];

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const isValid = validateForm({ username, email, password, confirmPassword });

        if (isValid) {
            try {
                const response = await fetch('http://localhost:3000/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setError(errorData.msg || 'An error occurred during registration.');
                    return;
                }

                setSuccess(true);
                setError(null);
                console.log('Registration successful');

            } catch (err) {
                setError('An unexpected error occurred. Please try again.');
                console.error('Registration error:', err);
            }
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">Registration successful! You can now log in.</p>}
                <div>
                    <label htmlFor="register-username" className="form-label">Username</label>
                    <input 
                        type="text"
                        id="register-username"
                        className="form-control"
                        value={username}
                        onChange={(e) => handleFieldChange('username', e.target.value, setUsername)}
                        required
                    />
                    {errors.username && <p className="errors">{errors.username}</p>}
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
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="register-password" className="form-label">Password</label>
                    <div className="password-input-container">
                        <input 
                            type={passwordType}
                            id="register-password"
                            className="form-control"
                            value={password}
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}
                            onChange={(e) => handleFieldChange('password', e.target.value, setPassword)}
                            required
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
                    {errors.password && <p className="error">{errors.password}</p>}
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
                        />
                        <span className="password-toggle-icon" onClick={toggleConfirmedPasswordVisibility}>
                            <FontAwesomeIcon icon={confirmPasswordType === "password" ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default Register;
