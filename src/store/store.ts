import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import counsellorReducer from "./counsellor/counsellorSlice";
import collegeReducer from "./college/collegeSlice";
import counselingReducer from "./counseling/counselingSlice";
import couponReducer from "./coupon/couponSlice";
import orderReducer from "./order/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counsellor: counsellorReducer,
    college: collegeReducer,
    counseling: counselingReducer,
    coupon: couponReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
