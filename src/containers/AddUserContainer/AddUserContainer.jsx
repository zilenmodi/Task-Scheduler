import React from "react";
import AdminSidebarContainer from "../../shared/containers/AdminSidebarContainer/AdminSidebarContainer";
import "../../index.css";
import AddUserPage from "../../layouts/AddUserPage/AddUserPage";
import { useSelector } from "react-redux";

const AddUserContainer = () => {
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
        <AddUserPage projectOptions={projectOptions} />
      </div>
    </>
  );
};

export default AddUserContainer;
