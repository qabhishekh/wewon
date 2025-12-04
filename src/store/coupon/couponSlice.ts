import { createSlice } from "@reduxjs/toolkit";
import { CouponState } from "../types";
import { validateCoupon, fetchAvailableCoupons } from "./couponThunk";
import { RootState } from "../store";

const initialState: CouponState = {
  availableCoupons: [],
  validatedCoupon: null,
  loading: false,
  error: null,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    clearValidatedCoupon: (state) => {
      state.validatedCoupon = null;
      state.error = null;
    },
    clearCouponError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Validate Coupon
    builder
      .addCase(validateCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.validatedCoupon = action.payload;
        state.error = null;
      })
      .addCase(validateCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.validatedCoupon = null;
      });

    // Fetch Available Coupons
    builder
      .addCase(fetchAvailableCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.availableCoupons = action.payload;
        state.error = null;
      })
      .addCase(fetchAvailableCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearValidatedCoupon, clearCouponError } = couponSlice.actions;

// Selectors
export const selectAvailableCoupons = (state: RootState) =>
  state.coupon.availableCoupons;
export const selectValidatedCoupon = (state: RootState) =>
  state.coupon.validatedCoupon;
export const selectCouponLoading = (state: RootState) => state.coupon.loading;
export const selectCouponError = (state: RootState) => state.coupon.error;

export default couponSlice.reducer;
