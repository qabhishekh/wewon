"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Check, ShoppingCart, Loader2 } from "lucide-react";
import { PredictorProduct } from "@/data/counsellingProducts";
import { useAppSelector } from "@/store/hooks";
import {
  loadRazorpayScript,
  openRazorpayCheckout,
  getRazorpayKey,
  RazorpayOptions,
} from "@/lib/razorpay";
import { toast } from "sonner";
import Axios from "@/hooks/Axios";

interface PredictorCardProps {
  predictor: PredictorProduct;
  isPurchased?: boolean; // Keep for backward compatibility but not used
  onBuyNow?: (predictor: PredictorProduct) => void; // Keep for backward compatibility but not used
}

const PredictorCard: React.FC<PredictorCardProps> = ({ predictor }) => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to purchase");
      router.push("/auth");
      return;
    }

    try {
      setIsProcessing(true);

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Failed to load payment gateway");
        setIsProcessing(false);
        return;
      }

      // Create order
      const { data } = await Axios.post("/api/payment/create-order", {
        productId: predictor._id,
      });

      if (!data.success) {
        toast.error("Failed to create order");
        setIsProcessing(false);
        return;
      }

      // Open Razorpay checkout
      const options: RazorpayOptions = {
        key: getRazorpayKey(),
        amount: data.data.amount,
        currency: data.data.currency,
        name: "We Won Academy",
        description: predictor.title,
        order_id: data.data.id,
        prefill: {
          name: user?.userId?.name || "",
          email: user?.userId?.email || "",
          contact: user?.userId?.phone || "",
        },
        theme: {
          color: "#0f3a67",
        },
        handler: async (response: any) => {
          try {
            // Verify payment
            const verifyResponse = await Axios.post("/api/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResponse.data.success) {
              toast.success("Payment successful! Redirecting to predictor...");
              setTimeout(() => {
                router.push(`/${predictor.slug}`);
              }, 1500);
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Payment verification failed");
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            toast.info("Payment cancelled");
          },
        },
      };

      openRazorpayCheckout(options);
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(error.response?.data?.message || "Payment failed");
      setIsProcessing(false);
    }
  };

  const handleClick = () => {
    // Check if predictor is purchased
    if (predictor.purchased) {
      // Redirect to predictor page using slug
      router.push(`/${predictor.slug}`);
    } else {
      // Trigger payment flow
      handleBuyNow();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
    >
      {/* Card Header - Solid Blue Background */}
      <div className="bg-[#0f3a67] p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 text-8xl opacity-10 transform translate-x-4 -translate-y-4">
          {predictor.icon}
        </div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="text-4xl">{predictor.icon}</div>
            {/* Status Badge */}
            {predictor.purchased && (
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Check size={14} />
                Purchased
              </div>
            )}
          </div>
          <h3 className="text-xl font-bold mb-2">{predictor.title}</h3>
          <p className="text-sm opacity-90 line-clamp-2">
            {predictor.description}
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Features */}
        <div className="mb-6 flex-1">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            Key Features:
          </h4>
          <ul className="space-y-2">
            {predictor.displayFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <Check
                  size={16}
                  className="text-green-500 mt-0.5 flex-shrink-0"
                />
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price or Purchased Badge */}
        <div className="mb-4">
          {predictor.purchased ? (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-green-600">
                Purchased
              </span>
              <span className="text-lg text-gray-400 line-through">
                ₹{predictor.discountPrice || predictor.price}
              </span>
            </div>
          ) : (
            <div>
              {predictor.discountPrice ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#0f3a67]">
                    ₹{predictor.discountPrice}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ₹{predictor.price}
                  </span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                    {Math.round(
                      ((predictor.price - predictor.discountPrice) /
                        predictor.price) *
                        100
                    )}
                    % OFF
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-[#0f3a67]">
                  ₹{predictor.price}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={handleClick}
          disabled={isProcessing}
          className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer ${
            predictor.purchased
              ? "bg-green-600 hover:bg-green-700"
              : "bg-[#0f3a67] hover:bg-[#0a2847]"
          } ${isProcessing ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isProcessing ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Processing...
            </>
          ) : predictor.purchased ? (
            <>
              Use Predictor
              <ArrowRight size={18} />
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              Buy Now
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default PredictorCard;
