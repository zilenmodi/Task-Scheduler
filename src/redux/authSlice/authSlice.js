import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateAdminsDatabase, auth } from "../../Helper/firebasedb";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const initialState = JSON.parse(localStorage.getItem("token")) || {
  userDetails: {},
  authenticate: false,
  loading: false,
  error: null,
};

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async ({ values, navigate }) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const userId = response.user.uid;

      await updateAdminsDatabase(
        {
          name: values.name,
          email: values.email,
          accountType: values.accountType,
          organisation: values.orgname,
        },
        userId
      );
      navigate("/admin/dashboard");
      return { email: values.email, uid: userId };
    } catch (error) {
      return error.message;
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ values, navigate }) => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const userId = response.user.uid;
      navigate("/admin/dashboard");
      return { email: values.email, uid: userId };
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.authenticate = true;
        state.loading = false;
        state.error = null;
        localStorage.setItem("token", JSON.stringify(state));
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.authenticate = true;
        state.loading = false;
        state.error = null;
        localStorage.setItem("token", JSON.stringify(state));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const {} = authSlice.actions;
