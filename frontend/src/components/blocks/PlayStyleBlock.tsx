import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  playStyle: string[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | string[]; //Allow string array or string
}

const PlayStyleBlock: React.FC<Props> = ({ playStyle, handleChange, error }) => {
  const { t } = useTranslation();

  return (
    <div className="block form-group">
      <label className="survey-block-category">{t('survey.questions.playStyle')}</label>
      
      <div>
        <input
          type="checkbox"
          name="playStyle"
          id="shortGames"
          value="shortGames"
          onChange={handleChange}
          checked={playStyle.includes('shortGames')}
          className="survey-checkbox"
        />
        <label htmlFor="shortGames">{t('survey.options.playStyle.shortGames')}</label>
      </div>

      <div>
        <input
          type="checkbox"
          name="playStyle"
          id="longGames"
          value="longGames"
          onChange={handleChange}
          checked={playStyle.includes('longGames')}
          className="survey-checkbox"
        />
        <label htmlFor="longGames">{t('survey.options.playStyle.longGames')}</label>
      </div>

      <div>
        <input
          type="checkbox"
          name="playStyle"
          id="simpleGames"
          value="simpleGames"
          onChange={handleChange}
          checked={playStyle.includes('simpleGames')}
          className="survey-checkbox"
        />
        <label htmlFor="simpleGames">{t('survey.options.playStyle.simpleGames')}</label>
      </div>

      <div>
        <input
          type="checkbox"
          name="playStyle"
          id="complexGames"
          value="complexGames"
          onChange={handleChange}
          checked={playStyle.includes('complexGames')}
          className="survey-checkbox"
        />
        <label htmlFor="complexGames">{t('survey.options.playStyle.complexGames')}</label>
      </div>

      <div>
        <input
          type="checkbox"
          name="playStyle"
          id="familyGames"
          value="familyGames"
          onChange={handleChange}
          checked={playStyle.includes('familyGames')}
          className="survey-checkbox"
        />
        <label htmlFor="familyGames">{t('survey.options.playStyle.familyGames')}</label>
      </div>

      <div>
        <input
          type="checkbox"
          name="playStyle"
          id="ConnoisseurGame"
          value="ConnoisseurGame"
          onChange={handleChange}
          checked={playStyle.includes('ConnoisseurGame')}
          className="survey-checkbox"
        />
        <label htmlFor="ConnoisseurGame">{t('survey.options.playStyle.ConnoisseurGame')}</label>
      </div>

      <div>
        <input
          type="checkbox"
          name="playStyle"
          id="expertGames"
          value="expertGames"
          onChange={handleChange}
          checked={playStyle.includes('expertGames')}
          className="survey-checkbox"
        />
        <label htmlFor="expertGames">{t('survey.options.playStyle.expertGames')}</label>
      </div>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default PlayStyleBlock;
