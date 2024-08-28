// src/components/Login.tsx

import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.css';
import { useFormvalidation } from "../hooks/useFormValidation";
import { useLogin } from "../hooks/useLogin";

const Login: React.FC = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const { login, error } = useLogin();

    const { errors, validateForm, handleFieldChange } = useFormvalidation({
        email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        password: { required: true, minLength: 6},
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const isValid = validateForm({ email, password });

        if (isValid) {
            try {
                const response = await login(email, password);
                if (!response.ok) {
                    throw new Error(`HTTP error! status ${response.status}`);
                }
                
                console.log('Login successful');
                // Forwarding or other actions after successful login
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Login error:", error.message);
                } else {
                    console.error("An unexpected error occurred:", error);
                } 
            }
        } 
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
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
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;