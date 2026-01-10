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

// MMMUT Predictor APIs
export const getMMMUTBranches = () => {
  return apiClient.get("/api/mmmut/branches");
};

export const predictMMMUT = (data: any) => {
  return apiClient.post("/api/mmmut/predict", data);
};

// HBTU Predictor API
export const predictHBTU = (data: any) => {
  return apiClient.post("/api/hbtu/predict", data);
};

// JAC Delhi Predictor APIs
export const getJACDelhiBranches = () => {
  return apiClient.get("/api/jac-delhi/branches");
};

export const predictJACDelhi = (data: any) => {
  return apiClient.post("/api/jac-delhi/predict", data);
};

// JAC Chandigarh Predictor APIs
export const getJACChandigarhInstitutes = () => {
  return apiClient.get("/api/jac-chandigarh/institutes");
};

export const getJACChandigarhBranches = () => {
  return apiClient.get("/api/jac-chandigarh/branches");
};

export const predictJACChandigarh = (data: any) => {
  return apiClient.post("/api/jac-chandigarh/predict", data);
};
