import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IProduct from "../interfaces/IProduct";

const initialState = {
  homeProducts: [],
  allProducts: [],
  productsByDate: [],
  isFilterShow: false
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
    setisFilterShow: (state, action: PayloadAction<boolean>) => {
      state.isFilterShow = action.payload;
    },
  },
});

export const { setHomeProducts,setAllProducts, setProductsByDate , setisFilterShow} = productsReducer.actions;
export default productsReducer.reducer;