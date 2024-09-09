// frontend/src/components/blocks/FirstTimeBlock.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import BlockHeader from '../common/BlockHeader';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Props {
  firstTime: string; // Holds the selected value ('yes' or 'no')
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Handles changes in radio buttons
  error?: string; // Optional error message
}

const FirstTimeBlock: React.FC<Props> = () => {
  const { t } = useTranslation();

  // Formik setup with Yup validation
  const formik = useFormik({
    initialValues: {
      firstTime: '', // Initially no value selected
    },
    validationSchema: Yup.object({
      firstTime: Yup.string()
        .required(t('survey.validation.firstTimeRequired')), // First time selection is required
    }),
    onSubmit: (values) => {
      console.log('First Time Selected:', values);
      // Handle form submission (e.g., API call)
    },
  });

  return (
    <div className="block form-group">
      {/* Block header for category, question, and task */}
      <BlockHeader
        category="survey.categories.gameplay"
        question="survey.questions.firstTime" // The question asks if it's the first time playing
        task="survey.tasks.selectFirstTime" // Instruction for task
      />

      {/* Radio buttons for 'Yes' or 'No' */}
      <div className="survey-radio">
        <label>
          <input
            type="radio"
            name="firstTime"
            value="yes"
            onChange={formik.handleChange} // Trigger Formik's change handler
            checked={formik.values.firstTime === 'yes'}
          />
          {t('survey.options.firstTime.yes')}
        </label>
      </div>

      <div className="survey-radio">
        <label>
          <input
            type="radio"
            name="firstTime"
            value="no"
            onChange={formik.handleChange}
            checked={formik.values.firstTime === 'no'}
          />
          {t('survey.options.firstTime.no')}
        </label>
      </div>

      {/* Error message */}
      {formik.errors.firstTime && <p className="error-text">{formik.errors.firstTime}</p>}
    </div>
  );
};

export default FirstTimeBlock;
