import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ExamState } from "../types";
import { fetchExams, fetchExamById } from "./examThunk";

// ---------------------------
// Initial State
// ---------------------------

const initialState: ExamState = {
  exams: [],
  totalPages: 0,
  currentPage: 1,
  total: 0,
  examsLoading: false,
  examsError: null,

  selectedExam: null,
  selectedExamLoading: false,
  selectedExamError: null,
};

// ---------------------------
// Slice
// ---------------------------
const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    resetExams: (state) => {
      state.exams = [];
      state.totalPages = 0;
      state.currentPage = 1;
      state.total = 0;
      state.examsError = null;
    },
    clearSelectedExam: (state) => {
      state.selectedExam = null;
      state.selectedExamError = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Exams
    builder
      .addCase(fetchExams.pending, (state) => {
        state.examsLoading = true;
        state.examsError = null;
      })
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.examsLoading = false;
        state.exams = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.total = action.payload.total;
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.examsLoading = false;
        state.examsError =
          (action.payload as string) || "Failed to fetch exams";
      });

    // Fetch Exam By ID
    builder
      .addCase(fetchExamById.pending, (state) => {
        state.selectedExamLoading = true;
        state.selectedExamError = null;
      })
      .addCase(fetchExamById.fulfilled, (state, action) => {
        state.selectedExamLoading = false;
        state.selectedExam = action.payload;
      })
      .addCase(fetchExamById.rejected, (state, action) => {
        state.selectedExamLoading = false;
        state.selectedExamError =
          (action.payload as string) || "Failed to fetch exam";
      });
  },
});

// ---------------------------
// Exports
// ---------------------------
export const { resetExams, clearSelectedExam } = examSlice.actions;
export default examSlice.reducer;

// Selectors
export const selectExams = (state: RootState) => state.exam.exams;
export const selectExamsLoading = (state: RootState) => state.exam.examsLoading;
export const selectExamsError = (state: RootState) => state.exam.examsError;
export const selectTotalPages = (state: RootState) => state.exam.totalPages;
export const selectCurrentPage = (state: RootState) => state.exam.currentPage;
export const selectTotal = (state: RootState) => state.exam.total;

// Single exam selectors
export const selectSelectedExam = (state: RootState) => state.exam.selectedExam;
export const selectSelectedExamLoading = (state: RootState) =>
  state.exam.selectedExamLoading;
export const selectSelectedExamError = (state: RootState) =>
  state.exam.selectedExamError;
