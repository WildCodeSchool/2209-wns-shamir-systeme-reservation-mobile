import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import IProductCart from "../interfaces/IProductCart";
//import IProductCart from "../../interfaces/IProductCart";

export interface CartState {
  cart: IProductCart[],
}

const initialState: CartState = {
  cart: [],
}

export const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<IProductCart[]>) => {
      state.cart = action.payload;
    },
    reset: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { setCart, reset } = cartReducer.actions;

export default cartReducer.reducer;
