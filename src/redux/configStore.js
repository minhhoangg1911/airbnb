import { configureStore } from "@reduxjs/toolkit";
import signInReducer from "./reducers/signInReducer";


export const store = configureStore({
  reducer: {
    signInReducer: signInReducer,
   
  },
});
export default store;
