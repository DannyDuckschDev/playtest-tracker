// frontend/src/components/blocks/BlockHeader.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  category: string; // Translation key for category
  question: string; // Translation key for question
  task: string; // Translation key for task/instruction
}

const BlockHeader: React.FC<Props> = ({ category, question, task }) => {
  const { t } = useTranslation(); // Hook for translation

  return (
    <div>
      {/* Kategorie */}
      <div className="survey-block-category">
        {t(category)} {/* Display translated category */}
      </div>

      {/* Frage */}
      <div className="survey-block-question">
        {t(question)} {/* Display translated question */}
      </div>

      {/* Trennlinie */}
      <div className="survey-block-separator" />

      {/* Aufgabenstellung */}
      <p className="task-instruction">
        {t(task)} {/* Display translated task/instruction */}
      </p>
    </div>
  );
};

export default BlockHeader;
