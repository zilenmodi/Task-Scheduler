import React from "react";
import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Menu, Tag } from "antd";
import { useState } from "react";
import style from "../style.module.css";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateBoardProject } from "../../../redux/projectsSlice/projectsSlice";

function getItem(label, key, children, type) {
  return {
    key,
    children,
    label,
    type,
  };
}

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

const MoreOptionsBoard = ({ id, label, itemsList }) => {
  const { id: projectId } = useParams();
  const dispatch = useDispatch();
  const handleChangeColor = (color) => {
    const updatedBoard = {
      id: id,
      label: label.trim().length ? label : "Untitled",
      itemsList: itemsList,
      color: color.colorName,
      bgcolor: color.backgroundColorName,
    };
    const projectDetails = {
      projectId,
      updatedBoard,
    };
    dispatch(updateBoardProject(projectDetails));
  };
  return (
    <Box
      className={style.moreOptions_board}
      sx={{
        width: "150px",
        display: "flex",
        flexDirection: "column",
        gap: "0.1rem",
        height: "300px",
        overflow: "auto",
      }}
    >
      {/* <Typography className={style.more_option_btn_text}>Update</Typography> */}
      {/* <Typography className={style.more_option_btn_text}>Delete</Typography> */}
      {boardColors.map((boardColor, key) => {
        return (
          <Typography
            key={key}
            className={style.more_option_btn_text}
            onClick={() => handleChangeColor(boardColor)}
          >
            <Tag
              color={boardColor.colorName}
              style={{ height: "1rem", width: "1rem" }}
            />
            {boardColor.colorName.charAt(0).toUpperCase() +
              boardColor.colorName.slice(1)}
          </Typography>
        );
      })}
    </Box>
  );
};

export default MoreOptionsBoard;
