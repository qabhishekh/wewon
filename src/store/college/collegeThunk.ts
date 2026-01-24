import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/hooks/Axios";
import { College, CollegeDetails } from "../types";

// Fetch Colleges with pagination, search, and filters
export const fetchColleges = createAsyncThunk(
  "college/fetchColleges",
  async (
    params: {
      page?: number;
      limit?: number;
      searchQuery?: string;
      instituteTypes?: string[];
      cities?: string[];
    } = {},
    { rejectWithValue },
  ) => {
    try {
      const {
        page = 1,
        limit = 10,
        searchQuery = "",
        instituteTypes = [],
        cities = [],
      } = params;

      // Build query parameters
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (searchQuery) {
        queryParams.append("search", searchQuery);
      }

      // Add institute type filter (API expects 'Type')
      // Append each type as a separate query param for multiple selections
      if (instituteTypes.length > 0) {
        instituteTypes.forEach((type) => {
          queryParams.append("type", type);
        });
      }

      // Add city filter
      if (cities.length > 0) {
        cities.forEach((city) => {
          queryParams.append("city", city);
        });
      }

      const response = await apiClient.get(
        `/api/colleges?${queryParams.toString()}`,
      );

      return {
        data: response.data.data as College[],
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
        totalColleges: response.data.totalColleges,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch colleges",
      );
    }
  },
);

// Fetch Recommended Colleges
export const fetchRecommendedColleges = createAsyncThunk(
  "college/fetchRecommendedColleges",
  async (limit: number = 4, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        isRecommended: "true",
        limit: limit.toString(),
        page: "1",
      });

      const response = await apiClient.get(
        `/api/colleges?${queryParams.toString()}`,
      );

      return response.data.data as College[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch recommended colleges",
      );
    }
  },
);

// Fetch Nearby Colleges
export const fetchNearbyColleges = createAsyncThunk(
  "college/fetchNearbyColleges",
  async (collegeId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/api/colleges/nearby/${collegeId}`);
      if (!response.data.success) {
        return rejectWithValue(
          response.data.message || "Failed to fetch nearby colleges",
        );
      }
      return response.data.data as College[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch nearby colleges",
      );
    }
  },
);

// Fetch Similar Colleges
export const fetchSimilarColleges = createAsyncThunk(
  "college/fetchSimilarColleges",
  async (collegeId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(
        `/api/colleges/similar/${collegeId}`,
      );
      if (!response.data.success) {
        return rejectWithValue(
          response.data.message || "Failed to fetch similar colleges",
        );
      }
      return response.data.data as College[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch similar colleges",
      );
    }
  },
);

// Fetch single college by ID
export const fetchCollegeById = createAsyncThunk(
  "college/fetchCollegeById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/api/colleges/${id}`);

      if (!response.data.success) {
        return rejectWithValue(response.data.message || "College not found");
      }

      return response.data.data as College;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch college",
      );
    }
  },
);

// Fetch single college by Slug
export const fetchCollegeBySlug = createAsyncThunk(
  "college/fetchCollegeBySlug",
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/api/colleges/slug/${slug}`);

      if (!response.data.success) {
        return rejectWithValue(response.data.message || "College not found");
      }

      return response.data.data as College;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch college",
      );
    }
  },
);

// Fetch all college details (10 endpoints in parallel)
export const fetchCollegeDetails = createAsyncThunk(
  "college/fetchCollegeDetails",
  async (instituteId: string, { rejectWithValue }) => {
    try {
      const detailTypes = [
        "admission-rules",
        "connectivity",
        "courses",
        "facilities",
        "fees",
        "fee-waivers",
        "placements",
        "rankings",
        "seat-matrix",
        "social-media",
      ];

      // Fetch all detail types in parallel
      const promises = detailTypes.map(
        (type) =>
          apiClient
            .get(`/api/colleges/${instituteId}/${type}`)
            .then((res) => ({ type, data: res.data.data }))
            .catch(() => ({ type, data: [] })), // Return empty array on error
      );

      const results = await Promise.all(promises);

      // Transform results into CollegeDetails object
      const collegeDetails: CollegeDetails = {
        admissionRules: [],
        connectivity: [],
        courses: [],
        facilities: [],
        fees: [],
        feeWaivers: [],
        placements: [],
        rankings: [],
        seatMatrix: [],
        socialMedia: [],
      };

      results.forEach((result) => {
        switch (result.type) {
          case "admission-rules":
            collegeDetails.admissionRules = result.data;
            break;
          case "connectivity":
            collegeDetails.connectivity = result.data;
            break;
          case "courses":
            collegeDetails.courses = result.data;
            break;
          case "facilities":
            collegeDetails.facilities = result.data;
            break;
          case "fees":
            collegeDetails.fees = result.data;
            break;
          case "fee-waivers":
            collegeDetails.feeWaivers = result.data;
            break;
          case "placements":
            collegeDetails.placements = result.data;
            break;
          case "rankings":
            collegeDetails.rankings = result.data;
            break;
          case "seat-matrix":
            collegeDetails.seatMatrix = result.data;
            break;
          case "social-media":
            collegeDetails.socialMedia = result.data;
            break;
        }
      });

      return collegeDetails;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch college details",
      );
    }
  },
);

// Keep existing auth thunks - they should be imported from auth folder if needed
// export { loginUser, signupUser, fetchUserProfile, updateUserProfile, updateCounsellorProfile } from "../auth/authThunk";
