import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/hooks/Axios";
import { CounselingProduct } from "../types";

// Fetch Counseling Products with pagination
export const fetchCounselingProducts = createAsyncThunk(
  "counseling/fetchProducts",
  async (
    params: {
      page?: number;
      limit?: number;
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const { page = 1, limit = 10 } = params;

      // Build query parameters
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await apiClient.get(
        `/api/counselling?${queryParams.toString()}`
      );

      return {
        data: response.data.data as CounselingProduct[],
        total: response.data.total,
        count: response.data.count,
        currentPage: page,
        totalPages: Math.ceil(response.data.total / limit),
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch counseling products"
      );
    }
  }
);

// Fetch single counseling product by slug
export const fetchCounselingProductBySlug = createAsyncThunk(
  "counseling/fetchProductBySlug",
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/api/admin/products/slug/${slug}`);

      if (!response.data.success) {
        return rejectWithValue("Product not found");
      }

      return response.data.data as CounselingProduct;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch counseling product"
      );
    }
  }
);

// Toggle like on a product
export const toggleLikeProduct = createAsyncThunk(
  "counseling/toggleLike",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        `/api/counselling/${productId}/like`
      );

      if (!response.data.success) {
        return rejectWithValue(
          response.data.message || "Failed to toggle like"
        );
      }

      return response.data.data as CounselingProduct;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle like"
      );
    }
  }
);
