import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { Card, Input, Button, Tag } from "antd";
import { Box, Typography } from "@mui/material";
import style from "../style.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addBoardProject,
  addNewTaskProject,
  updateBoardPositions,
} from "../../../redux/projectsSlice/projectsSlice";
import DroppableList from "./BoardCard";

const boardColors = [
  {
    colorName: "default",
    backgroundColorName: "#00000005",
  },
  {
    colorName: "success",
    backgroundColorName: "#f6ffed",
  },
  {
    colorName: "processing",
    backgroundColorName: "#e6f4ff",
  },
  {
    colorName: "error",
    backgroundColorName: "#fff2f0",
  },
  {
    colorName: "warning",
    backgroundColorName: "#fffbe6",
  },
  {
    colorName: "magenta",
    backgroundColorName: "#fff0f6",
  },
  {
    colorName: "red",
    backgroundColorName: "#fff1f0",
  },
  {
    colorName: "volcano",
    backgroundColorName: "#fff2e8",
  },
  {
    colorName: "orange",
    backgroundColorName: "#fff7e6",
  },
  {
    colorName: "gold",
    backgroundColorName: "#fffbe6",
  },
  {
    colorName: "lime",
    backgroundColorName: "#fcffe6",
  },
  {
    colorName: "green",
    backgroundColorName: "#f6ffed",
  },
  {
    colorName: "cyan",
    backgroundColorName: "#e6fffb",
  },
  {
    colorName: "blue",
    backgroundColorName: "#e6f4ff",
  },
  {
    colorName: "geekblue",
    backgroundColorName: "#f0f5ff",
  },
  {
    colorName: "purple",
    backgroundColorName: "#f9f0ff",
  },
];

function LeadsOverview() {
  const [items, setItems] = useState([]);
  const [groups, setGroups] = useState({});
  const [addBoardOpened, setAddBoardOpend] = useState(false);
  const [currentBoardInput, setCurrentBoardInput] = useState("");
  const projects = useSelector((state) => state.projects.projects);
  const dispatch = useDispatch();
  const { id: projectId } = useParams();
  const [projectWithId] = projects?.filter(
    (project) => project.projectId === projectId
  );
  const newtasksMap = new Map();
  projectWithId.tasks.map((task) => {
    newtasksMap.set(task.id, task);
  });

  useEffect(() => {
    // Mock an API call. projectWithId.tasks ?? []
    buildAndSave(projectWithId.boards ?? []);
  }, [projectWithId]);

  function buildAndSave(boards) {
    const groups = {};
    // const items = [];
    for (let i = 0; i < Object.keys(boards).length; ++i) {
      const currentGroup = boards[i];
      groups[currentGroup.id] = i;

      //set key to value
      // const boardItemsWithValue = {
      //   ...boards[i],
      //   itemsList: boards[i].itemsList.map((key) => {
      //     return newtasksMap.get(key);
      //   }),
      // };
      // items.push(boardItemsWithValue);
    }
    // Set the data.
    setItems(boards);

    // Makes the groups searchable via their id.
    setGroups(groups);
  }

  const handleAddnewTask = (id, title) => {
    const newTask = {
      id: nanoid(),
      label: title.trim().length ? title : "Untitled",
    };
    const projectDetails = {
      projectId,
      boardId: id,
      newTask,
    };
    dispatch(addNewTaskProject(projectDetails));

    const newItems = items.map((item) => {
      if (item.id === id) {
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

  const handleAddnewBoard = (title) => {
    const newBoard = {
      id: nanoid(),
      label: title.trim().length ? title : "Untitled",
      itemsList: [],
      color: boardColors[0].colorName,
      bgcolor: boardColors[0].backgroundColorName,
    };
    const projectDetails = {
      projectId,
      newBoard,
    };
    dispatch(addBoardProject(projectDetails));
    setAddBoardOpend(false);
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
          const projectDetails = {
            projectId,
            boards: workValue,
          };
          dispatch(updateBoardPositions(projectDetails));
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
        const projectDetails = {
          projectId,
          boards: workValue,
        };
        dispatch(updateBoardPositions(projectDetails));
        console.log(workValue);
      }}
    >
      <Droppable
        droppableId="ROOT"
        type="group"
        direction="horizontal"
        ignoreContainerClipping={true}
      >
        {(provided, snapshot) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={style.boardview_box}
          >
            {addBoardOpened ? (
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
                  placeholder="Board Name"
                  className={style.board_column_add_input}
                  style={{
                    width: "200px",
                  }}
                  onChange={(e) => setCurrentBoardInput(e.target.value)}
                />
                <Box>
                  <Button
                    type="primary"
                    style={{ marginRight: "1rem" }}
                    onClick={() => handleAddnewBoard(currentBoardInput)}
                  >
                    Add
                  </Button>
                  <Button onClick={() => setAddBoardOpend(false)}>
                    Cancel
                  </Button>
                </Box>
              </Card>
            ) : (
              <Card
                bodyStyle={{
                  padding: "0.5rem 1rem",
                  minWidth: "260px",
                }}
                className={style.board_column_add_btn}
                onClick={() => setAddBoardOpend(true)}
              >
                + Add Board
              </Card>
            )}

            {items.map((item, index) => {
              return (
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
                        newtasksMap={newtasksMap}
                        handleAddnewTask={handleAddnewTask}
                      />
                    </Card>
                  )}
                </Draggable>
              );
            })}

            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
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
