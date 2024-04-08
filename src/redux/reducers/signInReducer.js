import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [{ id: 1 }],
};

const signInReducer = createSlice({
  name: "users",
  initialState: {
    users: {},
   
  },
  reducers: {
    signIn: (state, action) => {
      state.users = action.payload;
      console.log("users",action);
    },
   
  },
});

export const { signIn } = signInReducer.actions;

export default signInReducer.reducer;
