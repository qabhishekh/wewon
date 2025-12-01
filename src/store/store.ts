import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import counsellorReducer from "./counsellor/counsellorSlice";
import collegeReducer from "./college/collegeSlice";
import counselingReducer from "./counseling/counselingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counsellor: counsellorReducer,
    college: collegeReducer,
    counseling: counselingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
