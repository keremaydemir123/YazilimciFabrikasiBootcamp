import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type FileType = {
  name: string;
  content: string;
  type: "html" | "css" | "js";
};

const fileSlice = createSlice({
  name: "files",
  initialState: [] as FileType[],
  reducers: {
    addFile: (state, action: PayloadAction<FileType[]>) => [
      ...state,
      ...action.payload,
    ],
    removeFile: (state, action: PayloadAction<FileType>) =>
      state.filter((file) => file.name !== action.payload.name),
  },
});

export const { addFile, removeFile } = fileSlice.actions;

export default fileSlice.reducer;
