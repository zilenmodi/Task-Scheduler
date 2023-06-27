import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  updateUsersDatabase,
  auth,
  getUsersFromDatabase,
  updateIndUserDatabase,
  deleteIndUser,
  database,
} from "../../Helper/firebasedb";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
  users: [],
  status: "idle",
  error: "",
};

const addUserToAssignedProjects = async (newUser) => {
  const assignedProjects = newUser.assignProjects;
  assignedProjects?.map(async (projectId) => {
    const docRef = doc(database, "projects", projectId);
    const projectData = (await getDoc(docRef)).data();
    const updatedProjectData = {
      ...projectData,
      assignTo: [...projectData.assignTo, newUser.userId],
    };
    await updateDoc(docRef, updatedProjectData);
  });
};

const deleteUserFromAssignedProjects = async (uid) => {
  const projectsCollections = collection(database, "projects");
  const querySnapshot = await getDocs(projectsCollections);
  const documents = [];
  querySnapshot.forEach((doc) => {
    documents.push({ ...doc.data() });
  });

  documents.map(async (currProjectData) => {
    const assignedUsers = currProjectData.assignTo;
    if (assignedUsers.includes(uid)) {
      const index = assignedUsers.indexOf(uid);
      assignedUsers.splice(index, 1);

      const updatedProjectData = {
        ...currProjectData,
        assignTo: assignedUsers,
      };

      const docRef = doc(database, "projects", currProjectData.projectId);
      await updateDoc(docRef, updatedProjectData);
    }
  });
};

const updateUserToAssignedProjects = async (updatedUser) => {
  await deleteUserFromAssignedProjects(updatedUser.userId);
  await addUserToAssignedProjects(updatedUser);
};

// complete
export const addNewUser = createAsyncThunk(
  "user/addNewUser",
  async (newUser) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        "12345678"
      );

      const userId = response.user.uid;

      await updateUsersDatabase(
        {
          newUser,
        },
        userId
      );
      await addUserToAssignedProjects({ ...newUser, userId });
      return { ...newUser, userId };
    } catch (error) {
      return error.message;
    }
  }
);

// complete
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (updatedUser, callback) => {
    try {
      const usersDetails = await updateIndUserDatabase(updatedUser);
      await updateUserToAssignedProjects(updatedUser);
      return usersDetails ?? [];
    } catch (error) {
      return error.message;
    }
  }
);

// complete
export const deleteUser = createAsyncThunk("user/deleteUser", async (uid) => {
  try {
    const usersDetails = await deleteIndUser(uid);
    await deleteUserFromAssignedProjects(uid);
    return usersDetails ?? [];
  } catch (error) {
    return error.message;
  }
});

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.status = "succeed";
        state.users.push(action.payload);
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeed";
        state.users = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeed";
        state.users = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      });
  },
});

export default usersSlice.reducer;
export const {} = usersSlice.actions;
