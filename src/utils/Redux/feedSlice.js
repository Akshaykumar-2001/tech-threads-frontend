import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeedFromStore: (state, action) => {
      return null;
    },
    removeFeed: (state, action) => {
      state.shift();
    },
  },
});

export const { addFeed, removeFeedFromStore, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;
