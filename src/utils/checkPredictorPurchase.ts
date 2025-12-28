import { Order } from "@/store/types";

/**
 * Check if a user has purchased a specific predictor
 * @param predictorId - The ID of the predictor to check
 * @param userOrders - Array of user's orders
 * @returns boolean indicating if the predictor is purchased and valid
 */
export const checkPredictorPurchase = (
  predictorId: string,
  userOrders: Order[]
): boolean => {
  if (!userOrders || userOrders.length === 0) {
    return false;
  }

  // Check if any order contains this predictor and is valid
  const hasPurchase = userOrders.some((order) => {
    // Check if order is completed
    if (order.paymentStatus !== "completed") {
      return false;
    }

    // Check if order is still valid (not expired)
    const validUntil = new Date(order.validUntil);
    const now = new Date();
    if (validUntil < now) {
      return false;
    }

    // Check if the order's product matches the predictor
    // This assumes predictor purchases are tracked via productId
    // You may need to adjust this logic based on your actual data structure
    return order.productId === predictorId;
  });

  return hasPurchase;
};

/**
 * Get all purchased predictor IDs for a user
 * @param userOrders - Array of user's orders
 * @returns Array of purchased predictor IDs
 */
export const getPurchasedPredictorIds = (userOrders: Order[]): string[] => {
  if (!userOrders || userOrders.length === 0) {
    return [];
  }

  const purchasedIds = userOrders
    .filter((order) => {
      // Only include completed orders
      if (order.paymentStatus !== "completed") {
        return false;
      }

      // Only include non-expired orders
      const validUntil = new Date(order.validUntil);
      const now = new Date();
      return validUntil >= now;
    })
    .map((order) => order.productId);

  // Remove duplicates
  return Array.from(new Set(purchasedIds));
};
