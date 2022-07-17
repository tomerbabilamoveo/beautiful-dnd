import { useState, useEffect } from 'react';
import './App.css';
import initialData from './data.json';
import { Room } from './Room';
import { DragDropContext } from 'react-beautiful-dnd';

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    setData(initialData);
    console.log(initialData);
  }, []);

  const onDragStart = (initial, provided) => {
    console.log('drag started');
  };

  const onDragUpdate = (initial, provided) => {
    console.log('drag updated');
  };

  // onDragEnd is a REQUIRED callback
  const onDragEnd = (result, provided) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.rooms.find((r) => r.id === source.droppableId);
    const finish = data.rooms.find((r) => r.id === destination.droppableId);

    // Check for dragging in the same row
    if (start === finish) {
      const newOperations = Array.from(start.operations);
      newOperations.splice(source.index, 1);
      newOperations.splice(destination.index, 0, draggableId);

      const newRoom = { ...start, operations: newOperations };
      const newRooms = data.rooms.map((r) =>
        r.id === newRoom.id ? newRoom : r
      );
      setData({ ...data, rooms: newRooms });
      console.log('drag ended');
      return;
    }

    // Check for dragging in different rows
    const startNewOperations = Array.from(start.operations);
  };

  return (
    <div className="App">
      <DragDropContext
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        {data.rooms &&
          data.rooms.map((room) => {
            const operations = room.operations.map((opId) => {
              return data.operations.find((op) => op.id === opId);
            });
            return <Room key={room.id} room={room} operations={operations} />;
          })}
      </DragDropContext>
    </div>
  );
}

export default App;
