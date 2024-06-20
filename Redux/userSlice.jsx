import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentuser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      console.log("it started");
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      console.log("its success");
      state.currentuser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      console.log("its failed");
      state.loading = false;
      state.error = action.payload;
    },
    signOutSuccess: (state) => {
      console.log("its signOutSuccess");
      state.currentuser = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {signInStart,signInSuccess,signInFailure,signOutSuccess} = userSlice.actions;

export default userSlice.reducer;
