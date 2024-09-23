// frontend/src/components/blocks/DragAndDropBlock.tsx
import React, { useState } from 'react'; // Import useState to handle popup state
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { FormikProps } from 'formik';
import DemographicsBlock from './DemographicBlock';
import PlayFrequencyBlock from './PlayFrequencyBlock';
import PlayStyleBlock from './PlayStyleBlock';
import FirstTimeBlock from './FirstTimeBlock';
import OverallImpressionBlock from './OverallImpressionBlock';
import GameRatingBlock from './GameRatingBlock';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeletePopup from '../modals/DeletePopup'; // Import the DeletePopup component
import '../../styles/dragAndDrop.css'

// Define the Block interface to represent each draggable block
interface Block {
  id: string;
  content: string;
}

// Define the form values structure that Formik will manage
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
}

// Props expected by the DragAndDropBlock component
interface DragAndDropBlockProps {
  blocks: Block[]; // Array of blocks to be dragged and dropped
  onBlocksChange: (blocks: Block[]) => void; // Function to handle the new block order after dragging
  formik: FormikProps<FormValues>; // Formik instance for form state and validation
}

const DragAndDropBlock: React.FC<DragAndDropBlockProps> = ({ blocks, onBlocksChange, formik }) => {
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false); // Popup state
  const [blockToDelete, setBlockToDelete] = useState<string | null>(null); // Block to delete

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const reorderedBlocks = Array.from(blocks);
    const [removed] = reorderedBlocks.splice(result.source.index, 1);
    reorderedBlocks.splice(result.destination.index, 0, removed);
    onBlocksChange(reorderedBlocks);
  };

  const handleDeleteClick = (blockId: string) => {
    setBlockToDelete(blockId);
    setShowDeletePopup(true); // Show the popup
  };

  const handleConfirmDelete = () => {
    if (blockToDelete) {
      const updatedBlocks = blocks.filter((b) => b.id !== blockToDelete);
      onBlocksChange(updatedBlocks);
    }
    setShowDeletePopup(false); // Close the popup
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false); // Close the popup without deleting
    setBlockToDelete(null);
  };

  const renderBlockContent = (blockId: string) => {
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
                      {/* X icon button in the top right */}
                      <button
                        className="delete-btn btn btn-danger btn-sm"
                        onClick={() => handleDeleteClick(block.id)}
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
