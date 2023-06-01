import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
        if (user.userId !== action.payload.userId) {
          return action.payload;
        }
        return user;
      });
      state.users = newUsersList;
      localStorage.setItem("projects", JSON.stringify(state.users));
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
  },
});

export default usersSlice.reducer;
export const { addNewUser, deleteUser, updateUser } = usersSlice.actions;
