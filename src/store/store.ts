import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import counsellorReducer from "./counsellor/counsellorSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counsellor: counsellorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
