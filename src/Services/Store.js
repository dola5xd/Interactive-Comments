import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "./commentSlice";

const Store = configureStore({
  reducer: {
    comment: commentSlice,
  },
});

export default Store;
