import { combineReducers } from "@reduxjs/toolkit";
import fileSlice from "./file/fileSlice";

const rootReducer = combineReducers({
  files: fileSlice,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
