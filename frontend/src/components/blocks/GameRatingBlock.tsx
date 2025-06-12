//frontend/src/component/blocks/GameRatingBlock.tsx

/**
 * This component renders a set of rating questions for evaluating different aspects of a board game.
 * It uses a shared `renderRatingQuestions` function to generate radio button inputs for each question.
 * The selected values are managed through Formik's `setFieldValue`, and translations are handled via i18next.
 * Each question is rated from 1 to 4, and optional error messages are displayed if validation fails.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import BlockHeader from '../common/BlockHeader';

interface RatingQuestion {
  name: string;
  label: string;
}

interface RatingProps {
  values: { [key: string]: number | undefined }; // Object holding current values for each question
  setFieldValue: (field: string, value: number) => void; // Formik function to manually set a field value
  errors?: { [key: string]: string | undefined }; // Optional object holding validation error messages
}

// Function to render each rating question with radio buttons
const renderRatingQuestions = (
  questions: RatingQuestion[],
  values: { [key: string]: number | undefined },
  setFieldValue: (field: string, value: number) => void,
  errors?: { [key: string]: string | undefined }
) => {
  return questions.map((question) => (
    <div key={question.name} className="survey-rating">
      <label>{question.label}</label>
      <div className="rating-input">
        {[1, 2, 3, 4].map((value) => (
          <label key={`${question.name}-${value}`} className="rating-option">
            <input
              type="radio"
              name={question.name}
              value={value}
              checked={values[question.name] === value}
              onChange={() => {
                setFieldValue(question.name, value); // Explicitly set the value in Formik
              }}
            />
            <span>{value}</span>
          </label>
        ))}
      </div>
      {errors && errors[question.name] && <p className="error-text">{errors[question.name]}</p>}
    </div>
  ));
};

const GameRatingBlock: React.FC<RatingProps> = ({ values, setFieldValue, errors }) => {
  const { t } = useTranslation();

  // Define list of rating questions and their translated labels
  const ratingQuestions: RatingQuestion[] = [
    { name: 'strategic', label: t('survey.questions.strategic') },
    { name: 'luckFactor', label: t('survey.questions.luckFactor') },
    { name: 'funFactor', label: t('survey.questions.funFactor') },
    { name: 'replayValue', label: t('survey.questions.replayValue') },
    { name: 'excitement', label: t('survey.questions.excitement') },
    { name: 'uniqueness', label: t('survey.questions.uniqueness') },
    { name: 'clarity', label: t('survey.questions.clarity') },
  ];

  return (
    <div className="block form-group">
      {/*  Section header (category, main question, and instruction) */}
      <BlockHeader
        category="survey.categories.feedback"
        question="survey.questions.rating"
        task="survey.tasks.selectRating"
      />

      {/* Render the rating questions */}
      {renderRatingQuestions(ratingQuestions, values, setFieldValue, errors)}
    </div>
  );
};

export default GameRatingBlock;
