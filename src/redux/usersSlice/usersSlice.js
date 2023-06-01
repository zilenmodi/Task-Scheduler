import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addNewProject,
  deleteProject,
  updateProject,
} from "../projectsSlice/projectsSlice";

const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  status: "idle",
  error: "",
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const usersList = JSON.parse(localStorage.getItem("users"));
    return usersList ?? [];
  } catch (error) {
    return error.message;
  }
});

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    addNewUser: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    deleteUser: (state, action) => {
      const newUsersList = state.users.filter(
        (user) => user.userId !== action.payload
      );
      state.users = newUsersList;
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    updateUser: (state, action) => {
      const newUsersList = state.users.map((user) => {
        if (user.userId === action.payload.userId) {
          return action.payload;
        }
        return user;
      });
      state.users = newUsersList;
      localStorage.setItem("users", JSON.stringify(state.users));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = "succeed";
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    });
    builder.addCase(addNewProject, (state, action) => {
      const usersWhichAdded = action.payload.assignTo;
      const projectId = action.payload.projectId;
      const updatedUsers = state.users.map((user) => {
        if (usersWhichAdded.includes(user.userId)) {
          return {
            ...user,
            assignProjects: [...user.assignProjects, projectId],
          };
        }
        return user;
      });
      state.users = updatedUsers;
      localStorage.setItem("users", JSON.stringify(state.users));
    });
    builder.addCase(updateProject, (state, action) => {
      const usersWhichAdded = action.payload.assignTo;
      const projectId = action.payload.projectId;

      const usersWithoutCurrPID = state.users.map((user) => {
        console.log(state.users);
        if (user?.assignProjects?.includes(projectId)) {
          const index = user.assignProjects.indexOf(projectId);
          const removedAssignProjects = user.assignProjects;
          removedAssignProjects.splice(index, 1);
          console.log(removedAssignProjects);
          return {
            ...user,
            assignProjects: removedAssignProjects,
          };
        }
        return user;
      });

      const updatedUsers = usersWithoutCurrPID.map((user) => {
        if (usersWhichAdded?.includes(user.userId)) {
          return {
            ...user,
            assignProjects: [...user.assignProjects, projectId],
          };
        }
        return user;
      });
      state.users = updatedUsers;
      localStorage.setItem("users", JSON.stringify(state.users));
    });
    builder.addCase(deleteProject, (state, action) => {
      const projectId = action.payload;

      const usersWithoutCurrPID = state.users.map((user) => {
        if (user?.assignProjects?.includes(projectId)) {
          const index = user.assignProjects.indexOf(projectId);
          const removedAssignProjects = user.assignProjects;
          removedAssignProjects.splice(index, 1);
          return {
            ...user,
            assignProjects: removedAssignProjects,
          };
        }
        return user;
      });

      state.users = usersWithoutCurrPID;
      localStorage.setItem("users", JSON.stringify(state.users));
    });
  },
});

export default usersSlice.reducer;
export const { addNewUser, deleteUser, updateUser } = usersSlice.actions;
