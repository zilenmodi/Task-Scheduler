import React from "react";
import AdminSidebarContainer from "../../shared/containers/AdminSidebarContainer/AdminSidebarContainer";
import "../../index.css";
import { useSelector } from "react-redux";
import EditUserPage from "../../layouts/EditUserPage/EditUserPage";
import { getProjectFromDatabase } from "../../Helper/firebasedb";
import { useQuery } from "@tanstack/react-query";

const EditUserContainer = () => {
  const adminId = useSelector((state) => state.auth.userDetails.uid);
  const { data: projects } = useQuery(["projects", adminId], () =>
    getProjectFromDatabase(adminId)
  );
  const projectOptions = projects?.map((project) => {
    return {
      label: project?.projectName,
      value: project?.projectId,
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
