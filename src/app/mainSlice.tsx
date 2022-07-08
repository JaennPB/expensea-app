import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MainState {
  userId: string;
  isAuth: boolean;
  userName: string;
  dataArr: DataObj[];
}

const initialState: MainState = {
  userId: "",
  isAuth: false,
  userName: "",
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
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    logout: (state) => {
      state.userId = "";
      state.isAuth = false;
      state.dataArr = [];
    },
    setData: (state, action: PayloadAction<any>) => {
      state.dataArr.unshift(action.payload);
    },
    addItem: (state, action: PayloadAction<DataObj>) => {
      state.dataArr.unshift(action.payload);
    },
    updateItem: (
      state,
      action: PayloadAction<{ id: string; data: DataObj }>
    ) => {
      const itemToUpdateIndex = state.dataArr.findIndex(
        (element) => element.id === action.payload.id
      );
      const itemInDataArray = state.dataArr[itemToUpdateIndex];
      const updatedItem = { ...itemInDataArray, ...action.payload.data };
      state.dataArr[itemToUpdateIndex] = updatedItem;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const updatedArr = state.dataArr.filter(
        (item) => item.id !== action.payload
      );
      state.dataArr = updatedArr;
    },
    resetData: (state) => {
      state.dataArr = [];
    },
  },
});

export const {
  authenticate,
  setUserName,
  logout,
  setData,
  addItem,
  updateItem,
  removeItem,
  resetData,
} = mainSlice.actions;
export default mainSlice.reducer;
