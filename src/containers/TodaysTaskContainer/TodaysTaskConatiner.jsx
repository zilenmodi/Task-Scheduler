import React from "react";
import TodaysTaskPage from "../../layouts/TodaysTaskPage/TodaysTaskPage";
import AdminSidebarContainer from "../../shared/containers/AdminSidebarContainer/AdminSidebarContainer";
import "../../index.css";

const TodaysTaskConatiner = () => {
  return (
    <>
      <div className="app-container">
        <AdminSidebarContainer />
        <TodaysTaskPage />
      </div>
    </>
  );
};

export default TodaysTaskConatiner;
