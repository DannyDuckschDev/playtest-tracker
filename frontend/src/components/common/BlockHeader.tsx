// frontend/src/components/blocks/BlockHeader.tsx
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  category: string; // Translation key for category
  question: string; // Translation key for question
  task: string; // Translation key for task/instruction
}

const BlockHeader: React.FC<Props> = ({ category, question, task }) => {
  const { t } = useTranslation(); // Hook for translation

  //Calculate translation one time when input change
  const translatedCategory = useMemo(() => t(category), [category, t]);
  const translatedQuestion = useMemo(() => t(question), [question, t]);
  const translatedTask = useMemo(() => t(task), [task, t]); 

  return (
    <div>
      {/* Kategorie */}
      <div className="survey-block-category">
        {translatedCategory} {/* Display translated category */}
      </div>

      {/* Frage */}
      <div className="survey-block-question">
        {translatedQuestion} {/* Display translated question */}
      </div>

      {/* Trennlinie */}
      <div className="survey-block-separator" />

      {/* Aufgabenstellung */}
      <p className="task-instruction">
        {translatedTask} {/* Display translated task/instruction */}
      </p>
    </div>
  );
};

export default BlockHeader;
