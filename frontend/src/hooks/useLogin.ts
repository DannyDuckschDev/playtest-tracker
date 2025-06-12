// frontend/src/hooks/useLogin.ts

import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
    token: string;
    msg?: string;  // Optional error message from server
}

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    
    // Function to handle login request
    const login = async (email: string, password: string): Promise<Response> => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            // Handle failed login
            if (!response.ok) {

                const errorData: LoginResponse = await response.json();
                setError(errorData.msg || 'An unkown error occured');
                return response;
            }
            
            // Handle successful login
            const data: LoginResponse = await response.json();
            
            // Store auth token locally (consider security implications!)
            localStorage.setItem('token', data.token);

            // Redirect to dashboard
            navigate('/dashboard');

            return response;

        } catch (err) {
            console.log('Login error:', err);
            setError('Please try again.');
            throw err;
        }
    };

    return {login, error};
};