//frontend /components/modals/DeletePopup.tsx
import React from 'react';
import '../../styles/deletePopup.css'; // CSS for Popup component
import { useTranslation } from 'react-i18next';

interface PopupProps {

  onConfirm: () => void;
  onCancel: () => void;
}

const Popup: React.FC<PopupProps> = ({ onConfirm, onCancel }) => {
    const { t } = useTranslation();
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>{t('survey.popup.deleteTitle')}</h3>
        <p>{t('survey.popup.deleteMessage')}</p>
        <div className="popup-actions">
          <button onClick={onConfirm} className="btn btn-primary">
            {t('survey.popup.deleteConfirm')} {/* Button text should come from the translated strings */}
          </button>
          <button onClick={onCancel} className="btn btn-secondary">
            {t('survey.popup.deleteCancel')} {/* Button text should come from the translated strings */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
