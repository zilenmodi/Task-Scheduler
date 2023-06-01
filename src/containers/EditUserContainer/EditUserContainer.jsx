import React from "react";
import AdminSidebarContainer from "../../shared/containers/AdminSidebarContainer/AdminSidebarContainer";
import "../../index.css";
import { useSelector } from "react-redux";
import EditUserPage from "../../layouts/EditUserPage/EditUserPage";

const EditUserContainer = () => {
  const projects = useSelector((state) => state.projects.projects);
  const projectOptions = projects.map((project) => {
    return {
      label: project.projectName,
      value: project.projectId,
    };
  });
  return (
    <>
      <div className="app-container">
        <AdminSidebarContainer />
        <EditUserPage projectOptions={projectOptions} />
      </div>
    </>
  );
};

export default EditUserContainer;
