import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addNewProject,
  deleteProject,
  updateProject,
} from "../projectsSlice/projectsSlice";
import {
  updateUsersDatabase,
  auth,
  getUsersFromDatabase,
  updateIndUserDatabase,
} from "../../Helper/firebasedb";
import { createUserWithEmailAndPassword } from "firebase/auth";

const initialState = {
  users: [],
  status: "idle",
  error: "",
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (adminId) => {
    try {
      const usersDetails = await getUsersFromDatabase(adminId);
      return usersDetails ?? [];
    } catch (error) {
      return error.message;
    }
  }
);

export const addNewUser = createAsyncThunk(
  "user/addNewUser",
  async ({ newUser: values, navigate }) => {
    try {
      console.log(values);
      const response = await createUserWithEmailAndPassword(
        auth,
        values.email,
        "12345678"
      );

      const userId = response.user.uid;

      await updateUsersDatabase(
        {
          values,
        },
        userId
      );

      return { ...values, userId };
    } catch (error) {
      return error.message;
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (updatedUser) => {
    try {
      console.log(updatedUser);
      const response = await updateIndUserDatabase(updatedUser);
      console.log("response", response);
    } catch (error) {
      return error.message;
    }
  }
);

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    deleteUser: (state, action) => {
      const newUsersList = state.users.filter(
        (user) => user.userId !== action.payload
      );
      state.users = newUsersList;
      localStorage.setItem("users", JSON.stringify(state.users));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeed";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      })
      .addCase(addNewUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.status = "succeed";
        console.log(action.payload);
        state.users.push(action.payload);
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      })
      .addCase(addNewProject, (state, action) => {
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
      })
      .addCase(updateProject, (state, action) => {
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
      })
      .addCase(deleteProject, (state, action) => {
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
export const { deleteUser } = usersSlice.actions;
