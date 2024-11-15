import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import userConnectionsReducer from "./userConnectionSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    userConnections: userConnectionsReducer,
  },
});

export default appStore;
