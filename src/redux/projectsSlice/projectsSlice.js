import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  projects: JSON.parse(localStorage.getItem("projects")) || [],
  status: "idle",
  error: "",
};

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (id) => {
    try {
      const projects = JSON.parse(localStorage.getItem("projects"));
      const userProjects = projects?.filter(
        (project) => project.createBy === id
      );
      return userProjects ?? [];
    } catch (error) {
      return error.message;
    }
  }
);

const projectsSlice = createSlice({
  name: "projectsSlice",
  initialState,
  reducers: {
    addNewProject: (state, action) => {
      state.projects.push(action.payload);
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
    deleteProject: (state, action) => {
      const newProjects = state.projects.filter(
        (project) => project.projectId !== action.payload
      );
      state.projects = newProjects;
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
    updateProject: (state, action) => {
      const newProjects = state.projects.map((project) => {
        if (project.projectId === action.payload.projectId) {
          return { ...project, projectName: action.payload.projectName };
        }
        return project;
      });
      state.projects = newProjects;
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.status = "succeed";
      state.projects = action.payload;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    });
  },
});

export default projectsSlice.reducer;
export const { addNewProject, deleteProject, updateProject } =
  projectsSlice.actions;
