import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInformation: {},
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userInfoReducer: (state, { payload }) => {
      state.userInformation = payload;
    },
  },
});

export const { userInfoReducer } = userSlice.actions;

export default userSlice.reducer;
