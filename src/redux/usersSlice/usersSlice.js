import { createSlice } from "@reduxjs/toolkit";

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
