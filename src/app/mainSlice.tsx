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
  },
});

export const { addItem } = mainSlice.actions;
export default mainSlice.reducer;
