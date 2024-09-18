import React from 'react';
import { useTranslation } from 'react-i18next';
import BlockHeader from '../common/BlockHeader';

// Define the expected Props interface
interface Props {
  playStyle: string[]; // Expecting an array of selected play styles
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Event handler for checkbox changes
  error?: string | string[]; // Optional error message
}

const PlayStyleBlock: React.FC<Props> = ({ playStyle, handleChange, error }) => {
  const { t } = useTranslation();

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
          onChange={handleChange} // Formik handleChange function
          checked={playStyle.includes('shortGames')} // Check if 'shortGames' is selected
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
          onChange={handleChange}
          checked={playStyle.includes('longGames')}
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
          onChange={handleChange}
          checked={playStyle.includes('simpleGames')}
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
          onChange={handleChange}
          checked={playStyle.includes('complexGames')}
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
          onChange={handleChange}
          checked={playStyle.includes('familyGames')}
        />
        <label htmlFor="familyGames">{t('survey.options.playStyle.familyGames')}</label>
      </div>

      {/* Checkbox for 'Connoisseur Games' */}
      <div className="survey-checkbox">
        <input
          type="checkbox"
          name="playStyle"
          id="connoisseurGames"
          value="connoisseurGames"
          onChange={handleChange}
          checked={playStyle.includes('connoisseurGames')}
        />
        <label htmlFor="connoisseurGames">{t('survey.options.playStyle.connoisseurGames')}</label>
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
        <label htmlFor="expertGames">{t('survey.options.playStyle.expertGames')}</label>
      </div>

      {/* Display error message if validation fails */}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default PlayStyleBlock;
