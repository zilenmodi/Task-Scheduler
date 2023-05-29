import { Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router";

const ProjectDashboardPage = () => {
  const { id } = useParams();
  return (
    <>
      <h1>{id}</h1>
    </>
  );
};

export default ProjectDashboardPage;
