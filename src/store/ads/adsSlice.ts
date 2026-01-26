import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import { AdsState, IAdData } from "../types/ads.types";
import { RootState } from "../store";
import apiClient from "@/hooks/Axios";

const initialState: AdsState = {
  ads: [],
  loading: false,
  error: null,
};

// Async thunk to fetch ads
export const fetchAds = createAsyncThunk(
  "ads/fetchAds",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/api/ads");
      // Assuming structure similar to other endpoints: { success: true, data: [...] }
      const data = response.data;
      return (data.data || data) as IAdData[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch ads",
      );
    }
  },
);

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAds.fulfilled,
        (state, action: PayloadAction<IAdData[]>) => {
          state.loading = false;
          state.ads = action.payload;
        },
      )
      .addCase(fetchAds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectAds = (state: RootState) => state.ads.ads;
export const selectAdsLoading = (state: RootState) => state.ads.loading;

export const selectAdByLocation = createSelector(
  [selectAds, (_state: RootState, location: string) => location],
  (ads: IAdData[], location: string) =>
    ads.filter((ad) => ad.location === location && ad.isActive),
);

export default adsSlice.reducer;
