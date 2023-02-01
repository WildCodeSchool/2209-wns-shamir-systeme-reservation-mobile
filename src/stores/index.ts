
import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./tokenReducer";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;