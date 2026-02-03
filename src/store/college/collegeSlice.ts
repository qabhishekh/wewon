import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { CollegeState } from "../types";
import {
  fetchColleges,
  fetchCollegeById,
  fetchCollegeBySlug,
  fetchCollegeDetails,
  fetchRecommendedColleges,
  fetchNearbyColleges,
  fetchSimilarColleges,
} from "./collegeThunk";

// ---------------------------
// Initial State
// ---------------------------

const initialState: CollegeState = {
  colleges: [],
  totalPages: 0,
  currentPage: 1,
  totalColleges: 0,
  collegesLoading: false,
  collegesError: null,
  // Single college details
  selectedCollege: null,
  collegeDetails: null,
  collegeDetailsLoading: false,
  collegeDetailsError: null,
  // Recommended colleges
  recommendedColleges: [],
  recommendedLoading: false,
  recommendedError: null,
  // Nearby colleges
  nearbyColleges: [],
  nearbyLoading: false,
  nearbyError: null,
  // Similar colleges
  similarColleges: [],
  similarLoading: false,
  similarError: null,
};

// ---------------------------
// Slice
// ---------------------------
const collegeSlice = createSlice({
  name: "college",
  initialState,
  reducers: {
    resetColleges: (state) => {
      state.colleges = [];
      state.totalPages = 0;
      state.currentPage = 1;
      state.totalColleges = 0;
      state.collegesError = null;
    },
    clearCollegeDetails: (state) => {
      state.selectedCollege = null;
      state.collegeDetails = null;
      state.collegeDetailsError = null;
      state.nearbyColleges = [];
      state.similarColleges = [];
    },
  },
  extraReducers: (builder) => {
    // Fetch Colleges
    builder
      .addCase(fetchColleges.pending, (state) => {
        state.collegesLoading = true;
        state.collegesError = null;
      })
      .addCase(fetchColleges.fulfilled, (state, action) => {
        state.collegesLoading = false;
        state.colleges = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalColleges = action.payload.totalColleges;
      })
      .addCase(fetchColleges.rejected, (state, action) => {
        state.collegesLoading = false;
        state.collegesError =
          (action.payload as string) || "Failed to fetch colleges";
      });

    // Fetch College By ID
    builder
      .addCase(fetchCollegeById.pending, (state) => {
        state.collegeDetailsLoading = true;
        state.collegeDetailsError = null;
      })
      .addCase(fetchCollegeById.fulfilled, (state, action) => {
        state.selectedCollege = action.payload;
        state.collegeDetailsLoading = false;
      })
      .addCase(fetchCollegeById.rejected, (state, action) => {
        state.collegeDetailsLoading = false;
        state.collegeDetailsError =
          (action.payload as string) || "Failed to fetch college";
      });

    // Fetch College By Slug
    builder
      .addCase(fetchCollegeBySlug.pending, (state) => {
        state.collegeDetailsLoading = true;
        state.collegeDetailsError = null;
      })
      .addCase(fetchCollegeBySlug.fulfilled, (state, action) => {
        state.selectedCollege = action.payload;
        state.collegeDetailsLoading = false;
      })
      .addCase(fetchCollegeBySlug.rejected, (state, action) => {
        state.collegeDetailsLoading = false;
        state.collegeDetailsError =
          (action.payload as string) || "Failed to fetch college";
      });

    // Fetch College Details
    builder
      .addCase(fetchCollegeDetails.pending, (state) => {
        state.collegeDetailsLoading = true;
        state.collegeDetailsError = null;
      })
      .addCase(fetchCollegeDetails.fulfilled, (state, action) => {
        state.collegeDetailsLoading = false;
        state.collegeDetails = action.payload;
      })
      .addCase(fetchCollegeDetails.rejected, (state, action) => {
        state.collegeDetailsLoading = false;
        state.collegeDetailsError =
          (action.payload as string) || "Failed to fetch college details";
      });

    // Fetch Recommended Colleges
    builder
      .addCase(fetchRecommendedColleges.pending, (state) => {
        state.recommendedLoading = true;
        state.recommendedError = null;
      })
      .addCase(fetchRecommendedColleges.fulfilled, (state, action) => {
        state.recommendedLoading = false;
        state.recommendedColleges = action.payload;
      })
      .addCase(fetchRecommendedColleges.rejected, (state, action) => {
        state.recommendedLoading = false;
        state.recommendedError =
          (action.payload as string) || "Failed to fetch recommended colleges";
      });

    // Fetch Nearby Colleges
    builder
      .addCase(fetchNearbyColleges.pending, (state) => {
        state.nearbyLoading = true;
        state.nearbyError = null;
      })
      .addCase(fetchNearbyColleges.fulfilled, (state, action) => {
        state.nearbyLoading = false;
        state.nearbyColleges = action.payload;
      })
      .addCase(fetchNearbyColleges.rejected, (state, action) => {
        state.nearbyLoading = false;
        state.nearbyError =
          (action.payload as string) || "Failed to fetch nearby colleges";
      });

    // Fetch Similar Colleges
    builder
      .addCase(fetchSimilarColleges.pending, (state) => {
        state.similarLoading = true;
        state.similarError = null;
      })
      .addCase(fetchSimilarColleges.fulfilled, (state, action) => {
        state.similarLoading = false;
        state.similarColleges = action.payload;
      })
      .addCase(fetchSimilarColleges.rejected, (state, action) => {
        state.similarLoading = false;
        state.similarError =
          (action.payload as string) || "Failed to fetch similar colleges";
      });
  },
});

// ---------------------------
// Exports
// ---------------------------
export const { resetColleges, clearCollegeDetails } = collegeSlice.actions;
export default collegeSlice.reducer;

// Selectors
export const selectColleges = (state: RootState) => state.college.colleges;
export const selectCollegesLoading = (state: RootState) =>
  state.college.collegesLoading;
export const selectCollegesError = (state: RootState) =>
  state.college.collegesError;
export const selectTotalPages = (state: RootState) => state.college.totalPages;
export const selectCurrentPage = (state: RootState) =>
  state.college.currentPage;
export const selectTotalColleges = (state: RootState) =>
  state.college.totalColleges;

// Single college selectors
export const selectSelectedCollege = (state: RootState) =>
  state.college.selectedCollege;
export const selectCollegeDetails = (state: RootState) =>
  state.college.collegeDetails;
export const selectCollegeDetailsLoading = (state: RootState) =>
  state.college.collegeDetailsLoading;
export const selectCollegeDetailsError = (state: RootState) =>
  state.college.collegeDetailsError;

// Recommended colleges selectors
export const selectRecommendedColleges = (state: RootState) =>
  state.college.recommendedColleges;
export const selectRecommendedLoading = (state: RootState) =>
  state.college.recommendedLoading;
export const selectRecommendedError = (state: RootState) =>
  state.college.recommendedError;

// Nearby colleges selectors
export const selectNearbyColleges = (state: RootState) =>
  state.college.nearbyColleges;
export const selectNearbyLoading = (state: RootState) =>
  state.college.nearbyLoading;
export const selectNearbyError = (state: RootState) =>
  state.college.nearbyError;

// Similar colleges selectors
export const selectSimilarColleges = (state: RootState) =>
  state.college.similarColleges;
export const selectSimilarLoading = (state: RootState) =>
  state.college.similarLoading;
export const selectSimilarError = (state: RootState) =>
  state.college.similarError;
