import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./projectsSlice/projectsSlice";
import usersReducer from "./usersSlice/usersSlice";
import authReducer from "./authSlice/authSlice";

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    users: usersReducer,
    auth: authReducer,
  },
});

export default store;
