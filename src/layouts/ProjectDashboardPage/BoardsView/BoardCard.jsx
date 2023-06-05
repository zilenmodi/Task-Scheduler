import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { Card, Input, Button, Tag, Popover } from "antd";
import { Box, Typography } from "@mui/material";
import style from "../style.module.css";
import { EllipsisOutlined } from "@ant-design/icons";
import MoreOptionsBoard from "./MoreOptionsBoard";
import { useNavigate } from "react-router-dom";

function DroppableList({
  id,
  itemsList,
  label,
  handleAddnewTask,
  color,
  bgcolor,
  newtasksMap,
}) {
  const navigate = useNavigate();
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              <Tag color={color}>{label}</Tag>
              <span
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 400,
                  color: "rgba(0,0,0,0.5)",
                }}
              >
                {itemsList.length}
              </span>
            </Typography>
            <Popover
              placement="rightTop"
              title={null}
              content={
                <MoreOptionsBoard id={id} label={label} itemsList={itemsList} />
              }
              trigger="click"
            >
              <EllipsisOutlined className={style.more_option_btn} />
            </Popover>
          </Box>
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
              {itemsList?.map((itemKey, index) => {
                const item = newtasksMap.get(itemKey);
                return (
                  <li
                    className={style.boardItem}
                    key={item?.id}
                    onClick={() => navigate(`/tasks/${item.id}`)}
                  >
                    <Draggable draggableId={item?.id} index={index}>
                      {(provided) => (
                        <Card
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          bodyStyle={{
                            padding: "1rem",
                          }}
                        >
                          {item?.label}
                        </Card>
                      )}
                    </Draggable>
                  </li>
                );
              })}

              {provided.placeholder}
            </ul>
          </div>
        </Box>
      )}
    </Droppable>
  );
}

export default DroppableList;
