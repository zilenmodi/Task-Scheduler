import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { addNewUser, deleteUser, updateUser } from "../usersSlice/usersSlice";
import {
  getProjectFromDatabase,
  updateProjectsDatabase,
  updateIndProjectDatabase,
  deleteIndProject,
} from "../../Helper/firebasedb";

const initialState = {
  projects: [],
  status: "idle",
  error: "",
};

// complete
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (adminId) => {
    try {
      const adminProjects = await getProjectFromDatabase(adminId);
      return adminProjects ?? [];
    } catch (error) {
      return error.message;
    }
  }
);

// complete
export const addNewProject = createAsyncThunk(
  "project/addNewProject",
  async ({ newProject, navigate }) => {
    try {
      await updateProjectsDatabase(newProject);
      navigate("/admin/dashboard");
      return newProject;
    } catch (error) {
      return error.message;
    }
  }
);

// complete
export const updateProject = createAsyncThunk(
  "project/updateProject",
  async ({ updatedProject, navigate }) => {
    try {
      const newProjects = await updateIndProjectDatabase(updatedProject);
      navigate("/admin/dashboard");
      return newProjects ?? [];
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (pid) => {
    try {
      const newProjects = await deleteIndProject(pid);
      return newProjects ?? [];
    } catch (error) {
      return error.message;
    }
  }
);

const projectsSlice = createSlice({
  name: "projectsSlice",
  initialState,
  reducers: {
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
      state.projects = updatedProjects;
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
    updateTaskProject: (state, action) => {
      const projects = JSON.parse(localStorage.getItem("projects"));
      const updatedProjects = projects.map((project) => {
        if (project.projectId === action.payload.projectId) {
          const updateProject = {
            ...project,
            tasks: project.tasks.map((task) => {
              if (task.id === action.payload.taskId) {
                return action.payload.updatedtask;
              }
              return task;
            }),
          };
          return updateProject;
        }
        return project;
      });
      console.log(updatedProjects);
      state.projects = updatedProjects;
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeed";
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      })
      .addCase(addNewProject.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addNewProject.fulfilled, (state, action) => {
        state.status = "succeed";
        state.projects.push(action.payload);
      })
      .addCase(addNewProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      })
      .addCase(deleteProject.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = "succeed";
        state.projects = action.payload ?? [];
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      });
    // builder.addCase(addNewUser, (state, action) => {
    //   const projectsWhichAdded = action.payload.assignProjects;
    //   const userId = action.payload.userId;
    //   const updatedProjects = state.projects.map((project) => {
    //     if (projectsWhichAdded.includes(project.projectId)) {
    //       return { ...project, assignTo: [...project.assignTo, userId] };
    //     }
    //     return project;
    //   });
    //   state.projects = updatedProjects;
    //   localStorage.setItem("projects", JSON.stringify(state.projects));
    // });
    // builder.addCase(updateUser, (state, action) => {
    //   const userId = action.payload.userId;
    //   const projectsWithoutCurrUID = state.projects.map((project) => {
    //     if (project?.assignTo?.includes(userId)) {
    //       const index = project?.assignTo?.indexOf(userId);
    //       const removedAssignUsers = project.assignTo;
    //       removedAssignUsers.splice(index, 1);
    //       return { ...project, assignTo: removedAssignUsers };
    //     }
    //     return project;
    //   });

    //   const projectsWhichAdded = action.payload.assignProjects;
    //   const updatedProjects = projectsWithoutCurrUID.map((project) => {
    //     if (projectsWhichAdded.includes(project.projectId)) {
    //       return { ...project, assignTo: [...project.assignTo, userId] };
    //     }
    //     return project;
    //   });
    //   state.projects = updatedProjects;
    //   localStorage.setItem("projects", JSON.stringify(state.projects));
    // });
    // builder.addCase(deleteUser, (state, action) => {
    //   const userId = action.payload;
    //   const projectsWithoutCurrUID = state.projects.map((project) => {
    //     if (project?.assignTo?.includes(userId)) {
    //       const index = project?.assignTo?.indexOf(userId);
    //       const removedAssignUsers = project.assignTo;
    //       removedAssignUsers.splice(index, 1);
    //       return { ...project, assignTo: removedAssignUsers };
    //     }
    //     return project;
    //   });
    //   state.projects = projectsWithoutCurrUID;
    //   localStorage.setItem("projects", JSON.stringify(state.projects));
    // });
  },
});

export default projectsSlice.reducer;
export const {
  addBoardProject,
  updateBoardProject,
  updateBoardPositions,
  addNewTaskProject,
  updateTaskProject,
} = projectsSlice.actions;
