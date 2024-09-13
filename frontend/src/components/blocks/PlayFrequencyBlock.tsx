import React from 'react';
import { useTranslation } from 'react-i18next';
import BlockHeader from '../common/BlockHeader';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const PlayFrequencyBlock: React.FC = () => {
  const { t } = useTranslation();

  // Define Yup validation schema
  const validationSchema = Yup.object({
    frequency: Yup.string()
      .required(t('survey.validation.frequencyRequired')) // Required validation message
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      frequency: '', // Default value for frequency
    },
    validationSchema, // Attach the Yup validation schema
    onSubmit: (values) => {
      console.log('Form submitted:', values); // Action on form submission (can be replaced by API call or other logic)
    },
  });

  return (
    <div className="block form-group">
      {/* BlockHeader with category, question, and task */}
      <BlockHeader
        category="survey.categories.gameplay"
        question="survey.questions.frequency"
        task="survey.tasks.selectFrequency" 
      />

      {/* Formik's select input */}
      <select
        name="frequency"
        value={formik.values.frequency}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur} // Ensure blur is handled for validation
        className="form-control"
      >
        <option value="">{t('survey.options.frequency.select')}</option>
        <option value="often">{t('survey.options.frequency.often')}</option>
        <option value="weekly">{t('survey.options.frequency.weekly')}</option>
        <option value="monthly">{t('survey.options.frequency.monthly')}</option>
        <option value="multipleMonthly">{t('survey.options.frequency.multipleMonthly')}</option>
        <option value="everyFewMonths">{t('survey.options.frequency.everyFewMonths')}</option>
      </select>

      {/* Conditionally render error message if validation fails */}
      {formik.touched.frequency && formik.errors.frequency && (
        <p className="error-text">{formik.errors.frequency}</p>
      )}
    </div>
  );
};

export default PlayFrequencyBlock;
