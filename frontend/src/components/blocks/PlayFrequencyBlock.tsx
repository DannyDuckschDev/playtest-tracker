// frontend/src/components/blocks/PlayFrequencyBlock.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import BlockHeader from '../common/BlockHeader';

interface Props {
  frequency: string; // The selected frequency value
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Event handler for changes in select dropdown
  error?: string; // Optional error message
}

const PlayFrequencyBlock: React.FC<Props> = ({ frequency, handleChange, error }) => {
  const { t } = useTranslation(); // Hook for translation/localization

  return (
    <div className="block form-group">
      {/* BlockHeader with category, question, and task */}
      <BlockHeader
        category="survey.categories.gameplay"
        question="survey.questions.frequency"
        task="survey.tasks.selectFrequency" // Task instruction for the frequency question
      />

      {/* Dropdown select for play frequency */}
      <select
        name="frequency"
        value={frequency}
        onChange={handleChange}
        className="form-control"
      >
        <option value="">{t('survey.options.frequency.select')}</option>
        <option value="often">{t('survey.options.frequency.often')}</option>
        <option value="weekly">{t('survey.options.frequency.weekly')}</option>
        <option value="monthly">{t('survey.options.frequency.monthly')}</option>
        <option value="multipleMonthly">{t('survey.options.frequency.multipleMonthly')}</option>
        <option value="everyFewMonths">{t('survey.options.frequency.everyFewMonths')}</option>
      </select>

      {/* Conditionally render error message if present */}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default PlayFrequencyBlock;
