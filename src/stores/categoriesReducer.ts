import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
 allCategories: []
};

export const categoriesReducer = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    setAllCategories: (state, action: PayloadAction<[]>) => {
      state.allCategories = action.payload;
    }
  },
});

export const { setAllCategories } = categoriesReducer.actions;
export default categoriesReducer.reducer;