import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import bookReducer from "./slices/bookSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    books: bookReducer,
  },
});

export default store;
