import React from 'react';
import { useTranslation } from 'react-i18next'; // Hook for translations/localization
import { useFormik } from 'formik'; // Form handling using Formik
import * as Yup from 'yup'; // For form validation schema
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap for basic styling
import PlayFrequencyBlock from './blocks/PlayFrequencyBlock'; // Custom component for play frequency
import PlayStyleBlock from './blocks/PlayStyleBlock'; // Custom component for play style selection
import '../styles/surveyCreation.css'; // Custom styles for the survey

const SurveyCreation: React.FC = () => {
    const { t } = useTranslation(); // Translation hook for localization

    // Define form validation schema using Yup
    const validationSchema = Yup.object({
        frequency: Yup.string()
            .required(t('survey.validation.frequencyRequired')), // Frequency is required
        playStyle: Yup.array()
            .min(1, t('survey.validation.playStyleRequired')), // At least one play style is required
    });

    // Use Formik to manage form state, validation, and submission
    const formik = useFormik({
        initialValues: {
            frequency: '', // Initial value for play frequency
            playStyle: [], // Initial value for selected play styles
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
                
                {/* Play Frequency Block */}
                <div className="survey-block">
                    {/* Category Title */}
                    <div className="survey-block-category">
                        {t('survey.categories.gameplay')} {/* Gameplay category */}
                    </div>

                    {/* Frequency Question */}
                    <div className="survey-block-question">
                        {t('survey.questions.frequency')} {/* Frequency question */}
                    </div>

                    {/* Separator Line */}
                    <div className="survey-block-separator" />

                    {/* PlayFrequencyBlock Component for Frequency Selection */}
                    <PlayFrequencyBlock
                        frequency={formik.values.frequency} // Pass formik frequency value
                        handleChange={formik.handleChange} // Handle formik value change
                        error={formik.errors.frequency} // Pass validation error if any
                    />
                </div>

                {/* Play Style Block */}
                <div className="survey-block">
                    {/* Category Title */}
                    <div className="survey-block-category">
                        {t('survey.categories.gameplay')} {/* Gameplay category */}
                    </div>

                    {/* Play Style Question */}
                    <div className="survey-block-question">
                        {t('survey.questions.playStyle')} {/* Play style question */}
                    </div>

                    {/* Separator Line */}
                    <div className="survey-block-separator" />

                    {/* PlayStyleBlock Component for Play Style Selection */}
                    <PlayStyleBlock
                        playStyle={formik.values.playStyle} // Pass formik playStyle value
                        handleChange={formik.handleChange} // Handle formik value change
                        error={formik.errors.playStyle} // Pass validation error if any
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn-primary">
                    {t('survey.submit')} {/* Submit button text */}
                </button>
            </form>
        </div>
    );
};

export default SurveyCreation;
