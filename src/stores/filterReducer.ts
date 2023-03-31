import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ICategory from "../interfaces/ICategory";

const initialState = {
  isFilterShow: false,
  isCategoriesFiltered: false,
  categoriesFiltered: [],
  searchTerm: "",
  isFilterUsed: false,
  startDate: "",
  endDate: "",
  errorMessage: "",
};

export const filterReducer = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    resetFilter: () => initialState,
    setIsFilterShow: (state, action: PayloadAction<boolean>) => {
      state.isFilterShow = action.payload;
    },
    setIsCategoriesFiltered: (state, action: PayloadAction<boolean>) => {
      state.isCategoriesFiltered = action.payload;
    },
    setCategoriesFiltered: (state, action: PayloadAction<ICategory[]>) => {//@ts-ignore
      state.categoriesFiltered = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setIsFilterUsed: (state, action: PayloadAction<boolean>) => {
      state.isFilterUsed = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setIsFilterShow, setIsCategoriesFiltered, setCategoriesFiltered, setSearchTerm, setIsFilterUsed, setStartDate, setEndDate, setErrorMessage, resetFilter } = filterReducer.actions;
export default filterReducer.reducer;