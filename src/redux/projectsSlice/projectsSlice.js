import { createSlice } from "@reduxjs/toolkit";
import { database } from "../../Helper/firebasedb";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";

const initialState = {
  projects: [],
  status: "idle",
  error: "",
};

const addProjectToAssignedUsers = async (newProject) => {
  const assignedUsers = newProject.assignTo;
  assignedUsers?.map(async (userId) => {
    const docRef = doc(database, "users", userId);
    const userData = (await getDoc(docRef)).data();
    const updatedUserData = {
      ...userData,
      assignProjects: [...userData.assignProjects, newProject.projectId],
    };
    await updateDoc(docRef, updatedUserData);
  });
};

const deleteProjectFromAssignedUsers = async (pid) => {
  const usersCollections = collection(database, "users");
  const querySnapshot = await getDocs(usersCollections);
  const documents = [];
  querySnapshot.forEach((doc) => {
    documents.push({ ...doc.data() });
  });

  documents.map(async (currUserData) => {
    const assignedProjects = currUserData.assignProjects;
    if (assignedProjects.includes(pid)) {
      const index = assignedProjects.indexOf(pid);
      assignedProjects.splice(index, 1);

      const updatedUserData = {
        ...currUserData,
        assignProjects: assignedProjects,
      };

      const docRef = doc(database, "users", currUserData.userId);
      await updateDoc(docRef, updatedUserData);
    }
  });
};

const updateProjectToAssignedUsers = async (updatedProject) => {
  await deleteProjectFromAssignedUsers(updatedProject.projectId);
  await addProjectToAssignedUsers(updatedProject);
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
