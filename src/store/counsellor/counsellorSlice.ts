import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { AuthState, User } from "../types";
import {
  fetchUserProfile,
  loginUser,
  signupUser,
  updateCounsellorProfile,
  updateUserProfile,
} from "./counsellorThunk";

// ---------------------------
// Initial State
// ---------------------------

const initialState: AuthState = {
  user: {
    _id: "",
    userId: {
      _id: "",
      name: "",
      email: "",
      role: "",
      avatar: "",
      phone: "",
    },
    preferences: {
      preferredStates: [],
      preferredCollegeType: "any",
    },
    savedColleges: [],
    appliedColleges: [],
    exams: [],
    createdAt: "",
    updatedAt: "",
  },
  token: null,
  loading: true,
  btnloading: false,
  error: null,
  isAuthenticated: false,
};

// ---------------------------
// Slice
// ---------------------------
const counselloSlice = createSlice({
  name: "counsello",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {
        preferences: {
          preferredStates: [],
          preferredCollegeType: "any",
        },
        _id: "",
        userId: {
          _id: "",
          name: "",
          email: "",
          role: "",
          avatar: "",
          phone: "",
        },
        savedColleges: [],
        appliedColleges: [],
        exams: [],
        createdAt: "",
        updatedAt: "",
      };
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      window.location.href = "/auth";
      localStorage.removeItem("token");
    },
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
      }
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user.userId = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });

    // Signup
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Signup failed";
      });

    // Fetch User
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch failed";
        state.isAuthenticated = false;
      });

    // Update User
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user.userId = {
          ...action.payload,
        };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Profile update failed";
      });
    // UPDATE STUDENT PROFILE
    builder
      .addCase(updateCounsellorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCounsellorProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          const { userId, ...rest } = action.payload;
          state.user = { ...state.user, ...rest };
        }
      })
      .addCase(updateCounsellorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Profile update failed.";
      });
  },
});

// ---------------------------
// Exports
// ---------------------------
export const { logout, setCredentials } = counselloSlice.actions;
export default counselloSlice.reducer;

// Selectors
export const selectAuth = (state: RootState) => state.counsellor;
export const selectUser = (state: RootState) => state.counsellor.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.counsellor.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.counsellor.loading;
