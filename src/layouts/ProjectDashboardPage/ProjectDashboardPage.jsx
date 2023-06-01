import { Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import { useState } from "react";

const Card = ({ id, title }) => {
  return (
    <div
      style={{
        background: "cyan",
        margin: "1rem",
        cursor: "pointer",
        padding: "1rem",
      }}
    >
      <h3>{title}</h3>
    </div>
  );
};

const Column = ({ title, cards, columnId }) => {
  return (
    <div>
      <h2>{title}</h2>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              background: "red",
              padding: "1rem",
            }}
          >
            {cards.map((card, index) => {
              console.log(card.id);
              return (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided) => (
                    <div
                      key={card.id}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => console.log("hii")}
                    >
                      <Card title={card.title} />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

const ProjectDashboardPage = () => {
  const [columns, setColumns] = useState({
    todo: {
      id: "todo",
      title: "Todo",
      cards: [
        { id: "1", title: "Task 1" },
        { id: "2", title: "Task 2" },
      ],
    },
    inProgress: {
      id: "inProgress",
      title: "In Progress",
      cards: [
        { id: "3", title: "Task 3" },
        { id: "4", title: "Task 4" },
      ],
    },
    done: {
      id: "done",
      title: "Done",
      cards: [
        { id: "5", title: "Task 5" },
        { id: "6", title: "Task 6" },
      ],
    },
  });

  const handleDragEnd = (result) => {
    console.log(result);
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const startColumn = columns[source.droppableId];
    const endColumn = columns[destination.droppableId];

    const startCards = Array.from(startColumn.cards);
    const endCards = Array.from(endColumn.cards);

    const [draggedCard] = startCards.splice(source.index, 1);
    endCards.splice(destination.index, 0, draggedCard);

    const updatedColumns = {
      ...columns,
      [source.droppableId]: {
        ...startColumn,
        cards: startCards,
      },
      [destination.droppableId]: {
        ...endColumn,
        cards: endCards,
      },
    };

    setColumns(updatedColumns);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "10rem" }}>
        {Object.values(columns).map((column) => (
          <Column
            key={column.id}
            title={column.title}
            cards={column.cards}
            columnId={column.id}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default ProjectDashboardPage;
