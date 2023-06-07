import { Box } from "@mui/material";
import { Card, Tag, Typography } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import style from "./style.module.css";
import { ClockCircleOutlined } from "@ant-design/icons";

const TaskCardKanban = ({ provided, item }) => {
  return (
    <>
      <Card
        {...provided?.draggableProps}
        {...provided?.dragHandleProps}
        ref={provided?.innerRef}
        bodyStyle={{
          padding: "1rem",
        }}
        cover={
          item?.coverImage ? (
            item?.coverImage?.length === 7 ? (
              <div
                style={{
                  background: item?.coverImage,
                  width: "100%",
                  height: "100px",
                  borderRadius: "8px 8px 0 0",
                }}
              />
            ) : (
              <img alt="example" src={item?.coverImage} />
            )
          ) : null
        }
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <Typography>{item?.label}</Typography>
          {item?.labelsList?.length > 0 && (
            <Box>
              {item?.labelsList.map((label, index) => {
                return (
                  <Tag
                    color="blue"
                    key={index}
                    style={{
                      margin: "0 0.4rem 0.4rem 0",
                    }}
                  >
                    {label}
                  </Tag>
                );
              })}
            </Box>
          )}

          {item?.dates && (
            <Box className={style.taskcard_box_btn}>
              <Typography fontSize={"0.9rem"} color={"#172b4d"}>
                <ClockCircleOutlined style={{ marginRight: "0.5rem" }} />{" "}
                {item?.dates[0].toString().slice(0, 10)}
              </Typography>
            </Box>
          )}
          {item?.attachmentUrl?.length > 0 && (
            <Box className={style.taskcard_box_btn}>
              <Typography fontSize={"0.9rem"} color={"#172b4d"}>
                <NavLink
                  to={item?.attachmentUrl}
                  target="_blank"
                  style={{ color: "inherit" }}
                >
                  Go to Attachment
                </NavLink>
              </Typography>
            </Box>
          )}
        </Box>
      </Card>
    </>
  );
};

export default TaskCardKanban;
