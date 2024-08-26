// src/components/Login.tsx

import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.css';
import { useFormvalidation } from "../hooks/useFormValidation";

const Login: React.FC = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const { errors, validateForm, handleFieldChange } = useFormvalidation({
        email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        password: { required: true, minLength: 6},
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const isValid = validateForm({ email, password });

        if (isValid) {
            console.log({ email, password });
            //Submit form data to the backend
        }
        
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
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
                <button type="submit" className="btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;