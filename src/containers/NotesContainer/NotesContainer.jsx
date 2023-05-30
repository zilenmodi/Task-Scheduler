import React from "react";
import NotesPage from "../../layouts/NotesPage/NotesPage";
import AdminSidebarContainer from "../../shared/containers/AdminSidebarContainer/AdminSidebarContainer";
import "../../index.css";

const NotesContainer = () => {
  return (
    <>
      <div className="app-container">
        <AdminSidebarContainer />
        <NotesPage />
      </div>
    </>
  );
};

export default NotesContainer;
