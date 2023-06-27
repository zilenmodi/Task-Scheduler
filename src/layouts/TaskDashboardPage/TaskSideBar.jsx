import { Box, Typography } from "@mui/material";
import React from "react";
import {
  UserOutlined,
  TagOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  LinkOutlined,
  PicCenterOutlined,
} from "@ant-design/icons";
import style from "./style.module.css";
import TaskModalCover from "./TaskModals/TaskModalCover";
import TaskModalMembers from "./TaskModals/TaskModalMembers";
import TaskModalLabels from "./TaskModals/TaskModalLabels";
import TaskModalDate from "./TaskModals/TaskModalDate";
import TaskModalAttachment from "./TaskModals/TaskModalAttachment";

const TaskSideBar = () => {
  return (
    <>
      <Box className={style.taskSidebar_box}>
        <Typography variant="subtitle1" fontWeight={500} color="#172b4d">
          Add to Task
        </Typography>
        <Box className={style.taskSidebar_box}>
          <TaskModalLabels />
          {/* <div className={style.taskSidebar_box_btn}>
            <CheckSquareOutlined />
            <Typography fontSize={"0.9rem"}>Checklist</Typography>
          </div> */}

          <TaskModalDate />

          <TaskModalAttachment />

          <TaskModalCover />
        </Box>
      </Box>
    </>
  );
};

export default TaskSideBar;
