// frontend/src/components/blocks/BlockHeader.tsx

/**
 * A reusable component that renders a localized header section
 * including category, question, and task/instruction text.
 * Uses react-i18next for internationalization.
 */


import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  category: string; // Translation key for category
  question: string; // Translation key for question
  task: string; // Translation key for task/instruction
}

const BlockHeader: React.FC<Props> = ({ category, question, task }) => {
  const { t } = useTranslation(); // i18n hook to access translations

  // Memoize translations to avoid recalculating on every render
  const translatedCategory = useMemo(() => t(category), [category, t]);
  const translatedQuestion = useMemo(() => t(question), [question, t]);
  const translatedTask = useMemo(() => t(task), [task, t]); 

  return (
    <div>
      {/* Display the translated category label */}
      <div className="survey-block-category">
        {translatedCategory}
      </div>

      {/* Display the translated main question */}
      <div className="survey-block-question">
        {translatedQuestion}
      </div>

      {/* Visual separator line  */}
      <div className="survey-block-separator" />

      {/* Display the translated task/instruction text */}
      <p className="task-instruction">
        {translatedTask}
      </p>
    </div>
  );
};

export default BlockHeader;
