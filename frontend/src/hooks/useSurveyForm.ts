import { useState } from "react";

// Define the SurveyData type to structure the form data
interface SurveyData {
    frequency: string;        // Stores the selected play frequency
    firstTime: boolean;       // Tracks if the player is a first-time player
    playStyle: string[];      // Stores the selected play styles as an array
    overallRating: number;    // Stores the overall game rating
    strategic: number;        // Stores the strategic rating
    funFactor: number;        // Stores the fun factor rating
}

// Custom hook to manage survey form data and interactions
export const useSurveyForm = () => {
    // State for managing the survey data, initialized with default values
    const [surveyData, setSurveyData] = useState<SurveyData>({
        frequency: '',        // Initially no frequency selected
        firstTime: false,     // Default to not a first-time player
        playStyle: [],        // No play styles selected by default
        overallRating: 0,     // Default overall rating is 0
        strategic: 0,         // Default strategic rating is 0
        funFactor: 0,         // Default fun factor rating is 0
    });

    // Handle input changes for text and select inputs in the form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target; // Extract name, value, and type from the event target

        let parsedValue: string | number = value; // Initialize parsedValue as string or number
        if (type === 'number') {
            parsedValue = parseFloat(value); // Convert to number if input type is 'number'
        }

        // Update the surveyData state with the new value
        setSurveyData({
            ...surveyData,
            [name]: parsedValue, // Dynamically update the field based on the input name
        });
    };

    // Toggle the boolean values for checkboxes (e.g., firstTime)
    const toggleCheckbox = (name: keyof SurveyData) => {
        // Check if the field is a boolean before toggling
        if (typeof surveyData[name] === 'boolean') {
            setSurveyData({
                ...surveyData,
                [name]: !(surveyData[name] as boolean),  // Toggle the boolean value
            });
        } else {
            console.warn(`The field ${name} is not a boolean and cannot be toggled.`); // Warn if the field isn't a boolean
        }
    };

    // Return the survey data and handlers to be used in components
    return {
        surveyData,            // The current state of the survey form
        handleInputChange,     // Function to handle input changes
        toggleCheckbox,        // Function to toggle boolean values (checkboxes)
    };
};
