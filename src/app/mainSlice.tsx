import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataObj } from "../../App";

interface MainState {
  dataArr: DataObj[];
}

const initialState: MainState = {
  dataArr: [],
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<DataObj>) => {
      // TODO: check that id and type is sending correctly
      state.dataArr.unshift(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const updatedArr = state.dataArr.filter(
        (item) => item.id !== action.payload
      );
      state.dataArr = updatedArr;
    },
    setData: (state, action: PayloadAction<any>) => {
      state.dataArr = action.payload;
    },
  },
});

export const { addItem, removeItem, setData } = mainSlice.actions;
export default mainSlice.reducer;
