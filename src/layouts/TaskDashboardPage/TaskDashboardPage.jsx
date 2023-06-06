import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button, Card, Col, Menu, Row } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import style from "./style.module.css";
import TaskSideBar from "./TaskSideBar";
import TaskMainSec from "./TaskMainSec";
import { createContext } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateTaskProject } from "../../redux/projectsSlice/projectsSlice";

export const TaskContext = createContext();

const TaskDashboardPage = () => {
  const navigate = useNavigate();
  const { tid: taskId } = useParams();
  const projects = useSelector((state) => state.projects.projects);
  const dispatch = useDispatch();
  const { pid: projectId } = useParams();
  const [projectWithId] = projects?.filter(
    (project) => project.projectId === projectId
  );
  const alltasks = projectWithId.tasks;
  const [taskWithId] = alltasks.filter((task) => task.id === taskId);

  const [taskDetails, setTaskDetails] = useState({
    coverImage: taskWithId.coverImage ?? "",
    labelsList: taskWithId.labelsList ?? [],
    checklists: taskWithId.checklists ?? [],
    dates: taskWithId.dates ?? null,
    attachmentUrl: taskWithId.attachmentUrl ?? "",
    allLabelsList: taskWithId.allLabelsList ?? [],
    imageFileList: taskWithId.imageFileList ?? [],
    description: taskWithId.description ?? "",
  });

  const handleSaveTask = () => {
    const updatedtask = {
      ...taskWithId,
      ...taskDetails,
    };
    const projectDetails = {
      projectId,
      taskId,
      updatedtask,
    };
    dispatch(updateTaskProject(projectDetails));
    navigate(`/projects/${projectId}`);
  };

  return (
    <>
      <div className={style.container}>
        <Card>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" className={style.project_title_heading}>
              {taskWithId.label}
            </Typography>
            <Box>
              {/* <Button style={{ marginRight: "0.4rem" }}>
                <EditOutlined />
              </Button> */}
              <Button>
                <DeleteOutlined />
              </Button>
            </Box>
          </Box>
        </Card>
        <Card className={style.background_container_card}>
          <TaskContext.Provider value={{ taskDetails, setTaskDetails }}>
            <Row gutter={[48, 16]}>
              <Col xs={24} md={18} xxl={20}>
                <TaskMainSec />
              </Col>
              <Col xs={24} md={6} xxl={4}>
                <TaskSideBar />
              </Col>
            </Row>
          </TaskContext.Provider>
          <Box>
            <Button
              type="primary"
              style={{ marginTop: "1rem" }}
              onClick={handleSaveTask}
            >
              Save
            </Button>
          </Box>
        </Card>
      </div>
    </>
  );
};

export default TaskDashboardPage;
