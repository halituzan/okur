import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import bookReducer from "./slices/bookSlice";
import defaultReducer from "./slices/defaultSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    books: bookReducer,
    defaults: defaultReducer,
  },
});

export default store;
