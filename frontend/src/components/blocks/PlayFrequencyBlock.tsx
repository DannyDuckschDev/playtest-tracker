import React from 'react';
import { useTranslation } from 'react-i18next';
import BlockHeader from '../common/BlockHeader';

// Define the expected Props interface
interface Props {
  frequency: string; // Expecting a string for the selected frequency
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Event handler for select changes
  error?: string; // Optional error message
}

const PlayFrequencyBlock: React.FC<Props> = ({ frequency, handleChange, error }) => {
  const { t } = useTranslation();

  return (
    <div className="block form-group">
      {/* BlockHeader with category, question, and task */}
      <BlockHeader
        category="survey.categories.gameplay"
        question="survey.questions.frequency"
        task="survey.tasks.selectFrequency"
      />

      {/* Select input for frequency */}
      <select
        name="frequency"
        value={frequency} // Formik value
        onChange={handleChange} // Formik handleChange function
        className="form-control"
      >
        <option value="">{t('survey.options.frequency.select')}</option>
        <option value="often">{t('survey.options.frequency.often')}</option>
        <option value="weekly">{t('survey.options.frequency.weekly')}</option>
        <option value="monthly">{t('survey.options.frequency.monthly')}</option>
        <option value="multipleMonthly">{t('survey.options.frequency.multipleMonthly')}</option>
        <option value="everyFewMonths">{t('survey.options.frequency.everyFewMonths')}</option>
      </select>

      {/* Display error message if validation fails */}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default PlayFrequencyBlock;
