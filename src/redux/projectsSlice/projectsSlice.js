import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  status: "idle",
  error: "",
};

const projectsSlice = createSlice({
  name: "projectsSlice",
  initialState,
});

export default projectsSlice.reducer;
export const {} = projectsSlice.actions;
