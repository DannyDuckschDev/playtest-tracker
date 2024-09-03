// src/hooks/usePasswordToggle.ts

import { useState } from "react";

// Custom hook to toggle the visibility of password input fields
export const usePasswordToggle = () => {
    // State variable to track the visibility of the password
    const [visible, setVisible] = useState(false);

    // Function to toggle the visibility state
    const toggleVisibility = () => {
        setVisible(!visible); // Toggle between visible and hidden states
    };

    // Determine the input type based on the visibility state
    const inputType = visible ? "text" : "password";

    // Return the input type and the toggle function
    return [inputType, toggleVisibility] as const;
};
