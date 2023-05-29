import React from "react";
import AdminDashboardPage from "../../layouts/AdminDashboardPage/AdminDashboardPage";
import AdminSidebarContainer from "../../shared/containers/AdminSidebarContainer/AdminSidebarContainer";
import "../../index.css";

const AdminDashboardContainer = () => {
  return (
    <>
      <div className="app-container">
        <AdminSidebarContainer />
        <AdminDashboardPage />
      </div>
    </>
  );
};

export default AdminDashboardContainer;
