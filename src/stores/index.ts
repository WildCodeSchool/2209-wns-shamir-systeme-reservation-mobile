
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import categoriesReducer from "./categoriesReducer";
import filterReducer from "./filterReducer";
import productReducer from "./productReducer";
import tokenReducer from "./tokenReducer";
import userReducer from "./userReducer";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    products: productReducer,
    categories: categoriesReducer,
    filter: filterReducer,
    user: userReducer,
    cart: cartReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;