// src/hook/useFormvalidation.ts

import { useState } from "react";

type ValidationRules = {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
};

type ValidationErrors = {
    [field: string]: string;
};

type FieldValidators = {
    [field: string]: ValidationRules;
};

export const useFormvalidation = (validators: FieldValidators) => {
    const [ errors, setErrors ] = useState<ValidationErrors>({});

    const validateField = (name: string, value: string): string | null => {
        const rules = validators[name];

        if (rules) {
            if (rules.required && !value) {
                return 'This field is required';
            }

            if (rules.minLength && value.length < rules.minLength) {
                return `Must be at least ${rules.minLength} characters long`;
            }

            if (rules.maxLength && value.length > rules.maxLength) {
                return `Must be less than ${rules.maxLength} characters`;
            }

            if (rules.pattern && !rules.pattern.test(value)) {
                return 'Invalid format';
            }
        }

        return null;
    };

    const validateForm = (fields: { [key: string]: string }): boolean => {
        let valid = true;
        const newErrors: ValidationErrors = {};

        for (const field in fields) {
            const error = validateField(field, fields[field]);
            if (error) {
                valid = false;
                newErrors[field] = error;
            }
        }

        setErrors(newErrors);
        return valid;
    };

    const handleFieldChange = (
        name: string,
        value: string,
        onChange:(value: string) => void
    ) => {
        onChange(value);
        const error = validateField(name, value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error || '' }));
    };

    return {
        errors,
        validateForm,
        handleFieldChange,
    };
};