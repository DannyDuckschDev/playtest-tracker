// frontend/src/components/SurveyCreation.tsx
import React from 'react';
import { useTranslation } from 'react-i18next'; // Hook for translations/localization
import { useFormik } from 'formik'; // Form handling using Formik
import * as Yup from 'yup'; // For form validation schema
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap for basic styling
import PlayFrequencyBlock from './blocks/PlayFrequencyBlock'; // Custom component for play frequency
import PlayStyleBlock from './blocks/PlayStyleBlock'; // Custom component for play style selection
import DemographicsBlock from './blocks/DemographicBlock'; // Custom component for demographic data
import '../styles/surveyCreation.css'; // Custom styles for the survey
import OverallImpressionBlock from './blocks/OverallImpressionBlock';
import FirstTimeBlock from './blocks/FirstTimeBlock';
import GameRatingBlock from './blocks/GameRatingBlock';

const SurveyCreation: React.FC = () => {
    const { t } = useTranslation(); // Translation hook for localization

    // Define form validation schema using Yup
    const validationSchema = Yup.object({
        frequency: Yup.string()
            .required(t('survey.validation.frequencyRequired')), // Frequency is required
        playStyle: Yup.array()
            .min(1, t('survey.validation.playStyleRequired')), // At least one play style is required
        name: Yup.string()
            .required(t('survey.validation.nameRequired')), // Name is required
        gender: Yup.string()
            .required(t('survey.validation.genderRequired')), // Gender is required
        firstTime: Yup.string()
        .required(t('survey.validation.firstTimeRequired')), // First time selection is required
        overallRating: Yup.number()
            .min(1, t('survey.validation.overallImpressionRequired')), // Must be at least 1 for overall impression
        strategic: Yup.number().required(t('survey.validation.ratingRequired')), // Rating for strategic aspect is required
        luckFactor: Yup.number().required(t('survey.validation.ratingRequired')), // Rating for luck factor is required
        funFactor: Yup.number().required(t('survey.validation.ratingRequired')), // Rating for fun factor is required
        replayValue: Yup.number().required(t('survey.validation.ratingRequired')), // Rating for replayability is required
        excitement: Yup.number().required(t('survey.validation.ratingRequired')), // Rating for excitement is required
        uniqueness: Yup.number().required(t('survey.validation.ratingRequired')), // Rating for uniqueness is required
        clarity: Yup.number().required(t('survey.validation.ratingRequired')), // Rating for clarity is required
    });

    // Use Formik to manage form state, validation, and submission
    const formik = useFormik({
        initialValues: {
            frequency: '', // Initial value for play frequency
            playStyle: [], // Initial value for selected play styles
            name: '', // Initial value for name
            age: '', // Initial value for age
            gender: '', // Initial value for gender
            firstTime: '', // Initially no value selected
            overallRating: 0, // Initial rating value for OverallImpressionBlock
            strategic: 0, // Initial value for strategic rating
            luckFactor: 0, // Initial value for luck factor
            funFactor: 0, // Initial value for fun factor
            replayValue: 0, // Initial value for replay value
            excitement: 0, // Initial value for excitement
            uniqueness: 0, // Initial value for uniqueness
            clarity: 0, // Initial value for clarity
        },
        validationSchema, // Validation rules defined with Yup
        onSubmit: (values) => {
            console.log('Form submitted', values); // Log form values on submit
            // Handle form submission logic here, e.g., API call
        },
    });

    return (
        <div className="survey-creation-container">
            {/* Survey Title */}
            <h2>{t('survey.title')}</h2>

            {/* Form Wrapper */}
            <form onSubmit={formik.handleSubmit} className="survey-form">

                {/* Demographics Block */}
                <div className="survey-block">
                    <DemographicsBlock
                        name={formik.values.name} 
                        age={formik.values.age}
                        gender={formik.values.gender}
                        handleChange={formik.handleChange}
                        error={{
                            name: formik.errors.name,
                            age: formik.errors.age,
                            gender: formik.errors.gender
                        }}
                    />
                </div>

                {/* Play Frequency Block */}
                <div className="survey-block">
                    <PlayFrequencyBlock
                        frequency={formik.values.frequency}
                        handleChange={formik.handleChange}
                        error={formik.errors.frequency}
                    />
                </div>

                {/* Play Style Block */}
                <div className="survey-block">
                    <PlayStyleBlock
                        playStyle={formik.values.playStyle}
                        handleChange={formik.handleChange}
                        error={formik.errors.playStyle}
                    />
                </div>

                {/* First Time Playing Block */}
                <div className="survey-block">
                    <FirstTimeBlock
                        firstTime={formik.values.firstTime}
                        handleChange={formik.handleChange}
                        error={formik.errors.firstTime}
                    />
                </div>

                {/* Overall Impression Block */}
                <div className="survey-block">
                    <OverallImpressionBlock
                        rating={formik.values.overallRating} // Pass overall rating value
                        handleChange={formik.handleChange} // Handle rating change
                        error={formik.errors.overallRating} // Handle validation errors
                    /> 
                </div>

                {/* Game Rating Block */}
                <div className='survey-block'>
                    <GameRatingBlock
                        values={{
                          strategic: formik.values.strategic,
                          luckFactor: formik.values.luckFactor,
                          funFactor: formik.values.funFactor,
                          replayValue: formik.values.replayValue,
                          excitement: formik.values.excitement,
                          uniqueness: formik.values.uniqueness,
                          clarity: formik.values.clarity
                        }}
                        handleChange={formik.handleChange}
                        errors={{
                          strategic: formik.errors.strategic,
                          luckFactor: formik.errors.luckFactor,
                          funFactor: formik.errors.funFactor,
                          replayValue: formik.errors.replayValue,
                          excitement: formik.errors.excitement,
                          uniqueness: formik.errors.uniqueness,
                          clarity: formik.errors.clarity
                        }}
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn-primary">
                    {t('survey.submit')}
                </button>
            </form>
        </div>
    );
};

export default SurveyCreation;
