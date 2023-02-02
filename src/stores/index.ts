
import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesReducer";
import productReducer from "./productReducer";
import tokenReducer from "./tokenReducer";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    products: productReducer,
    categories: categoriesReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;