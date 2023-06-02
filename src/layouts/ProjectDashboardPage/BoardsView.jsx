import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import "./stylez.css";
import { Card, Input, Button, Tag } from "antd";
import { Box, Typography } from "@mui/material";
import style from "./style.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { nanoid } from "@reduxjs/toolkit";

const DATA = [
  {
    id: "af1",
    label: "To-Do",
    itemsList: [
      { id: "af2", label: "Item 1" },
      { id: "af3", label: "Item 2" },
    ],
    color: "blue",
    bgcolor: "#e6f4ff",
  },
  {
    id: "af4",
    label: "Running",
    itemsList: [
      { id: "af5", label: "Item 1" },
      { id: "af6", label: "Item 2" },
    ],
    color: "gold",
    bgcolor: "#fffbe6",
  },
  {
    id: "af7",
    label: "Finished",
    itemsList: [
      { id: "af8", label: "Item 1" },
      { id: "af9", label: "Item 2" },
    ],
    color: "green",
    bgcolor: "#f6ffed",
  },
];

function LeadsOverview() {
  const [items, setItems] = useState([]);
  const [groups, setGroups] = useState({});

  useEffect(() => {
    // Mock an API call.
    buildAndSave(DATA);
  }, []);

  function buildAndSave(items) {
    const groups = {};
    for (let i = 0; i < Object.keys(items).length; ++i) {
      const currentGroup = items[i];
      groups[currentGroup.id] = i;
    }

    // Set the data.
    setItems(items);

    // Makes the groups searchable via their id.
    setGroups(groups);
  }

  const handleAddnewTask = (id, title) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        console.log(item);
        return {
          ...item,
          itemsList: [
            ...item.itemsList,
            { id: nanoid(), label: title.trim().length ? title : "Untitled" },
          ],
        };
      }
      return item;
    });
    setItems(newItems);
  };

  return (
    <DragDropContext
      onDragEnd={(result) => {
        const { destination, draggableId, source, type } = result;

        if (!destination) {
          return;
        }

        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        ) {
          return;
        }

        if ("group" === type) {
          const sourceIndex = source.index;
          const targetIndex = destination.index;

          const workValue = items.slice();
          const [deletedItem] = workValue.splice(sourceIndex, 1);
          workValue.splice(targetIndex, 0, deletedItem);

          buildAndSave(workValue);

          return;
        }

        const sourceDroppableIndex = groups[source.droppableId];
        const targetDroppableIndex = groups[destination.droppableId];
        const sourceItems = items[sourceDroppableIndex].itemsList.slice();
        const targetItems =
          source.droppableId !== destination.droppableId
            ? items[targetDroppableIndex].itemsList.slice()
            : sourceItems;

        // Pull the item from the source.
        const [deletedItem] = sourceItems.splice(source.index, 1);
        targetItems.splice(destination.index, 0, deletedItem);

        const workValue = items.slice();
        workValue[sourceDroppableIndex] = {
          ...items[sourceDroppableIndex],
          itemsList: sourceItems,
        };
        workValue[targetDroppableIndex] = {
          ...items[targetDroppableIndex],
          itemsList: targetItems,
        };

        setItems(workValue);

        console.log(workValue);
      }}
    >
      <Droppable
        droppableId="ROOT"
        type="group"
        direction="horizontal"
        ignoreContainerClipping="true"
      >
        {(provided, snapshot) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{ display: "flex", gap: "1.6rem", m: 2, overflow: "auto" }}
          >
            <Card
              bodyStyle={{
                padding: "0.5rem 1rem",
                minWidth: "260px",
              }}
              className={style.board_column_add_btn}
            >
              + Add Board
            </Card>
            {items.map((item, index) => (
              <Draggable draggableId={item.id} key={item.id} index={index}>
                {(provided) => (
                  <Card
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    bodyStyle={{
                      padding: "0rem",
                    }}
                    className={style.board_columns}
                  >
                    <DroppableList
                      key={item.id}
                      {...item}
                      handleAddnewTask={handleAddnewTask}
                    />
                  </Card>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
}

function DroppableList({
  id,
  itemsList,
  label,
  handleAddnewTask,
  color,
  bgcolor,
}) {
  const [addTaskOpened, setAddTaskOpend] = useState(false);
  const [currentTaskInput, setCurrentTaskInput] = useState("");
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <Box
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            padding: "0.3rem",
            background: snapshot.isDraggingOver ? "#eee" : bgcolor,
          }}
        >
          <Typography variant="subtitle1" fontWeight={600} paddingBottom={2}>
            {/* {label} */}
            <Tag color={color}>{label}</Tag>
          </Typography>
          {addTaskOpened ? (
            <Card
              bodyStyle={{
                padding: "0.5rem 1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                gap: "1rem",
              }}
              className={style.board_column_add_input_box}
            >
              <Input
                autoFocus
                placeholder="Task Name"
                className={style.board_column_add_input}
                style={{
                  width: "200px",
                }}
                onChange={(e) => setCurrentTaskInput(e.target.value)}
              />
              <Box>
                <Button
                  type="primary"
                  style={{ marginRight: "1rem" }}
                  onClick={() => {
                    handleAddnewTask(id, currentTaskInput);
                    setAddTaskOpend(false);
                    setCurrentTaskInput("");
                  }}
                >
                  Add
                </Button>
                <Button onClick={() => setAddTaskOpend(false)}>Cancel</Button>
              </Box>
            </Card>
          ) : (
            <Card
              bodyStyle={{
                padding: "0.5rem 1rem",
              }}
              className={style.board_column_add_btn}
              onClick={() => setAddTaskOpend(true)}
            >
              + Add Task
            </Card>
          )}
          <div style={{ marginBottom: "0.5rem" }}>
            <ul className={style.boardItems}>
              {itemsList.map((item, index) => (
                <li className={style.boardItem} key={item.id}>
                  <Draggable draggableId={item.id} index={index}>
                    {(provided) => (
                      <Card
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        bodyStyle={{
                          padding: "1rem",
                        }}
                      >
                        {item.label}
                      </Card>
                    )}
                  </Draggable>
                </li>
              ))}

              {provided.placeholder}
            </ul>
          </div>
        </Box>
      )}
    </Droppable>
  );
}

const BoardsView = () => {
  return (
    <>
      <LeadsOverview />
    </>
  );
};

export default BoardsView;
