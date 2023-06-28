import React from "react";
import AdminSidebarContainer from "../../shared/containers/AdminSidebarContainer/AdminSidebarContainer";
import "../../index.css";
import AddUserPage from "../../layouts/AddUserPage/AddUserPage";
import { useSelector } from "react-redux";
import { getProjectFromDatabase } from "../../Helper/firebasedb";
import { useQuery } from "@tanstack/react-query";

const AddUserContainer = () => {
  const adminId = useSelector((state) => state.auth.userDetails.uid);
  const { data: projects } = useQuery(["projects"], () =>
    getProjectFromDatabase(adminId)
  );
  const projectOptions = projects?.map((project) => {
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
