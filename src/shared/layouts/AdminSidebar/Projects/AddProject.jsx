import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Menu, MenuItem, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import style from "./style.module.css";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addNewProject } from "../../../../redux/projectsSlice/projectsSlice";

const AddProject = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [projectName, setProjectName] = useState("");

  const handleCreateBtnClick = () => {
    const project = {
      projectId: nanoid(),
      projectName: projectName || "Untitled",
      createBy: "Zilen Modi",
      createAt: new Date().toString(),
      assignTo: [],
      boards: [],
      properties: [],
      tags: [],
      dueDate: null,
    };

    dispatch(addNewProject(project));

    setAnchorEl(false);
    setProjectName("");
  };

  return (
    <>
      <Box
        className={style.heading}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Typography variant="subtitle1">Your Projects</Typography>
        <AddIcon />
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Box sx={{ p: 1, display: "flex", gap: "1rem" }}>
          <input
            autoFocus
            id="project-create"
            name="project-create"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className={style.inputField}
          />
          <Button
            variant="contained"
            onClick={handleCreateBtnClick}
            className={style.createBtn}
          >
            Create
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default AddProject;
