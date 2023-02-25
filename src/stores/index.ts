
import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesReducer";
import filterReducer from "./filterReducer";
import productReducer from "./productReducer";
import tokenReducer from "./tokenReducer";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    products: productReducer,
    categories: categoriesReducer,
    filter: filterReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;