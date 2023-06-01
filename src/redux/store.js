import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./projectsSlice/projectsSlice";
import usersReducer from "./usersSlice/usersSlice";

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    users: usersReducer,
  },
});

export default store;
