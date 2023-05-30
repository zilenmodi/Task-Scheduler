import React from "react";
import AdminSidebarContainer from "../../shared/containers/AdminSidebarContainer/AdminSidebarContainer";
import "../../index.css";
import AddProjectPage from "../../layouts/AddProjectPage/AddProjectPage";

const AddProjectContainer = () => {
  return (
    <>
      <div className="app-container">
        <AdminSidebarContainer />
        <AddProjectPage />
      </div>
    </>
  );
};

export default AddProjectContainer;
