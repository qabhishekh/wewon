"use client";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { CouponValidationResponse } from "@/store/types";
import CouponInput from "./CouponInput";
import CheckoutSummary from "./CheckoutSummary";
import RazorpayPayment from "./RazorpayPayment";
import PaymentSuccessModal from "./PaymentSuccessModal";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { downloadInvoice } from "@/store/order/orderThunk";

interface CheckoutPageProps {
  productId: string;
  productName: string;
  productType: "counseling" | "mentorship";
  productPrice: number;
  productSlug: string;
  onBack: () => void;
}

export default function CheckoutPage({
  productId,
  productName,
  productType,
  productPrice,
  productSlug,
  onBack,
}: CheckoutPageProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [appliedCoupon, setAppliedCoupon] =
    useState<CouponValidationResponse | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [completedOrderId, setCompletedOrderId] = useState<string>("");
  const [whatsappLink, setWhatsappLink] = useState<string>("");

  const handleCouponApplied = (validation: CouponValidationResponse) => {
    setAppliedCoupon(validation);
  };

  const handleCouponRemoved = () => {
    setAppliedCoupon(null);
  };

  const handlePaymentSuccess = (orderId: string) => {
    setCompletedOrderId(orderId);
    // TODO: Fetch WhatsApp link from order details
    setWhatsappLink("https://wa.me/1234567890"); // Placeholder
    setShowSuccessModal(true);
  };

  const handlePaymentFailure = (error: string) => {
    console.error("Payment failed:", error);
  };

  const handleDownloadInvoice = async () => {
    if (completedOrderId) {
      await dispatch(downloadInvoice(completedOrderId));
    }
  };

  const handleViewProgram = () => {
    setShowSuccessModal(false);
    router.push(`/counseling/${productSlug}`);
  };

  const finalAmount = appliedCoupon
    ? appliedCoupon.finalPrice + (appliedCoupon.finalPrice * 18) / 100
    : productPrice + (productPrice * 18) / 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--accent)] mb-6 transition-colors font-semibold"
        >
          <ArrowLeft size={20} />
          Back to Program
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Checkout
          </h1>
          <p className="text-gray-600">
            Complete your purchase to unlock full access
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Coupon & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Coupon Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Apply Coupon
              </h2>

              <CouponInput
                productId={productId}
                productPrice={productPrice}
                onCouponApplied={handleCouponApplied}
                onCouponRemoved={handleCouponRemoved}
              />

              <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-600">
                  💡 <strong>Tip:</strong> Enter your coupon code above to get
                  instant discounts on your purchase!
                </p>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Payment Details
              </h2>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Secure Payment:</strong> Your payment information is
                    encrypted and secure. We use Razorpay for safe transactions.
                  </p>
                </div>

                <RazorpayPayment
                  productId={productId}
                  productName={productName}
                  productType={productType}
                  amount={finalAmount}
                  couponCode={appliedCoupon?.couponCode}
                  onSuccess={handlePaymentSuccess}
                  onFailure={handlePaymentFailure}
                />

                <p className="text-xs text-gray-500 text-center">
                  By completing this purchase, you agree to our Terms of Service
                  and Privacy Policy
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <CheckoutSummary
                programName={productName}
                originalPrice={productPrice}
                appliedCoupon={appliedCoupon}
                taxPercentage={18}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <PaymentSuccessModal
        isOpen={showSuccessModal}
        whatsappLink={whatsappLink}
        orderId={completedOrderId}
        onClose={() => setShowSuccessModal(false)}
        onDownloadInvoice={handleDownloadInvoice}
        onViewProgram={handleViewProgram}
      />
    </div>
  );
}
