import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import userConnectionsReducer from "./userConnectionSlice";
import requestReducer from "./requestSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    userConnections: userConnectionsReducer,
    requests: requestReducer,
  },
});

export default appStore;
