import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "./colorReducer";
import dataReducer from "./dataReducer";

export const store = configureStore({
  reducer: {
    colorReducer: colorReducer,
    dataReducer: dataReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
