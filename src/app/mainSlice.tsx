import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MainState {
  token: string | null;
  isAuth: boolean;
  currUserDocId: string;
  dataArr: DataObj[];
}

const initialState: MainState = {
  token: "",
  isAuth: false,
  currUserDocId: "",
  dataArr: [],
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuth = !!state.token;
    },
    logout: (state) => {
      state.token = null;
      state.isAuth = !!state.token;
      state.currUserDocId = "";
    },
    setCurrUserDocId: (state, action: PayloadAction<string>) => {
      state.currUserDocId = action.payload;
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

export const {
  authenticate,
  logout,
  setCurrUserDocId,
  setData,
  addItem,
  removeItem,
} = mainSlice.actions;
export default mainSlice.reducer;
