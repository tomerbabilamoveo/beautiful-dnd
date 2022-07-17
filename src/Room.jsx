import React, { useEffect } from 'react';
import { Operation } from './Operation';
import { Droppable } from 'react-beautiful-dnd';

export const Room = ({ room, operations }) => {
  useEffect(() => {
    // calc again
  }, [room, operations]);

  return (
    <div style={{ display: 'flex', margin: '8px' }}>
      <h3>{room.id}</h3>
      <Droppable droppableId={room.id} direction="horizontal">
        {(provided, snapshot) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: snapshot.isDraggingOver ? 'khaki' : 'lightgrey',
              padding: '8px',
              border: '1px solid black',
            }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {operations.map((op, index) => (
              <Operation index={index} key={op.id} operation={op}></Operation>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
