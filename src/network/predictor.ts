import apiClient from "@/hooks/Axios";

export const predict = (data: any) => {
  return apiClient.post("/api/predictor/v2", data);
};

// UPTAC Predictor APIs
export const getUPTACInstitutes = (type: string) => {
  return apiClient.get(`/api/uptac/institutes/${type}`);
};

export const getUPTACBranches = () => {
  return apiClient.get("/api/uptac/branches");
};

export const predictUPTAC = (data: any) => {
  return apiClient.post("/api/uptac/predict", data);
};
