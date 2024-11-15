import { createSlice } from "@reduxjs/toolkit";

const userConncectionsSlice = createSlice({
  name: "userCollections",
  initialState: null,
  reducers: {
    addUserConnections: (state, action) => {
      return action.payload;
    },
    removeUserConnections: () => {
      return null;
    },
  },
});
export const { addUserConnections, removeUserConnections } =
  userConncectionsSlice.actions;
export default userConncectionsSlice.reducer;
