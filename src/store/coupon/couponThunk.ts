import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/hooks/Axios";
import { Coupon, CouponValidationResponse } from "../types";

// Validate coupon
export const validateCoupon = createAsyncThunk(
  "coupon/validate",
  async (
    { code, productId }: { code: string; productId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.post("/api/coupons/validate", {
        code,
        productId,
      });

      if (!response.data.success) {
        return rejectWithValue(response.data.message || "Invalid coupon");
      }

      return response.data.data as CouponValidationResponse;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to validate coupon"
      );
    }
  }
);

// Fetch available coupons for a product
export const fetchAvailableCoupons = createAsyncThunk(
  "coupon/fetchAvailable",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(
        `/api/coupons?productId=${productId}&isActive=true`
      );

      if (!response.data.success) {
        return rejectWithValue(
          response.data.message || "Failed to fetch coupons"
        );
      }

      return response.data.data as Coupon[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch available coupons"
      );
    }
  }
);
