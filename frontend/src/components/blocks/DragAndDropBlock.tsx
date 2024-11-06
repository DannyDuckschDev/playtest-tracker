// frontend/src/components/blocks/DragAndDropBlock.tsx
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { FormikProps } from 'formik';
import DemographicsBlock from './DemographicBlock';
import PlayFrequencyBlock from './PlayFrequencyBlock';
import PlayStyleBlock from './PlayStyleBlock';
import FirstTimeBlock from './FirstTimeBlock';
import OverallImpressionBlock from './OverallImpressionBlock';
import GameRatingBlock from './GameRatingBlock';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeletePopup from '../modals/DeletePopup';
import '../../styles/dragAndDrop.css';
import { useTranslation } from 'react-i18next';

interface Block {
  id: string;
  content: string;
}

interface FormValues {
  name: string;
  age: string;
  gender: string;
  frequency: string;
  playStyle: string[];
  firstTime: string;
  overallRating: number;
  strategic: number;
  luckFactor: number;
  funFactor: number;
  replayValue: number;
  excitement: number;
  uniqueness: number;
  clarity: number;
  category: string;
  question: string;
  task: string;
}

interface DragAndDropBlockProps {
  blocks: Block[];
  onBlocksChange: (blocks: Block[]) => void;
  formik: FormikProps<FormValues>;
}

const DragAndDropBlock: React.FC<DragAndDropBlockProps> = ({ blocks, onBlocksChange, formik }) => {
  const { t } = useTranslation();

  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [blockToDelete, setBlockToDelete] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({}); // State to track edit mode per block

  //Toggle edit mode for a specific block
  const toggleEditMode = (blockId: string) => {
    setEditMode((prev) => ({ ...prev, [blockId]: !prev[blockId] }));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedBlocks = Array.from(blocks);
    const [removed] = reorderedBlocks.splice(result.source.index, 1);
    reorderedBlocks.splice(result.destination.index, 0, removed);
    onBlocksChange(reorderedBlocks);
  };

  const handleDeleteClick = (blockId: string) => {
    setBlockToDelete(blockId);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    if (blockToDelete) {
      const updatedBlocks = blocks.filter((b) => b.id !== blockToDelete);
      onBlocksChange(updatedBlocks);
    }
    setShowDeletePopup(false);
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setBlockToDelete(null);
  };



  const renderBlockContent = (blockId: string) => {
    if (editMode[blockId]) {
      // Render the edit form for the block in edit mode
      return (
        <form onSubmit={formik.handleSubmit}>
          {/*Editale input for Category*/}
          <div className='form-group'>
            <label htmlFor="category">{t('survey.popup.editCategory')}</label>
            <input 
              id='category'
              name='category'
              type="text"
              value={formik.values.category}
              onChange={formik.handleChange}
              placeholder={formik.values.category}
            />
          </div>

          {/*Editable input for Question */}
          <div className='form-group'>
            <label htmlFor="question">{t('survey.popup.editQuestion')}</label>
            <input 
              id='question'
              name='question'
              type="text" 
              value={formik.values.question}
              onChange={formik.handleChange}
              placeholder={formik.values.question}
            />
          </div>

          {/*Editable input for Task*/}
          <div className='form-group'>
            <label htmlFor="task">{t('survey.popup.editTask')}</label>
            <textarea 
              name="task"
              id="task"
              value={formik.values.task}
              onChange={formik.handleChange}
              placeholder={formik.values.task}
            ></textarea>
          </div>
          {/*Save- and Delete Button in edit modus*/}
          <div className="edit-actions">
            <button type="submit" className="btn btn-primary">
              {t('survey.popup.save')}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => toggleEditMode(blockId)}
            >
              {t('survey.popup.cancel')}
            </button>
          </div>

        </form>
      );
    }
    switch (blockId) {
      case '1':
        return (
          <DemographicsBlock
            name={formik.values.name}
            age={formik.values.age}
            gender={formik.values.gender}
            handleChange={formik.handleChange}
            error={{
              name: formik.errors.name,
              age: formik.errors.age,
              gender: formik.errors.gender,
            }}
          />
        );
      case '2':
        return (
          <PlayFrequencyBlock
            frequency={formik.values.frequency}
            handleChange={formik.handleChange}
            error={formik.errors.frequency}
          />
        );
      case '3':
        return (
          <PlayStyleBlock
            playStyle={formik.values.playStyle}
            handleChange={formik.handleChange}
            error={formik.errors.playStyle}
          />
        );
      case '4':
        return (
          <FirstTimeBlock
            firstTime={formik.values.firstTime}
            handleChange={formik.handleChange}
            error={formik.errors.firstTime}
          />
        );
      case '5':
        return (
          <OverallImpressionBlock
            rating={formik.values.overallRating}
            handleChange={formik.handleChange}
            error={formik.errors.overallRating}
          />
        );
      case '6':
        return (
          <GameRatingBlock
            values={{
              strategic: formik.values.strategic,
              luckFactor: formik.values.luckFactor,
              funFactor: formik.values.funFactor,
              replayValue: formik.values.replayValue,
              excitement: formik.values.excitement,
              uniqueness: formik.values.uniqueness,
              clarity: formik.values.clarity,
            }}
            setFieldValue={formik.setFieldValue}
            errors={{
              strategic: formik.errors.strategic,
              luckFactor: formik.errors.luckFactor,
              funFactor: formik.errors.funFactor,
              replayValue: formik.errors.replayValue,
              excitement: formik.errors.excitement,
              uniqueness: formik.errors.uniqueness,
              clarity: formik.errors.clarity,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable-blocks">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="drag-container">
              {blocks.map((block, index) => (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`survey-block ${snapshot.isDragging ? 'dragging' : ''}`}
                    >
                      {/* Edit button */}
                      <button
                        className="btn btn-sm edit-btn"
                        onClick={() => toggleEditMode(block.id)}
                        title={t('survey.popup.editMode')}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      {/* X icon button in the top right */}
                      <button
                        className="btn btn-danger btn-sm delete-btn"
                        onClick={() => handleDeleteClick(block.id)}
                        title={t('survey.popup.deleteTooltip')}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>

                      {/* Render the block content based on its ID */}
                      {renderBlockContent(block.id)}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Render DeletePopup only when the popup is triggered */}
      {showDeletePopup && (
        <DeletePopup
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default DragAndDropBlock;
