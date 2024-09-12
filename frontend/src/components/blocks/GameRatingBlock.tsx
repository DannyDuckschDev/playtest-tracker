// frontend/src/components/blocks/GameRatingBlock.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import BlockHeader from '../common/BlockHeader';

interface RatingQuestion {
  name: string;
  label: string;
}

interface RatingProps {
  values: { [key: string]: number | undefined }; // Flexible values object
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Formik handleChange
  errors?: { [key: string]: string | undefined }; // Flexible error object
}

// Function to render each question
const renderRatingQuestions = (
  questions: RatingQuestion[],
  values: { [key: string]: number | undefined },
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  errors?: { [key: string]: string | undefined }
) => {
  return questions.map((question) => (
    <div key={question.name} className="survey-rating">
      <label>{question.label}</label>
      <div className="rating-input">
        {[1, 2, 3, 4, 5].map((value) => (
          <label key={`${question.name}-${value}`} className="rating-option">
            <input
              type="radio"
              name={question.name}
              value={value}
              checked={values[question.name] === value}
              onChange={handleChange}
            />
            <span>{value}</span>
          </label>
        ))}
      </div>
      {errors && errors[question.name] && <p className="error-text">{errors[question.name]}</p>}
    </div>
  ));
};

const GameRatingBlock: React.FC<RatingProps> = ({ values, handleChange, errors }) => {
  const { t } = useTranslation();

  // Define the list of rating questions (dynamic & flexible)
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
      <BlockHeader
        category="survey.categories.gameplay"
        question={t('survey.questions.rating')}
        task={t('survey.tasks.selectRating')}
      />

      {/* Render the rating questions */}
      {renderRatingQuestions(ratingQuestions, values, handleChange, errors)}
    </div>
  );
};

export default GameRatingBlock;
