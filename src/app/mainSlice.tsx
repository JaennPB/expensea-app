import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { WritableDraft } from "immer/dist/internal";

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
    setData: (state, action: PayloadAction<any>) => {
      state.dataArr.unshift(action.payload);
    },
  },
});

export const { addItem, removeItem, setData } = mainSlice.actions;
export default mainSlice.reducer;
