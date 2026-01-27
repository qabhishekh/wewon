import apiClient from "@/hooks/Axios";

export interface CouponValidationResponse {
  couponCode: string;
  discountAmount: number;
  finalPrice: number;
  originalPrice: number;
}

export const validateCoupon = async (
  code: string,
  productId: string,
): Promise<CouponValidationResponse> => {
  const response = await apiClient.post("/api/coupons/validate", {
    code,
    productId,
  });

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to validate coupon");
  }

  return response.data.data;
};
