import { Avatar, Box, Divider, Typography } from "@mui/material";
import React from "react";
import Navbar from "./Navbar/Navbar";
import Projects from "./Projects/Projects";
import style from "./style.module.css";

const AdminSidebar = () => {
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "260px",
          overflow: "auto",
        }}
        className={style.body}
      >
        <Avatar
          alt="Remy Sharp"
          sx={{
            width: "8rem",
            height: "8rem",
            border: "5px solid var(--body-color-secondary)",
            mb: 2,
          }}
        />
        <Typography variant="h6" color={"var(--body-color)"}>
          Zilen Modi
        </Typography>
        <Divider
          component="div"
          sx={{
            width: "100%",
            margin: "3rem 0",
          }}
        />
        <Navbar />
        <Projects />
      </Box>
    </>
  );
};

export default AdminSidebar;
