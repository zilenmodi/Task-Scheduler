import React from "react";
import AdminSidebarContainer from "../../shared/containers/AdminSidebarContainer/AdminSidebarContainer";
import "../../index.css";
import AddProjectPage from "../../layouts/AddProjectPage/AddProjectPage";
import { useSelector } from "react-redux";

const AddProjectContainer = () => {
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
        <AddProjectPage employeeOptions={employeeOptions} />
      </div>
    </>
  );
};

export default AddProjectContainer;
