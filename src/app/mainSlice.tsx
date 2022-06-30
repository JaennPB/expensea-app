import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// TODO: Add "name" to interface
interface MainState {
  userId: string;
  isAuth: boolean;
  dataArr: DataObj[];
}

const initialState: MainState = {
  userId: "",
  isAuth: false,
  dataArr: [],
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.userId = "";
      state.isAuth = false;
    },
    setData: (state, action: PayloadAction<any>) => {
      state.dataArr.push(action.payload);
    },
    addItem: (state, action: PayloadAction<DataObj>) => {
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

export const { authenticate, logout, setData, addItem, removeItem } =
  mainSlice.actions;
export default mainSlice.reducer;
