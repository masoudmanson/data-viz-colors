import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DataState {
  data: number[][];
  x: number;
  y: number;
}

const initialState: DataState = {
  data: generateData(30, 7),
  x: 30,
  y: 7,
};

function generateData(x: number, y: number) {
  let data = [];
  for (let i = 0; i <= x; i++) {
    for (let j = 0; j <= y; j++) {
      data.push([i, j, Math.ceil(Math.random() * 100)]);
    }
  }
  return data;
}

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    replaceData: (state, action: PayloadAction<number[][]>) => {
      state.data = action.payload;
    },
  },
});

export const { replaceData } = dataSlice.actions;

export default dataSlice.reducer;
