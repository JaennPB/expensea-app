import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MainState {
  expenses: number[];
}

const initialState: MainState = {
  expenses: [],
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
});

export const {} = mainSlice.actions;
export default mainSlice.reducer;
