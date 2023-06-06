import { Box, Typography } from "@mui/material";
import { Col, Row, Tag } from "antd";
import React from "react";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import TextEditor from "./TaskComponents/TextEditor";
import { useContext } from "react";
import { TaskContext } from "./TaskDashboardPage";
import { NavLink } from "react-router-dom";
import style from "./style.module.css";

const TaskMainSec = () => {
  const { taskDetails, setTaskDetails } = useContext(TaskContext);
  return (
    <>
      <Box>
        <Row gutter={[48, 16]}>
          {taskDetails.coverImage.length > 0 && (
            <Col>
              <Typography
                variant="subtitle1"
                fontWeight={500}
                sx={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  mb: 1,
                }}
                color="#172b4d"
              >
                <MenuUnfoldOutlined /> Cover Image
              </Typography>
              <Box
                sx={{
                  width: "250px",
                  height: "150px",
                  borderRadius: "5px",
                }}
              >
                {taskDetails.coverImage.length !== 7 ? (
                  <img
                    src={taskDetails.coverImage}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "5px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: taskDetails.coverImage,
                      borderRadius: "5px",
                    }}
                  ></div>
                )}
              </Box>
            </Col>
          )}
          {taskDetails.labelsList.length > 0 && (
            <Col>
              <Typography
                variant="subtitle1"
                fontWeight={500}
                sx={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  mb: 1,
                }}
                color="#172b4d"
              >
                <MenuUnfoldOutlined /> Labels
              </Typography>
              <Box
                sx={{
                  maxWidth: "200px",
                }}
              >
                {taskDetails.labelsList.map((label) => {
                  return <Tag color="blue">{label}</Tag>;
                })}
              </Box>
            </Col>
          )}
          {taskDetails.dates && (
            <Col>
              <Typography
                variant="subtitle1"
                fontWeight={500}
                sx={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  mb: 1,
                }}
                color="#172b4d"
              >
                <MenuUnfoldOutlined /> Dates
              </Typography>
              <Box
                sx={{
                  width: "300px",
                }}
              >
                <Typography variant="subtitle1">
                  Start Date: {taskDetails.dates[0].toString().slice(0, 16)}
                </Typography>
                <Typography variant="subtitle1">
                  End Date: {taskDetails.dates[1].toString().slice(0, 16)}
                </Typography>
              </Box>
            </Col>
          )}

          {taskDetails.attachmentUrl.length > 0 && (
            <Col>
              <Typography
                variant="subtitle1"
                fontWeight={500}
                sx={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  mb: 1,
                }}
                color="#172b4d"
              >
                <MenuUnfoldOutlined /> Attachment
              </Typography>
              <Box className={style.taskSidebar_box_btn}>
                <Typography fontSize={"0.9rem"} color={"#172b4d"}>
                  <NavLink
                    to={taskDetails.attachmentUrl}
                    target="_blank"
                    style={{ color: "inherit" }}
                  >
                    Go to Attachment
                  </NavLink>
                </Typography>
              </Box>
            </Col>
          )}

          {/* <Col xs={24} md={12} xxl={8}>
            <h3>Date</h3>
          </Col>
          <Col xs={24} md={12} xxl={8}>
            <h3>Attachment</h3>
          </Col>
          <Col xs={24}>
            <h3>Checklists</h3>
          </Col> */}
          <Col
            xs={24}
            style={{
              width: "80%",
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={500}
              sx={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                mb: 1,
              }}
              color="#172b4d"
            >
              <MenuUnfoldOutlined /> Description
            </Typography>
            <TextEditor />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default TaskMainSec;
