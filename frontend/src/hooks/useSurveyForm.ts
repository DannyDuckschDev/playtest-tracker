import { useState } from "react";

// Define the SurveyData type to structure the form data
interface SurveyData {
    frequency: string;        // Selected play frequency
    firstTime: boolean;       // Whether the player is playing for the first time
    playStyle: string[];      // Selected play styles
    overallRating: number;    // Overall game rating
    strategic: number;        // Strategic depth rating
    funFactor: number;        // Fun factor rating
}

// Custom hook to manage survey form state and logic
export const useSurveyForm = () => {
    // State for managing form data, initialized with default value
    const [surveyData, setSurveyData] = useState<SurveyData>({
        frequency: '',        // Initially no frequency selected
        firstTime: false,     // Default to not a first-time player
        playStyle: [],        // No play styles selected by default
        overallRating: 0,     // Default overall rating is 0
        strategic: 0,         // Default strategic rating is 0
        funFactor: 0,         // Default fun factor rating is 0
    });

    // Handle input changes for text and select fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        let parsedValue: string | number = value;
        if (type === 'number') {
            parsedValue = parseFloat(value);
        }

        // Update the surveyData state with the new value
        setSurveyData({
            ...surveyData,
            [name]: parsedValue, // Dynamically update the field based on the input name
        });
    };

    // Toggle the boolean values for checkboxes
    const toggleCheckbox = (name: keyof SurveyData) => {
        // Check if the field is a boolean before toggling
        if (typeof surveyData[name] === 'boolean') {
            setSurveyData({
                ...surveyData,
                [name]: !(surveyData[name] as boolean),
            });
        } else {
            console.warn(`The field ${name} is not a boolean and cannot be toggled.`);
        }
    };

    // Return the survey data and handlers to be used in components
    return {
        surveyData,
        handleInputChange,
        toggleCheckbox,
    };
};
