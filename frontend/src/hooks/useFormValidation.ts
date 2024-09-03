// src/hook/useFormvalidation.ts

import { useState } from "react";

// Define the validation rules for each form field
type ValidationRules = {
    required?: boolean; // Specifies if the field is required
    minLength?: number; // Minimum length of the input value
    maxLength?: number; // Maximum length of the input value
    pattern?: RegExp; // Regular expression pattern the value should match
    validate?: (value: string) => string | boolean; // Custom validation function
};

// Define the structure for holding validation errors
type ValidationErrors = {
    [field: string]: string;
};

// Define the structure for validators applied to fields
type FieldValidators = {
    [field: string]: ValidationRules;
};

type ValidationOptions = {
    validatePasswordComplexity?: boolean; // Option to enable password complexity validation
}

// Custom hook to handle form validation
export const useFormvalidation = (
    validators: FieldValidators,
    options: ValidationOptions = {}
) => {
    const [errors, setErrors] = useState<ValidationErrors>({});

    // Validate the complexity of a password based on common security rules
    const validatePasswordComplexity = (password: string): string | boolean => {
        if (password.length < 8) return "Your password must be at least 8 characters long";
        if (!/[A-Z]/.test(password)) return "Your password must contain at least one uppercase letter";
        if (!/[a-z]/.test(password)) return "Your password must contain at least one lowercase letter";
        if (!/[0-9]/.test(password)) return "Your password must contain at least one number";
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Your password must at least contain one special character";
        return true;
    };

    // Validate a single field based on its validation rules
    const validateField = (name: string, value: string | undefined): string | null => {
        const rules = validators[name];

        if (rules) {
            // Check if the field is required and has a value
            if (rules.required && !value) {
                return `This ${name} field is required.`;
            }

            // Check if the value meets the minimum length requirement
            if (rules.minLength && value && value.length < rules.minLength) {
                return `The ${name} must be at least ${rules.minLength} characters long.`;
            }

            // Check if the value exceeds the maximum length
            if (rules.maxLength && value && value.length > rules.maxLength) {
                return `The ${name} must be less than ${rules.maxLength} characters.`;
            }

            // Check if the value matches the specified pattern
            if (rules.pattern && value && !rules.pattern.test(value)) {
                if (name === 'email'){
                    return 'Please enter a valid email adress (e.g., user@example.com).';
                }
                return 'The format of the entered value is invalid.';
            }

            // Apply custom validation if provided
            if (rules.validate) {
                const validationResult = rules.validate(value || '');
                if (typeof validationResult === "string") {
                    return validationResult;
                } else if (validationResult === false) {
                    return "Validation failed";
                }
            }

            // Apply password complexity validation if enabled in options
            if (name === 'password' && options?.validatePasswordComplexity) {
                const paswordValidationResult = validatePasswordComplexity(value || '');
                if (typeof paswordValidationResult === "string") {
                    return paswordValidationResult;
                }
            }
        }

        return null; // No errors found
    };

    // Validate all fields in the form and update the error state
    const validateForm = (fields: { [key: string]: string | undefined }): boolean => {
        let valid = true;
        const newErrors: ValidationErrors = {};

        // Validate each field and collect errors
        for (const field in fields) {
            const error = validateField(field, fields[field]);
            if (error) {
                valid = false;
                newErrors[field] = error;
            }
        }

        setErrors(newErrors); // Update error state
        return valid; // Return form validity
    };

    // Handle field changes, update the value, and validate in real-time
    const handleFieldChange = (
        name: string,
        value: string | undefined,
        onChange: (value: string) => void
    ) => {
        onChange(value || ""); // Update the field value
        const error = validateField(name, value); // Validate the field
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error || '' })); // Update errors state
    };

    return {
        errors, // Expose validation errors
        validateForm, // Expose form validation function
        handleFieldChange, // Expose field change handler
    };
};
