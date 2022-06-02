import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MainState {
  dataArr: {
    id: string;
    title: string;
    amount: number;
    date: string;
    type: string;
  }[];
}

type DataObject = {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: string;
};

const initialState: MainState = {
  dataArr: [],
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<DataObject>) => {
      state.dataArr.unshift(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const updatedArr = state.dataArr.filter(
        (item) => item.id !== action.payload
      );
      state.dataArr = updatedArr;
    },
  },
});

export const { addItem, removeItem } = mainSlice.actions;
export default mainSlice.reducer;
