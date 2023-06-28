import React from "react";
import AdminSidebarContainer from "../../shared/containers/AdminSidebarContainer/AdminSidebarContainer";
import "../../index.css";
import AddProjectPage from "../../layouts/AddProjectPage/AddProjectPage";
import { getUsersFromDatabase } from "../../Helper/firebasedb";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

const AddProjectContainer = () => {
  const adminId = useSelector((state) => state.auth.userDetails.uid);
  const { data: users } = useQuery(["users"], () =>
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
        <AddProjectPage employeeOptions={employeeOptions} />
      </div>
    </>
  );
};

export default AddProjectContainer;
