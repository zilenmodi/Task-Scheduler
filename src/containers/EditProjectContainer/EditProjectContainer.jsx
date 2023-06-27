import React from "react";
import AdminSidebarContainer from "../../shared/containers/AdminSidebarContainer/AdminSidebarContainer";
import "../../index.css";
import EditProjectPage from "../../layouts/EditProjectPage/EditProjectPage";
import { useSelector } from "react-redux";
import { getUsersFromDatabase } from "../../Helper/firebasedb";
import { useQuery } from "@tanstack/react-query";

const EditProjectContainer = () => {
  const adminId = useSelector((state) => state.auth.userDetails.uid);
  const { data: users } = useQuery(["users", adminId], () =>
    getUsersFromDatabase(adminId)
  );
  const employeeOptions = users?.map((user) => {
    return {
      label: `${user.firstName} ${user.lastName}`,
      value: user.userId,
    };
  });
  return (
    <>
      <div className="app-container">
        <AdminSidebarContainer />
        <EditProjectPage employeeOptions={employeeOptions} />
      </div>
    </>
  );
};

export default EditProjectContainer;
