import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MainState {
  userId: string;
  isAuth: boolean;
  username: string;
  dataArr: DataObj[];
  datesWithDataArr: string[];
}

const initialState: MainState = {
  userId: "",
  isAuth: false,
  username: "",
  dataArr: [],
  datesWithDataArr: [],
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
      state.isAuth = true;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setDates: (state, action: PayloadAction<string[]>) => {
      state.datesWithDataArr = action.payload;
    },
    logout: (state) => {
      state.userId = "";
      state.isAuth = false;
      state.dataArr = [];
      state.datesWithDataArr = [];
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
      const itemIndex = state.dataArr.findIndex(
        (item) => item.id === action.payload
      );
      state.dataArr.splice(itemIndex, 1);
    },
    resetData: (state) => {
      state.dataArr = [];
      state.datesWithDataArr = [];
    },
    deleteDate: (state, action: PayloadAction<string>) => {
      if (!state.dataArr.some((item) => item.date === action.payload)) {
        const dateToDelete = state.datesWithDataArr.findIndex(
          (item) => item === action.payload
        );
        state.datesWithDataArr.splice(dateToDelete, 1);
      }
    },
  },
});

export const {
  authenticate,
  setUsername,
  setDates,
  logout,
  setData,
  addItem,
  updateItem,
  removeItem,
  resetData,
  deleteDate,
} = mainSlice.actions;
export default mainSlice.reducer;
