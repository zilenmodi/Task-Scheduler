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

const TaskSideBar = () => {
  return (
    <>
      <Box className={style.taskSidebar_box}>
        <h3
          style={{
            color: "#172b4d",
          }}
        >
          Add to Task
        </h3>
        <Box className={style.taskSidebar_box}>
          <div className={style.taskSidebar_box_btn}>
            <UserOutlined />
            <Typography variant="subtitle1">Members</Typography>
          </div>
          <div className={style.taskSidebar_box_btn}>
            <TagOutlined />
            <Typography variant="subtitle1">Labels</Typography>
          </div>
          <div className={style.taskSidebar_box_btn}>
            <CheckSquareOutlined />
            <Typography variant="subtitle1">Checklist</Typography>
          </div>
          <div className={style.taskSidebar_box_btn}>
            <ClockCircleOutlined />
            <Typography variant="subtitle1">Dates</Typography>
          </div>
          <div className={style.taskSidebar_box_btn}>
            <LinkOutlined />
            <Typography variant="subtitle1">Attachment</Typography>
          </div>
          <div className={style.taskSidebar_box_btn}>
            <PicCenterOutlined />
            <Typography variant="subtitle1">Cover</Typography>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default TaskSideBar;
