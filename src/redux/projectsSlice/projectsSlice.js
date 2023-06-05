import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { addNewUser, deleteUser, updateUser } from "../usersSlice/usersSlice";

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
          return action.payload;
        }
        return project;
      });
      state.projects = newProjects;
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
    addBoardProject: (state, action) => {
      const newProjects = state.projects.map((project) => {
        if (project.projectId === action.payload.projectId) {
          const updateProject = {
            ...project,
            boards: [...project.boards, action.payload.newBoard],
          };
          return updateProject;
        }
        return project;
      });
      state.projects = newProjects;
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
    updateBoardProject: (state, action) => {
      const projects = JSON.parse(localStorage.getItem("projects"));
      const updatedProjects = projects?.map((project) => {
        if (project.projectId === action.payload.projectId) {
          const updateProject = {
            ...project,
            boards: project?.boards?.map((board) => {
              if (board.id === action.payload.updatedBoard.id) {
                return action.payload.updatedBoard;
              }
              return board;
            }),
          };
          return updateProject;
        }
        return project;
      });
      state.projects = updatedProjects;
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
    updateBoardPositions: (state, action) => {
      const updatedProjects = state.projects.map((project) => {
        if (project.projectId === action.payload.projectId) {
          const updateProject = {
            ...project,
            boards: action.payload.boards,
          };
          return updateProject;
        }
        return project;
      });
      state.projects = updatedProjects;
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
    addNewTaskProject: (state, action) => {
      const projects = JSON.parse(localStorage.getItem("projects"));
      const updatedProjects = projects.map((project) => {
        if (project.projectId === action.payload.projectId) {
          const updateProject = {
            ...project,
            tasks: [...project.tasks, action.payload.newTask],
            boards: project?.boards?.map((board) => {
              if (board.id === action.payload.boardId) {
                const updateBoardWithNewTask = {
                  ...board,
                  itemsList: [...board.itemsList, action.payload.newTask.id],
                };
                return updateBoardWithNewTask;
              }
              return board;
            }),
          };
          return updateProject;
        }
        return project;
      });
      // console.log(updatedProjects);
      state.projects = updatedProjects;
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
    builder.addCase(addNewUser, (state, action) => {
      const projectsWhichAdded = action.payload.assignProjects;
      const userId = action.payload.userId;
      const updatedProjects = state.projects.map((project) => {
        if (projectsWhichAdded.includes(project.projectId)) {
          return { ...project, assignTo: [...project.assignTo, userId] };
        }
        return project;
      });
      state.projects = updatedProjects;
      localStorage.setItem("projects", JSON.stringify(state.projects));
    });
    builder.addCase(updateUser, (state, action) => {
      const userId = action.payload.userId;
      const projectsWithoutCurrUID = state.projects.map((project) => {
        if (project?.assignTo?.includes(userId)) {
          const index = project?.assignTo?.indexOf(userId);
          const removedAssignUsers = project.assignTo;
          removedAssignUsers.splice(index, 1);
          return { ...project, assignTo: removedAssignUsers };
        }
        return project;
      });

      const projectsWhichAdded = action.payload.assignProjects;
      const updatedProjects = projectsWithoutCurrUID.map((project) => {
        if (projectsWhichAdded.includes(project.projectId)) {
          return { ...project, assignTo: [...project.assignTo, userId] };
        }
        return project;
      });
      state.projects = updatedProjects;
      localStorage.setItem("projects", JSON.stringify(state.projects));
    });
    builder.addCase(deleteUser, (state, action) => {
      const userId = action.payload;
      const projectsWithoutCurrUID = state.projects.map((project) => {
        if (project?.assignTo?.includes(userId)) {
          const index = project?.assignTo?.indexOf(userId);
          const removedAssignUsers = project.assignTo;
          removedAssignUsers.splice(index, 1);
          return { ...project, assignTo: removedAssignUsers };
        }
        return project;
      });
      state.projects = projectsWithoutCurrUID;
      localStorage.setItem("projects", JSON.stringify(state.projects));
    });
  },
});

export default projectsSlice.reducer;
export const {
  addNewProject,
  deleteProject,
  updateProject,
  addBoardProject,
  updateBoardProject,
  updateBoardPositions,
  addNewTaskProject,
} = projectsSlice.actions;
