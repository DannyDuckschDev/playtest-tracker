// frontend/src/hooks/useSurveyForm.ts
import { useState } from "react";

// Define the SurveyData type
interface SurveyData {
    frequency: string;
    firstTime: boolean;
    playStyle: string[];
    overallRating: number;
    strategic: number;
    funFactor: number;
}

export const useSurveyForm = () => {
    // Use the SurveyData type in the state
    const [surveyData, setSurveyData] = useState<SurveyData>({
        frequency: '',
        firstTime: false,
        playStyle: [],
        overallRating: 0,
        strategic: 0,
        funFactor: 0,
    });

    // Handle input changes for text and select inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        let parsedValue: string | number = value;
        if (type === 'number') {
            parsedValue = parseFloat(value); //Convert to number
        }

        setSurveyData({
            ...surveyData,
            [name]: parsedValue,
        });
    };

    // Toggle checkbox values (only for boolean values in SurveyData)
    const toggleCheckbox = (name: keyof SurveyData) => {
        if (typeof surveyData[name] === 'boolean') {
            setSurveyData({
                ...surveyData,
                [name]: !(surveyData[name] as boolean),  // Toggle the boolean value
            });
        } else {
            console.warn(`The field ${name} is not a boolean and cannot be toggled.`);
        }
    };

    return {
        surveyData,
        handleInputChange,
        toggleCheckbox,
    };
};
