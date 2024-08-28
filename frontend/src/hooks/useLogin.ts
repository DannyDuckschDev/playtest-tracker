// src/hooks/useLogin.ts

import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
    token: string;
    msg?: string;
}

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const login = async (email: string, password: string): Promise<Response> => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {

                const errorData: LoginResponse = await response.json();
                setError(errorData.msg || 'An unkown error occured');
                return response;
            }
            
            const data: LoginResponse = await response.json();
            // Save the token an other login data
            localStorage.setItem('token', data.token);
            navigate('/dashboard'); // Forwarding after successfull loging

            return response;

        } catch (err) {
            console.log('Login error:', err);
            setError('Please try again.');
            throw err;
        }
    };

    return {login, error};
};