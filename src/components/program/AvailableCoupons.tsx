"use client";
import React, { useEffect } from "react";
import { Tag, Clock } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAvailableCoupons } from "@/store/coupon/couponThunk";
import {
  selectAvailableCoupons,
  selectCouponLoading,
} from "@/store/coupon/couponSlice";

interface AvailableCouponsProps {
  productId: string;
  onCouponSelect: (code: string) => void;
}

export default function AvailableCoupons({
  productId,
  onCouponSelect,
}: AvailableCouponsProps) {
  const dispatch = useAppDispatch();
  const coupons = useAppSelector(selectAvailableCoupons);
  const loading = useAppSelector(selectCouponLoading);

  useEffect(() => {
    dispatch(fetchAvailableCoupons(productId));
  }, [dispatch, productId]);

  if (loading) {
    return (
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-700">
          Available Coupons
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="p-4 border border-gray-200 rounded-lg animate-pulse"
            >
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (coupons.length === 0) {
    return null;
  }

  const formatDiscount = (coupon: (typeof coupons)[0]) => {
    if (coupon.discountType === "percentage") {
      return `${coupon.discountValue}% OFF`;
    }
    return `₹${coupon.discountValue} OFF`;
  };

  const isExpired = (validUntil: string) => {
    return new Date(validUntil) < new Date();
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700">
        Available Coupons - Click to Apply
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {coupons.map((coupon) => {
          const expired = isExpired(coupon.validUntil);

          return (
            <button
              key={coupon._id}
              onClick={() => !expired && onCouponSelect(coupon.code)}
              disabled={expired}
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                expired
                  ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                  : "border-dashed border-[var(--accent)] bg-[var(--accent)]/5 hover:bg-[var(--accent)]/10 hover:border-solid"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Tag size={18} className="text-[var(--accent)]" />
                  <span className="font-bold text-lg text-gray-800">
                    {coupon.code}
                  </span>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                  {formatDiscount(coupon)}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                {coupon.discountType === "percentage"
                  ? `Get ${coupon.discountValue}% off`
                  : `Save ₹${coupon.discountValue}`}
                {coupon.maxDiscountAmount > 0 &&
                  coupon.discountType === "percentage" &&
                  ` (Max ₹${coupon.maxDiscountAmount})`}
              </p>

              {coupon.minPurchaseAmount > 0 && (
                <p className="text-xs text-gray-500 mb-1">
                  Min. purchase: ₹{coupon.minPurchaseAmount}
                </p>
              )}

              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock size={12} />
                <span>
                  {expired
                    ? "Expired"
                    : `Valid until ${new Date(
                        coupon.validUntil
                      ).toLocaleDateString()}`}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
