import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlayFrequencyBlock from './blocks/PlayFrequencyBlock';
import PlayStyleBlock from './blocks/PlayStyleBlock';
import '../styles/surveyCreation.css';

const SurveyCreation: React.FC = () => {
    const { t } = useTranslation();

    // Define form validation schema using Yup
    const validationSchema = Yup.object({
        frequency: Yup.string().required(t('survey.validation.frequencyRequired')),
        playStyle: Yup.array().min(1, t('survey.validation.playStyleRequired')),
    });

    // Formik for form management
    const formik = useFormik({
        initialValues: {
            frequency: '',
            playStyle: [],
        },
        validationSchema,
        onSubmit: (values) => {
            console.log('Form submitted', values);
            // Handle form submission logic here
        },
    });

    return (
        <div className="survey-creation-container">
            <h2>{t('survey.title')}</h2>

            <form onSubmit={formik.handleSubmit} className="survey-form">
                {/* Play Frequency Block */}
                <div className="survey-block">
                    <div className="survey-block-category">
                        {t('survey.categories.gameplay')}
                    </div>
                    <div className="survey-block-question">
                        {t('survey.questions.frequency')}
                    </div>
                    <div className="survey-block-separator" />
                    <PlayFrequencyBlock
                        frequency={formik.values.frequency}
                        handleChange={formik.handleChange}
                        error={formik.errors.frequency}
                    />
                </div>

                {/* Play Style Block */}
                <div className="survey-block">
                    <div className="survey-block-category">
                        {t('survey.categories.gameplay')}
                    </div>
                    <div className="survey-block-question">
                        {t('survey.questions.playStyle')}
                    </div>
                    <div className="survey-block-separator" />
                    <PlayStyleBlock
                        playStyle={formik.values.playStyle}
                        handleChange={formik.handleChange}
                        error={formik.errors.playStyle}
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
