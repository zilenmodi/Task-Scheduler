import React from "react";
import AdminSidebarContainer from "../../shared/containers/AdminSidebarContainer/AdminSidebarContainer";
import "../../index.css";
import EditProjectPage from "../../layouts/EditProjectPage/EditProjectPage";

const EditProjectContainer = () => {
  return (
    <>
      <div className="app-container">
        <AdminSidebarContainer />
        <EditProjectPage />
      </div>
    </>
  );
};

export default EditProjectContainer;
