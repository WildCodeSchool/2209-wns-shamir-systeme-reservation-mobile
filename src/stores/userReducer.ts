import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import IUser from "../interfaces/IUser";
import IOrder from "../interfaces/IOrder";

export interface UserState{
  user: IUser;
  isAdmin: boolean;
  orders: IOrder[];
  isOrderExist: boolean
}

const initialState: UserState = {
  user: {
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  },
  isAdmin: false,
  orders: [],
  isOrderExist: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user.id = action.payload.id;
      state.user.firstname = action.payload.firstname;
      state.user.lastname = action.payload.lastname;
      state.user.email = action.payload.email;
      state.user.phone = action.payload.phone;
    },
    setOrders: (state, action: PayloadAction<[]>) => {
      state.orders = action.payload;
    },
    setIsOrdersExist: (state, action: PayloadAction<boolean>) => {
      state.isOrderExist = action.payload;
    },
    reset: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { setIsAdmin, setUser, reset, setIsOrdersExist, setOrders } = userSlice.actions;

export default userSlice.reducer;
