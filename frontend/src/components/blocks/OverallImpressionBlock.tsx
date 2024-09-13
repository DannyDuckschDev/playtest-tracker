// frontend/src/components/blocks/OverallImpressionBlock.tsx
import React from 'react';
import { useTranslation } from 'react-i18next'; // i18n hook for translations
import { Star, StarFill } from 'react-bootstrap-icons'; // Bootstrap Icons for stars
import BlockHeader from '../common/BlockHeader'; // Reusable BlockHeader component
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Props {
  rating: number; // Current rating value (1-5)
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Event handler for rating change
  error?: string; // Optional error message for validation
}

const OverallImpressionBlock: React.FC<Props> = () => {
  const { t } = useTranslation();

  // Formik setup for form handling and validation
  const formik = useFormik({
    initialValues: {
      rating: 0, // Initial rating value is 0 (no rating selected)
    },
    validationSchema: Yup.object({
      rating: Yup.number()
        .min(1, t('survey.validation.overallImpressionRequired')) // Must choose at least 1 star
        .required(t('survey.validation.overallImpressionRequired')), // Validation message if no rating
    }),
    onSubmit: (values) => {
      console.log('Overall Impression Rating:', values.rating);
    },
  });

  return (
    <div className="block form-group">
      {/* BlockHeader to display category, question, and task */}
      <BlockHeader
        category="survey.categories.feedback" // Survey category 
        question="survey.questions.overallRating" // Survey question 
        task="survey.tasks.rateOverallImpression" // Task instruction 
      />

      {/* 5-star rating system */}
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((value) => (
          <label key={value} className="star">
            <input
              type="radio"
              name="rating"
              value={value}
              onChange={formik.handleChange} // Update Formik value on change
              checked={formik.values.rating === value} // Check if this star is selected
            />
            {/*Show filled or empfy star*/}
            {formik.values.rating >= value ? (
              <StarFill className='filled-star' />
            ) : (
              <Star className='empty-star' />
            )}
          </label>
        ))}
      </div>

      {/* Display error message if validation fails */}
      {formik.errors.rating && <p className="error-text">{formik.errors.rating}</p>}
    </div>
  );
};

export default OverallImpressionBlock;
