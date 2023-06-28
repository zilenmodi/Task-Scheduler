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


const initialState = {
  users: [],
  status: "idle",
  error: "",
};



const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
export const {} = usersSlice.actions;
