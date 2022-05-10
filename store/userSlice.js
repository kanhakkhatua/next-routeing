import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    singleData: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { singleData } = userSlice.actions;

export default userSlice.reducer;
