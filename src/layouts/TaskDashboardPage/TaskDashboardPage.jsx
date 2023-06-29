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
import { useEffect } from "react";
import { getProjectFromDatabase } from "../../Helper/firebasedb";
import { useQuery } from "@tanstack/react-query";
import { useUpdateTasksMutation } from "../../Helper/tasksMutations";
import { Timestamp } from "firebase/firestore";

export const TaskContext = createContext();

const TaskDashboardPage = () => {
  const adminId = useSelector((state) => state.auth.userDetails.uid);
  const {
    data: projectsData,
    error,
    isLoading,
  } = useQuery(["projects"], () => getProjectFromDatabase(adminId));
  const navigate = useNavigate();
  const { tid: taskId, pid: projectId } = useParams();
  const dispatch = useDispatch();
  const [taskDetails, setTaskDetails] = useState();
  const updateTaskMutate = useUpdateTasksMutation(projectId);

  useEffect(() => {
    if (!isLoading) {
      const [projectWithId] = projectsData?.filter(
        (project) => project?.projectId === projectId
      );
      const alltasks = projectWithId?.tasks;
      const [taskWithId] = alltasks?.filter((task) => task.taskId === taskId);

      setTaskDetails({
        taskId: taskWithId?.taskId,
        label: taskWithId?.label,
        coverImage: taskWithId?.coverImage ?? "",
        labelsList: taskWithId?.labelsList ?? [],
        checklists: taskWithId?.checklists ?? [],
        dates: taskWithId?.dates ?? [],
        attachmentUrl: taskWithId?.attachmentUrl ?? "",
        allLabelsList: taskWithId?.allLabelsList ?? [],
        imageFileList: taskWithId?.imageFileList ?? [],
        description: taskWithId?.description ?? "",
      });
    }
  }, [isLoading]);

  const handleSaveTask = () => {
    updateTaskMutate.mutate({ taskId, updatedValues: taskDetails });
    navigate(`/projects/${projectId}`);
  };

  if (isLoading || taskDetails === undefined) {
    return <h1>Loading...</h1>;
  }
  // console.log(taskDetails);
  // return <h1>Loading...</h1>;

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
              {taskDetails?.label}
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
              style={{ marginTop: "1rem", marginRight: "1rem" }}
              onClick={handleSaveTask}
            >
              Save
            </Button>
            <Button
              style={{ marginTop: "1rem" }}
              onClick={() => navigate(`/projects/${projectId}`)}
            >
              Back
            </Button>
          </Box>
        </Card>
      </div>
    </>
  );
};

export default TaskDashboardPage;
