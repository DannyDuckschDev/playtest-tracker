// src/hooks/usePasswordToggle.ts

import { useState } from "react";

export const usePasswordToggle = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const inputType = visible ? "text" : "password";

    return [inputType, toggleVisibility] as const;
};
