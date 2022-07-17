import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export const Operation = ({ operation, index }) => {
  return (
    <Draggable draggableId={operation.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            style={{
              backgroundColor: snapshot.isDragging ? 'bisque' : 'beige',
              border: '1px solid black',
              padding: '8px',
            }}
          >
            {operation.title}
          </div>
        </div>
      )}
    </Draggable>
  );
};
