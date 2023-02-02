import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IProduct from "../interfaces/IProduct";

const initialState = {
  homeProducts: [],
  allProducts: [],
  productsByDate: []
};

export const productsReducer = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    setHomeProducts: (state, action: PayloadAction<[]>) => {
      state.homeProducts = action.payload;
    },
    setAllProducts: (state, action: PayloadAction<[]>) => {
      state.allProducts = action.payload;
    },
    setProductsByDate: (state, action: PayloadAction<[]>) => {
      state.productsByDate = action.payload;
    },
  },
});

export const { setHomeProducts,setAllProducts, setProductsByDate } = productsReducer.actions;
export default productsReducer.reducer;