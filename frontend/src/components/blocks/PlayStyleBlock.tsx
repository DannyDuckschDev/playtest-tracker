//frontend/src/components/blocks/PlayStyleBlock.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  playStyle: string[]; // Array of selected play styles
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Event handler for checkbox changes
  error?: string | string[]; // Optional error message, either a single string or an array of strings
}

const PlayStyleBlock: React.FC<Props> = ({ playStyle, handleChange, error }) => {
  const { t } = useTranslation(); // Hook for translation/localization

  return (
    <div className="block form-group">
      {/* Category label */}
      <label className="survey-block-category">{t('survey.questions.playStyle')}</label>
      
      {/* Checkbox for 'Short Games' */}
      <div className="survey-checkbox">
        <input
          type="checkbox"
          name="playStyle"
          id="shortGames"
          value="shortGames"
          onChange={handleChange} // Trigger handleChange when the checkbox value changes
          checked={playStyle.includes('shortGames')} // Check if 'shortGames' is in the playStyle array
        />
        <label htmlFor="shortGames">{t('survey.options.playStyle.shortGames')}</label> {/* Label for 'Short Games' */}
      </div>

      {/* Checkbox for 'Long Games' */}
      <div className="survey-checkbox">
        <input
          type="checkbox"
          name="playStyle"
          id="longGames"
          value="longGames"
          onChange={handleChange}
          checked={playStyle.includes('longGames')}
        />
        <label htmlFor="longGames">{t('survey.options.playStyle.longGames')}</label> {/* Label for 'Long Games' */}
      </div>

      {/* Checkbox for 'Simple Games' */}
      <div className="survey-checkbox">
        <input
          type="checkbox"
          name="playStyle"
          id="simpleGames"
          value="simpleGames"
          onChange={handleChange}
          checked={playStyle.includes('simpleGames')}
        />
        <label htmlFor="simpleGames">{t('survey.options.playStyle.simpleGames')}</label> {/* Label for 'Simple Games' */}
      </div>

      {/* Checkbox for 'Complex Games' */}
      <div className="survey-checkbox">
        <input
          type="checkbox"
          name="playStyle"
          id="complexGames"
          value="complexGames"
          onChange={handleChange}
          checked={playStyle.includes('complexGames')}
        />
        <label htmlFor="complexGames">{t('survey.options.playStyle.complexGames')}</label> {/* Label for 'Complex Games' */}
      </div>

      {/* Checkbox for 'Family Games' */}
      <div className="survey-checkbox">
        <input
          type="checkbox"
          name="playStyle"
          id="familyGames"
          value="familyGames"
          onChange={handleChange}
          checked={playStyle.includes('familyGames')}
        />
        <label htmlFor="familyGames">{t('survey.options.playStyle.familyGames')}</label> {/* Label for 'Family Games' */}
      </div>

      {/* Checkbox for 'Connoisseur Game' */}
      <div className="survey-checkbox">
        <input
          type="checkbox"
          name="playStyle"
          id="ConnoisseurGame"
          value="ConnoisseurGame"
          onChange={handleChange}
          checked={playStyle.includes('ConnoisseurGame')}
        />
        <label htmlFor="ConnoisseurGame">{t('survey.options.playStyle.ConnoisseurGame')}</label> {/* Label for 'Connoisseur Game' */}
      </div>

      {/* Checkbox for 'Expert Games' */}
      <div className="survey-checkbox">
        <input
          type="checkbox"
          name="playStyle"
          id="expertGames"
          value="expertGames"
          onChange={handleChange}
          checked={playStyle.includes('expertGames')}
        />
        <label htmlFor="expertGames">{t('survey.options.playStyle.expertGames')}</label> {/* Label for 'Expert Games' */}
      </div>

      {/* Display error message if present */}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default PlayStyleBlock;
