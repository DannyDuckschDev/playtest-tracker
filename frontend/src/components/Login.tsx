// src/components/Login.tsx

import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.css';
import { useFormvalidation } from "../hooks/useFormValidation";
import { useLogin } from "../hooks/useLogin";
import { usePasswordToggle } from "../hooks/usePasswordToggle";

// Importiere FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const { login, error } = useLogin();

    const { errors, validateForm, handleFieldChange } = useFormvalidation({
        email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        password: { required: true, minLength: 6 },
    });

    // Verwende die Hook, um die Sichtbarkeit des Passworts umzuschalten
    const [passwordType, togglePasswordVisibility] = usePasswordToggle();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setSubmitted(true);

        const isValid = validateForm({ email, password });

        if (isValid) {
            try {
                const response = await login(email, password);
                if (!response.ok) {
                    throw new Error(`HTTP error! status ${response.status}`);
                }

                console.log('Login successful');
                // Weiterleiten oder andere Aktionen nach erfolgreichem Login
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Login error:", error.message);
                } else {
                    console.error("An unexpected error occurred:", error);
                }
            }
        }
    };

    const handleChange = (name: string, value: string, setValue: React.Dispatch<React.SetStateAction<string>>) => {
        setSubmitted(false);
        handleFieldChange(name, value, setValue);
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {submitted && error && <p className="error">{error}</p>}
                <div>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => handleChange('email', e.target.value, setEmail)}
                        required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
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
                        />
                        <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={passwordType === "password" ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;
