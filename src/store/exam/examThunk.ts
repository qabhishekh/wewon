import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/hooks/Axios";
import { Exam } from "../types";

// Fetch Exams with pagination and filtering
export const fetchExams = createAsyncThunk(
  "exam/fetchExams",
  async (
    params: {
      page?: number;
      limit?: number;
      isActive?: boolean;
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const { page = 1, limit = 10, isActive = true } = params;

      // Build query parameters
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        isActive: isActive.toString(),
      });

      const response = await apiClient.get(
        `/api/exams?${queryParams.toString()}`
      );

      return {
        data: response.data.data as Exam[],
        total: response.data.pagination.total,
        count: response.data.count,
        currentPage: page,
        totalPages: response.data.pagination.pages,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch exams"
      );
    }
  }
);

// Fetch single exam by ID
export const fetchExamById = createAsyncThunk(
  "exam/fetchExamById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/api/exams/${id}`);

      if (!response.data.success) {
        return rejectWithValue("Exam not found");
      }

      return response.data.data as Exam;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch exam"
      );
    }
  }
);
