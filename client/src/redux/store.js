import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import boardReducer from './features/boadSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer
  },
});
