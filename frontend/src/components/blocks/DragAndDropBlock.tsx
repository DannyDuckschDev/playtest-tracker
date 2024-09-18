// frontend/scr/components/blocks/DragAndDrop.tsx
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { FormikProps } from 'formik'; // Formik type to manage form props
import DemographicsBlock from './DemographicBlock';
import PlayFrequencyBlock from './PlayFrequencyBlock';
import PlayStyleBlock from './PlayStyleBlock';
import FirstTimeBlock from './FirstTimeBlock';
import OverallImpressionBlock from './OverallImpressionBlock';
import GameRatingBlock from './GameRatingBlock';

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

// Handle the drag end event: reordering the blocks based on user interaction
const DragAndDropBlock: React.FC<DragAndDropBlockProps> = ({ blocks, onBlocksChange, formik }) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
        // If no destination exists, exit early (user dropped outside the droppable area)
      return;
    }

    // Create a copy of the blocks array and reorder based on the drag result    
    const reorderedBlocks = Array.from(blocks);
    const [removed] = reorderedBlocks.splice(result.source.index, 1);
    reorderedBlocks.splice(result.destination.index, 0, removed);

    // Update the blocks with the new order
    onBlocksChange(reorderedBlocks);
  };

  // Renders the content for each block based on the block ID
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
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable-blocks">
        {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="drag-container">
            {/* Render each block as draggable */}
            {blocks.map((block, index) => {
                //console.log("Rendering block with ID:", block.id, "at index:", index);  // Debugging des Blocks
                return (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                    {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`survey-block ${snapshot.isDragging ? 'dragging' : ''}`}
                    >
                        {/* Render the block content based on its ID */}
                        {renderBlockContent(block.id)}

                        {/* Delete button to remove a block */}
                        <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                            const newBlocks = blocks.filter((b) => b.id !== block.id);
                            onBlocksChange(newBlocks);
                        }}
                        >
                        {`delete`}
                        </button>
                    </div>
                    )}
                </Draggable>
                );
            })}
            {/* Placeholder to maintain space while dragging */}
            {provided.placeholder}
            </div>
        )}
        </Droppable>

    </DragDropContext>
  );
};

export default DragAndDropBlock;
