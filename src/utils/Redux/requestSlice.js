import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      const newRequestArr = state.filter(
        (request) => request._id != action.payload
      );
      return newRequestArr;
    },
    removeRequestFromStore: (state, action) => {
      return null;
    },
  },
});

export const { addRequests, removeRequestFromStore, removeRequest } =
  requestSlice.actions;
export default requestSlice.reducer;
