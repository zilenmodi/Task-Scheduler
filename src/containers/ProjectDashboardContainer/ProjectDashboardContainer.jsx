import React from "react";
import ProjectDashboardPage from "../../layouts/ProjectDashboardPage/ProjectDashboardPage";
import AdminSidebarContainer from "../../shared/containers/AdminSidebarContainer/AdminSidebarContainer";
import "../../index.css";

const ProjectDashboardContainer = () => {
  return (
    <>
      <div className="app-container">
        <AdminSidebarContainer />
        <ProjectDashboardPage />
      </div>
    </>
  );
};

export default ProjectDashboardContainer;
