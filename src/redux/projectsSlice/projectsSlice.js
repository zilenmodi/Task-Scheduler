import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  status: "idle",
  error: "",
};

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
});

export default projectsSlice.reducer;
export const {
  addBoardProject,
  updateBoardProject,
  updateBoardPositions,
  addNewTaskProject,
  updateTaskProject,
} = projectsSlice.actions;
