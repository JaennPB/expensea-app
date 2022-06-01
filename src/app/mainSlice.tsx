import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MainState {
  expenses: { id: number; title: string; amount: number }[];
  incomes: { id: number; title: string; amount: number }[];
}

const initialState: MainState = {
  expenses: [],
  incomes: [],
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
});

export const {} = mainSlice.actions;
export default mainSlice.reducer;
