import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { CounselingState } from "../types";
import {
  fetchCounselingProducts,
  fetchCounselingProductBySlug,
} from "./counselingThunk";

// ---------------------------
// Initial State
// ---------------------------

const initialState: CounselingState = {
  products: [],
  totalPages: 0,
  currentPage: 1,
  total: 0,
  productsLoading: false,
  productsError: null,

  selectedProduct: null,
  selectedProductLoading: false,
  selectedProductError: null,
};

// ---------------------------
// Slice
// ---------------------------
const counselingSlice = createSlice({
  name: "counseling",
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.products = [];
      state.totalPages = 0;
      state.currentPage = 1;
      state.total = 0;
      state.productsError = null;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.selectedProductError = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Counseling Products
    builder
      .addCase(fetchCounselingProducts.pending, (state) => {
        state.productsLoading = true;
        state.productsError = null;
      })
      .addCase(fetchCounselingProducts.fulfilled, (state, action) => {
        state.productsLoading = false;
        state.products = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.total = action.payload.total;
      })
      .addCase(fetchCounselingProducts.rejected, (state, action) => {
        state.productsLoading = false;
        state.productsError =
          (action.payload as string) || "Failed to fetch counseling products";
      });

    // Fetch Counseling Product By Slug
    builder
      .addCase(fetchCounselingProductBySlug.pending, (state) => {
        state.selectedProductLoading = true;
        state.selectedProductError = null;
      })
      .addCase(fetchCounselingProductBySlug.fulfilled, (state, action) => {
        state.selectedProductLoading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchCounselingProductBySlug.rejected, (state, action) => {
        state.selectedProductLoading = false;
        state.selectedProductError =
          (action.payload as string) || "Failed to fetch counseling product";
      });
  },
});

// ---------------------------
// Exports
// ---------------------------
export const { resetProducts, clearSelectedProduct } = counselingSlice.actions;
export default counselingSlice.reducer;

// Selectors
export const selectCounselingProducts = (state: RootState) =>
  state.counseling.products;
export const selectProductsLoading = (state: RootState) =>
  state.counseling.productsLoading;
export const selectProductsError = (state: RootState) =>
  state.counseling.productsError;
export const selectTotalPages = (state: RootState) =>
  state.counseling.totalPages;
export const selectCurrentPage = (state: RootState) =>
  state.counseling.currentPage;
export const selectTotal = (state: RootState) => state.counseling.total;

// Single product selectors
export const selectSelectedProduct = (state: RootState) =>
  state.counseling.selectedProduct;
export const selectSelectedProductLoading = (state: RootState) =>
  state.counseling.selectedProductLoading;
export const selectSelectedProductError = (state: RootState) =>
  state.counseling.selectedProductError;
