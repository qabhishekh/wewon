"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Predictor } from "@/data/predictors";

interface PredictorCardProps {
  predictor: Predictor;
  isPurchased?: boolean; // Keep for backward compatibility but not used
  onBuyNow?: (predictor: Predictor) => void; // Keep for backward compatibility but not used
}

const PredictorCard: React.FC<PredictorCardProps> = ({ predictor }) => {
  const router = useRouter();

  const handleClick = () => {
    // Always redirect to predictor page (all predictors are free)
    router.push(predictor.route);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full cursor-pointer"
      onClick={handleClick}
    >
      {/* Card Header - Solid Blue Background */}
      <div className="bg-[#0f3a67] p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 text-8xl opacity-10 transform translate-x-4 -translate-y-4">
          {predictor.icon}
        </div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="text-4xl">{predictor.icon}</div>
            {/* Free Badge */}
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Check size={14} />
              Free
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">{predictor.shortName}</h3>
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
            {predictor.features.map((feature, index) => (
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

        {/* Free Badge */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-green-600">FREE</span>
            <span className="text-sm text-gray-500">No payment required</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleClick}
          className="w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 bg-[#0f3a67] hover:bg-[#0a2847] shadow-lg hover:shadow-xl"
        >
          Use Predictor
          <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default PredictorCard;
