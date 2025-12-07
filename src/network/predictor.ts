import apiClient from "@/hooks/Axios";

export const predict = (data: any) => {
    return apiClient.post("/api/predictor/v2", data);
};