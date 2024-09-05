//frontend/src/component/blocks/PlayFrequencyBlock.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  frequency: string; // The selected frequency value
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Event handler for changes in select dropdown
  error?: string; // Optional error message
}

const PlayFrequencyBlock: React.FC<Props> = ({ frequency, handleChange, error }) => {
  const { t } = useTranslation(); // Hook for translation/localization

  return (
    <div className="block form-group">
      {/* Category label */}
      <label className="category">{t('survey.categories.gameplay')}</label>
      
      {/* Question text */}
      <p className="question">{t('survey.questions.frequency')}</p>
      
      {/* Horizontal separator line */}
      <hr />

      {/* Dropdown select for play frequency */}
      <select
        name="frequency" // Name attribute for form field
        value={frequency} // Controlled input value based on frequency prop
        onChange={handleChange} // Change event handler to update selected value
        className="form-control" // Styling class for the dropdown
      >
        {/* Dropdown options */}
        <option value="">{t('survey.options.frequency.select')}</option> {/* Default option prompting selection */}
        <option value="often">{t('survey.options.frequency.often')}</option> {/* Option for 'often' */}
        <option value="weekly">{t('survey.options.frequency.weekly')}</option> {/* Option for 'weekly' */}
        <option value="monthly">{t('survey.options.frequency.monthly')}</option> {/* Option for 'monthly' */}
        <option value="multipleMonthly">{t('survey.options.frequency.multipleMonthly')}</option> {/* Option for 'multiple times a month' */}
        <option value="everyFewMonths">{t('survey.options.frequency.everyFewMonths')}</option> {/* Option for 'every few months' */}
      </select>

      {/* Conditionally render error message if present */}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default PlayFrequencyBlock;
