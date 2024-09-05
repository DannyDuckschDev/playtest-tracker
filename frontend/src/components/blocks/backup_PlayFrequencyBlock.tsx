//backup PlayFrequencyBlock.tsx
// frontend/src/components/blocks/PlayFrequencyBlock.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  frequency: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const PlayFrequencyBlock: React.FC<Props> = ({ frequency, handleChange, error }) => {
  const { t } = useTranslation();

  return (
    <div className="block form-group">
      <label>{t('survey.questions.frequency')}</label>
      <select name="frequency" value={frequency} onChange={handleChange} className="form-control">
        <option value="">{t('survey.options.frequency.select')}</option> {/* Auswahlfeld */}
        <option value="often">{t('survey.options.frequency.often')}</option> {/* Zugriff auf 'frequency' */}
        <option value="weekly">{t('survey.options.frequency.weekly')}</option>
        <option value="monthly">{t('survey.options.frequency.monthly')}</option>
        <option value="multipleMonthly">{t('survey.options.frequency.multipleMonthly')}</option>
        <option value="everyFewMonths">{t('survey.options.frequency.everyFewMonths')}</option>
      </select>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default PlayFrequencyBlock;
