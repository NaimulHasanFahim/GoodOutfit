import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    signinStart: (state) => {
      state.isFetching = true;
    },
    signinSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    signinFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    signupStart: (state) => {
      state.isFetching = true;
    },
    signupSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    signupFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.error = false;
    },
  },
});

export const { signinStart, signinSuccess, signinFailure, signupStart, signupSuccess, signupFailure, logout  } = userSlice.actions;
export default userSlice.reducer;