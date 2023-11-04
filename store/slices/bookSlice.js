import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookList: [],
  myBookList: [],
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    bookListReducer: (state, { payload }) => {
      state.bookList = payload;
    },
    myBookListReducer: (state, { payload }) => {
      state.myBookList = payload;
    },
  },
});

export const { bookListReducer, myBookListReducer } = bookSlice.actions;

export default bookSlice.reducer;
