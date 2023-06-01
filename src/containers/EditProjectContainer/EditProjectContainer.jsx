import React from "react";
import AdminSidebarContainer from "../../shared/containers/AdminSidebarContainer/AdminSidebarContainer";
import "../../index.css";
import EditProjectPage from "../../layouts/EditProjectPage/EditProjectPage";
import { useSelector } from "react-redux";

const EditProjectContainer = () => {
  const users = useSelector((state) => state.users.users);
  const employeeOptions = users.map((user) => {
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
