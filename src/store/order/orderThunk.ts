import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/hooks/Axios";
import { Order, PaymentVerification } from "../types";

// Create order
export const createOrder = createAsyncThunk(
  "order/create",
  async (
    orderData: {
      productId: string;
      productType: "counseling" | "mentorship";
      couponCode?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.post(
        "/api/payment/create-order",
        orderData
      );

      if (!response.data.success) {
        return rejectWithValue(
          response.data.message || "Failed to create order"
        );
      }

      return response.data.data as Order;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create order"
      );
    }
  }
);

// Verify payment
export const verifyPayment = createAsyncThunk(
  "order/verifyPayment",
  async (paymentData: PaymentVerification, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/api/payment/verify", paymentData);

      if (!response.data.success) {
        return rejectWithValue(
          response.data.message || "Payment verification failed"
        );
      }

      return response.data.data as Order;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Payment verification failed"
      );
    }
  }
);

// Fetch user orders
export const fetchUserOrders = createAsyncThunk(
  "order/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/api/orders/my-orders");

      if (!response.data.success) {
        return rejectWithValue(
          response.data.message || "Failed to fetch orders"
        );
      }

      return response.data.data as Order[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user orders"
      );
    }
  }
);

// Download invoice
export const downloadInvoice = createAsyncThunk(
  "order/downloadInvoice",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/api/orders/${orderId}/invoice`, {
        responseType: "blob",
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      return { success: true };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to download invoice"
      );
    }
  }
);
