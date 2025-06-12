// frontend/src/hooks/usePasswordToggle.ts

import { useState } from "react";

// Custom hook to manage toggling visibility of password input fields
export const usePasswordToggle = () => {
    // Tracks whether the password is currently visible
    const [visible, setVisible] = useState(false);

    // Toggles the visibility state
    const toggleVisibility = () => {
        setVisible(!visible); // Toggle between visible and hidden states
    };

    // Determines input type based on visibility
    const inputType = visible ? "text" : "password";

    // Return both the current input type and the function to toggle it
    return [inputType, toggleVisibility] as const;
};
