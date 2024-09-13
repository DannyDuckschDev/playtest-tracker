import React from 'react';
import { useTranslation } from 'react-i18next';
import BlockHeader from '../common/BlockHeader';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Define the shape of Formik values
interface FormValues {
  playStyle: string[];
}

const PlayStyleBlock: React.FC = () => {
  const { t } = useTranslation();

  // Yup validation schema to ensure at least one option is selected
  const validationSchema = Yup.object({
    playStyle: Yup.array().min(1, t('survey.validation.playStyleRequired')).required(),
  });

  // Formik setup
  const formik = useFormik<FormValues>({
    initialValues: {
      playStyle: [], // Empty array to store selected play styles
    },
    validationSchema, // Attach the Yup validation schema
    onSubmit: (values) => {
      console.log('Form submitted:', values); // Handle form submission logic (API call or other)
    },
  });

  // Function to handle checkbox changes in Formik
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const currentPlayStyles = formik.values.playStyle;
    if (currentPlayStyles.includes(value)) {
      // If the value is already in the array, remove it
      formik.setFieldValue('playStyle', currentPlayStyles.filter((style) => style !== value));
    } else {
      // If the value is not in the array, add it
      formik.setFieldValue('playStyle', [...currentPlayStyles, value]);
    }
  };

  return (
    <div className="block form-group">
      {/* BlockHeader with category, question, and task */}
      <BlockHeader
        category="survey.categories.gameplay"
        question="survey.questions.playStyle"
        task="survey.tasks.selectPlayStyle"
      />

      {/* Checkbox for 'Short Games' */}
      <div className="survey-checkbox">
        <input
          type="checkbox"
          name="playStyle"
          id="shortGames"
          value="shortGames"
          onChange={handleCheckboxChange} // Handle Formik checkbox change
          checked={formik.values.playStyle.includes('shortGames')} // Check if 'shortGames' is selected
        />
        <label htmlFor="shortGames">{t('survey.options.playStyle.shortGames')}</label>
      </div>

      {/* Checkbox for 'Long Games' */}
      <div className="survey-checkbox">
        <input
          type="checkbox"
          name="playStyle"
          id="longGames"
          value="longGames"
          onChange={handleCheckboxChange}
          checked={formik.values.playStyle.includes('longGames')}
        />
        <label htmlFor="longGames">{t('survey.options.playStyle.longGames')}</label>
      </div>

      {/* Checkbox for 'Simple Games' */}
      <div className="survey-checkbox">
        <input
          type="checkbox"
          name="playStyle"
          id="simpleGames"
          value="simpleGames"
          onChange={handleCheckboxChange}
          checked={formik.values.playStyle.includes('simpleGames')}
        />
        <label htmlFor="simpleGames">{t('survey.options.playStyle.simpleGames')}</label>
      </div>

      {/* Checkbox for 'Complex Games' */}
      <div className="survey-checkbox">
        <input
          type="checkbox"
          name="playStyle"
          id="complexGames"
          value="complexGames"
          onChange={handleCheckboxChange}
          checked={formik.values.playStyle.includes('complexGames')}
        />
        <label htmlFor="complexGames">{t('survey.options.playStyle.complexGames')}</label>
      </div>

      {/* Checkbox for 'Family Games' */}
      <div className="survey-checkbox">
        <input
          type="checkbox"
          name="playStyle"
          id="familyGames"
          value="familyGames"
          onChange={handleCheckboxChange}
          checked={formik.values.playStyle.includes('familyGames')}
        />
        <label htmlFor="familyGames">{t('survey.options.playStyle.familyGames')}</label>
      </div>

      {/* Checkbox for 'Connoisseur Game' */}
      <div className="survey-checkbox">
        <input
          type="checkbox"
          name="playStyle"
          id="ConnoisseurGame"
          value="ConnoisseurGame"
          onChange={handleCheckboxChange}
          checked={formik.values.playStyle.includes('ConnoisseurGame')}
        />
        <label htmlFor="ConnoisseurGame">{t('survey.options.playStyle.ConnoisseurGame')}</label>
      </div>

      {/* Checkbox for 'Expert Games' */}
      <div className="survey-checkbox">
        <input
          type="checkbox"
          name="playStyle"
          id="expertGames"
          value="expertGames"
          onChange={handleCheckboxChange}
          checked={formik.values.playStyle.includes('expertGames')}
        />
        <label htmlFor="expertGames">{t('survey.options.playStyle.expertGames')}</label>
      </div>

      {/* Display error message if validation fails */}
      {formik.touched.playStyle && formik.errors.playStyle && (
        <p className="error-text">{formik.errors.playStyle}</p>
      )}
    </div>
  );
};

export default PlayStyleBlock;
