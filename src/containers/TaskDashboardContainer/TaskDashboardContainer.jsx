import React from "react";
import AdminSidebarContainer from "../../shared/containers/AdminSidebarContainer/AdminSidebarContainer";
import "../../index.css";
import TaskDashboardPage from "../../layouts/TaskDashboardPage/TaskDashboardPage";

const TaskDashboardContainer = () => {
  return (
    <>
      <div className="app-container">
        <AdminSidebarContainer />
        <TaskDashboardPage />
      </div>
    </>
  );
};

export default TaskDashboardContainer;
