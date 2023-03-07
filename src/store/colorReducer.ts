import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ColorsState {
  colors: string[];
  numberOfColors: number;
}

const initialState: ColorsState = {
  colors: [],
  numberOfColors: 8,
};

export const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {
    // addColor: (state, action: PayloadAction<string>) => {
    //   state.colors.push(action.payload);
    // },
    // deleteColor: (state, action: PayloadAction<string>) => {
    //   state.colors.splice(
    //     state.colors.findIndex((c) => c === action.payload),
    //     1
    //   );
    // },
    setTheNumberOfColors: (state, action: PayloadAction<number>) => {
      state.numberOfColors = action.payload;
    },
    replaceColors: (state, action: PayloadAction<string[]>) => {
      state.colors = action.payload;
    },
  },
});

export const {
  // addColor,
  // deleteColor,
  setTheNumberOfColors,
  replaceColors,
} = colorSlice.actions;

export default colorSlice.reducer;
