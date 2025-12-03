"use client";
import React from "react";
import { X, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LockedContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuyNow: () => void;
  productTitle: string;
}

export default function LockedContentModal({
  isOpen,
  onClose,
  onBuyNow,
  productTitle,
}: LockedContentModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              {/* Lock Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-full flex items-center justify-center">
                  <Lock size={32} className="text-[var(--accent)]" />
                </div>
              </div>

              {/* Content */}
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">
                Content Locked
              </h2>
              <p className="text-center text-gray-600 mb-6">
                To access this material and all other exclusive content in{" "}
                <span className="font-semibold">{productTitle}</span>, please
                purchase the program.
              </p>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={onBuyNow}
                  className="w-full px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-lg hover:bg-[var(--primary)] transition-colors shadow-md"
                >
                  Buy Program Now
                </button>
                <button
                  onClick={onClose}
                  className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
