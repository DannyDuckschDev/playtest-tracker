import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik, FormikProps } from 'formik';  // Import the necessary Formik types
import * as Yup from 'yup'; // Validation schema helper
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap for styling
import DragAndDropBlock from './blocks/DragAndDropBlock'; // Custom drag-and-drop component
import '../styles/surveyCreation.css';

// Define the Block interface to describe draggable items
interface Block {
  id: string;
  content: string;
}

// Define form values interface to manage form data using Formik
interface FormValues {
  name: string;
  age: string;
  gender: string;
  frequency: string;
  playStyle: string[];
  firstTime: string;
  overallRating: number;
  strategic: number;
  luckFactor: number;
  funFactor: number;
  replayValue: number;
  excitement: number;
  uniqueness: number;
  clarity: number;
}

const SurveyCreation: React.FC = () => {
  const { t } = useTranslation(); // Hook for i18n translation

   // Validation schema for form inputs using Yup
  const validationSchema = Yup.object({
    frequency: Yup.string().required(t('survey.validation.frequencyRequired')),
    playStyle: Yup.array().min(1, t('survey.validation.playStyleRequired')),
    name: Yup.string().required(t('survey.validation.nameRequired')),
    gender: Yup.string().required(t('survey.validation.genderRequired')),
    firstTime: Yup.string().required(t('survey.validation.firstTimeRequired')),
    overallRating: Yup.number().min(1, t('survey.validation.overallImpressionRequired')),
    strategic: Yup.number().required(t('survey.validation.ratingRequired')),
    luckFactor: Yup.number().required(t('survey.validation.ratingRequired')),
    funFactor: Yup.number().required(t('survey.validation.ratingRequired')),
    replayValue: Yup.number().required(t('survey.validation.ratingRequired')),
    excitement: Yup.number().required(t('survey.validation.ratingRequired')),
    uniqueness: Yup.number().required(t('survey.validation.ratingRequired')),
    clarity: Yup.number().required(t('survey.validation.ratingRequired')),
  });

   // Initialize Formik for form state management
  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: {
      frequency: '',
      playStyle: [],
      name: '',
      age: '',
      gender: '',
      firstTime: '',
      overallRating: 0,
      strategic: 0,
      luckFactor: 0,
      funFactor: 0,
      replayValue: 0,
      excitement: 0,
      uniqueness: 0,
      clarity: 0,
    },
    validationSchema, // Attach validation schema
    onSubmit: (values) => {
      console.log('Form submitted', values); // Action on form submit
    },
  });

  // Initialize the draggable blocks state
  const [blocks, setBlocks] = useState<Block[]>([
    { id: '1', content: 'DemographicsBlock' },
    { id: '2', content: 'PlayFrequencyBlock' },
    { id: '3', content: 'PlayStyleBlock' },
    { id: '4', content: 'FirstTimeBlock' },
    { id: '5', content: 'OverallImpressionBlock' },
    { id: '6', content: 'GameRatingBlock' },
  ]);

  // Handle block reordering after drag-and-drop event
  const handleBlocksChange = (updatedBlocks: Block[]) => {
    setBlocks(updatedBlocks); // Update the block state with the new order
  };

  return (
    <div className="survey-creation-container">
      {/* Survey title */}
      <h2>{t('survey.title')}</h2>

      {/* Form submission with Formik's handleSubmit */}
      <form onSubmit={formik.handleSubmit} className="survey-form">
        {/* Drag-and-drop blocks passed with formik data */}
        <DragAndDropBlock blocks={blocks} onBlocksChange={handleBlocksChange} formik={formik} />

        {/* Submit button */}
        <button type="submit" className="btn-primary">
          {t('survey.submit')}
        </button>
      </form>
    </div>
  );
};

export default SurveyCreation;
