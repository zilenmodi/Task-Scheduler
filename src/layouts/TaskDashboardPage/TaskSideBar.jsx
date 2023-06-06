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

const TaskSideBar = () => {
  return (
    <>
      <Box className={style.taskSidebar_box}>
        <Typography variant="subtitle1" fontWeight={500} color="#172b4d">
          Add to Task
        </Typography>
        <Box className={style.taskSidebar_box}>
          <div className={style.taskSidebar_box_btn}>
            <UserOutlined />
            <Typography fontSize={"0.9rem"}>Members</Typography>
          </div>
          <div className={style.taskSidebar_box_btn}>
            <TagOutlined />
            <Typography fontSize={"0.9rem"}>Labels</Typography>
          </div>
          <div className={style.taskSidebar_box_btn}>
            <CheckSquareOutlined />
            <Typography fontSize={"0.9rem"}>Checklist</Typography>
          </div>
          <div className={style.taskSidebar_box_btn}>
            <ClockCircleOutlined />
            <Typography fontSize={"0.9rem"}>Dates</Typography>
          </div>
          <div className={style.taskSidebar_box_btn}>
            <LinkOutlined />
            <Typography fontSize={"0.9rem"}>Attachment</Typography>
          </div>
          <TaskModalCover />
        </Box>
      </Box>
    </>
  );
};

export default TaskSideBar;
