"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { predictJEEEarly } from "@/network/predictor";
import options from "./data/options.json";
import JEEEarlyPredictionResults from "./JEEEarlyPredictionResults";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/auth/authSlice";
import { fetchUserOrders } from "@/store/order/orderThunk";
import { selectUserOrders } from "@/store/order/orderSlice";
import { getPredictorBySlug } from "@/data/counsellingProducts";
import PredictorPaymentModal from "./PredictorPaymentModal";

const PRODUCT_SLUG = "jee-early-predictor";
const product = getPredictorBySlug(PRODUCT_SLUG);

export default function JEEEarlyPredictor() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const userOrders = useAppSelector(selectUserOrders);

  const [formData, setFormData] = useState({
    percentile: "",
    category: "OPEN",
    gender: "Male",
    homeState: "",
    instituteType: "",
    branchGroup: [],
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [checkingPurchase, setCheckingPurchase] = useState(true);
  const resultsRef = useRef(null);

  // Check if user has purchased the product
  useEffect(() => {
    const checkPurchaseStatus = async () => {
      // If product is free, consider it purchased
      if (product && product.price === 0 && product.discountPrice === 0) {
        setHasPurchased(true);
        setCheckingPurchase(false);
        return;
      }

      // If user is not logged in, don't fetch orders
      if (!user) {
        setHasPurchased(false);
        setCheckingPurchase(false);
        return;
      }

      // Only fetch orders when user is logged in
      try {
        
        console.log(user);
        
        await dispatch(fetchUserOrders()).unwrap();
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setCheckingPurchase(false);
      }
    };

    checkPurchaseStatus();
  }, [user, dispatch]);

  // Update hasPurchased when userOrders change
  useEffect(() => {
    if (product && product._id && userOrders.length > 0) {
      const isPurchased = userOrders.some(
        (order) =>
          order.product?._id === product._id && order.status === "completed",
      );
      setHasPurchased(isPurchased);
    }
  }, [userOrders]);

  // Auto-scroll to results when they become available
  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [results]);

  const handleChange = (e) => {
    const { id, value, type, selectedOptions } = e.target;

    // Handle percentile validation
    if (id === "percentile") {
      if (value === "") {
        setFormData((prev) => ({ ...prev, [id]: value }));
        return;
      }

      // Allow decimal percentile values between 0 and 100
      const numValue = parseFloat(value);
      if (isNaN(numValue) || numValue < 0 || numValue > 100) {
        return;
      }
      setFormData((prev) => ({ ...prev, [id]: value }));
      return;
    }

    // Handle multi-select for branch groups
    if (id === "branchGroup" && selectedOptions) {
      const selectedValues = Array.from(
        selectedOptions,
        (option) => option.value,
      );
      setFormData((prev) => ({ ...prev, [id]: selectedValues }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleGenderChange = (gender) => {
    setFormData((prev) => ({
      ...prev,
      gender,
    }));
  };

  const handleBranchSelect = (branch) => {
    setFormData((prev) => {
      const currentBranches = prev.branchGroup || [];
      if (currentBranches.includes(branch)) {
        return {
          ...prev,
          branchGroup: currentBranches.filter((b) => b !== branch),
        };
      } else {
        return {
          ...prev,
          branchGroup: [...currentBranches, branch],
        };
      }
    });
  };

  const validateForm = () => {
    // Validate percentile
    const percentileNum = parseFloat(formData.percentile);
    if (isNaN(percentileNum) || percentileNum < 0 || percentileNum > 100) {
      toast.error("Please enter a valid percentile between 0 and 100");
      return false;
    }

    // Validate home state
    if (!formData.homeState) {
      toast.error("Please select your home state");
      return false;
    }

    return true;
  };

  const fetchPredictions = async () => {
    setLoading(true);
    setResults(null);

    try {
      const payload = {
        percentile: parseFloat(formData.percentile),
        gender: formData.gender,
        category: formData.category,
        homeState: formData.homeState,
        instituteType: formData.instituteType || undefined,
        branchGroup:
          formData.branchGroup.length > 0 ? formData.branchGroup : undefined,
      };

      console.log("Sending payload:", payload);
      const response = await predictJEEEarly(payload);
      console.log("Prediction response:", response.data);
      setResults(response.data);
    } catch (error) {
      console.error("Prediction error:", error);
      toast.error("Failed to get prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Check if user is logged in
    if (!user) {
      toast.error("Please login to get predictions");
      return;
    }

    // Check if user has purchased
    if (
      !hasPurchased &&
      product &&
      (product.price > 0 ||
        (product.discountPrice && product.discountPrice > 0))
    ) {
      setShowPaymentModal(true);
      return;
    }

    // User has purchased, fetch predictions
    await fetchPredictions();
  };

  const handlePaymentSuccess = () => {
    setHasPurchased(true);
    setShowPaymentModal(false);
    // Automatically fetch predictions after successful payment
    fetchPredictions();
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 my-6 sm:my-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        {/* Left Column: Steps */}
        <div className="flex flex-col justify-center space-y-3 sm:space-y-6">
          {/* Thumbnail Image - 16:9 ratio */}
          {product?.thumbnail && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {product.title}
                </h2>
                <p className="text-sm text-white/80 mt-1 line-clamp-2">
                  {product.description}
                </p>
              </div>
            </div>
          )}
          <div className="p-3 sm:p-6 bg-[var(--background)] border border-[var(--border)] rounded-lg sm:rounded-xl shadow-sm">
            <h3 className="text-base sm:text-xl font-semibold text-[var(--foreground)]">
              Enter your JEE Mains Percentile
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted-text)] mt-1">
              Get your estimated All India Rank instantly
            </p>
          </div>
          <div className="p-3 sm:p-6 bg-[var(--background)] border border-[var(--border)] rounded-lg sm:rounded-xl shadow-sm">
            <h3 className="text-base sm:text-xl font-semibold text-[var(--foreground)]">
              Add your preferences
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted-text)] mt-1">
              Category, gender, and home state
            </p>
          </div>
          <div className="p-3 sm:p-6 bg-[var(--background)] border border-[var(--border)] rounded-lg sm:rounded-xl shadow-sm">
            <h3 className="text-base sm:text-xl font-semibold text-[var(--foreground)]">
              Get early predictions
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted-text)] mt-1">
              Plan your college choices before official ranks
            </p>
          </div>
          <p className="text-xs text-[var(--muted-text)] px-2">
            We never share your information. You can update details anytime.
          </p>
        </div>

        {/* Right Column: Predictor Form */}
        <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--primary)]">
              JEE EARLY PREDICTOR
            </h2>
            <span className="bg-[var(--light-blue)] text-[var(--primary)] text-[10px] sm:text-xs font-semibold px-2 sm:px-4 py-1 sm:py-2 rounded-full whitespace-nowrap w-fit">
              Predict before official ranks!
            </span>
          </div>

          {/* Form */}
          <form className="space-y-3 sm:space-y-5" onSubmit={handleSubmit}>
            {/* Percentile */}
            <div>
              <label
                htmlFor="percentile"
                className="block text-xs sm:text-sm font-medium text-[var(--foreground)] mb-1 sm:mb-1.5"
              >
                Enter Your Percentile (Required)
              </label>
              <input
                type="number"
                step="0.01"
                id="percentile"
                value={formData.percentile}
                onChange={handleChange}
                placeholder="98.5"
                min="0"
                max="100"
                required
                onWheel={(e) => e.currentTarget.blur()}
                className="w-full p-2 sm:p-3 text-sm sm:text-base border border-[var(--border)] rounded-lg shadow-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition placeholder:text-[var(--muted-text)]"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-[var(--foreground)] mb-1 sm:mb-1.5">
                Gender
              </label>
              <div className="flex space-x-1.5 sm:space-x-2">
                {options.genders.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleGenderChange(option.value)}
                    className={`flex-1 p-2 sm:p-3 border rounded-lg text-xs sm:text-sm font-medium transition ${
                      formData.gender === option.value
                        ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                        : "bg-white text-[var(--muted-text)] border-[var(--border)] hover:bg-[var(--muted-background)]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-xs sm:text-sm font-medium text-[var(--foreground)] mb-1 sm:mb-1.5"
              >
                Select Your Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 text-sm sm:text-base border border-[var(--border)] rounded-lg shadow-sm bg-white text-[var(--muted-text)] focus:text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition"
              >
                {options.categories.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Home State */}
            <div>
              <label
                htmlFor="homeState"
                className="block text-xs sm:text-sm font-medium text-[var(--foreground)] mb-1 sm:mb-1.5"
              >
                Select Your Home State
              </label>
              <select
                required
                id="homeState"
                value={formData.homeState}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 text-sm sm:text-base border border-[var(--border)] rounded-lg shadow-sm bg-white text-[var(--muted-text)] focus:text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition"
              >
                <option value="">Select Your Home State</option>
                {options.states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* Institute Type (Optional) */}
            <div>
              <label
                htmlFor="instituteType"
                className="block text-xs sm:text-sm font-medium text-[var(--foreground)] mb-1 sm:mb-1.5"
              >
                Institute Type (Optional)
              </label>
              <select
                id="instituteType"
                value={formData.instituteType}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 text-sm sm:text-base border border-[var(--border)] rounded-lg shadow-sm bg-white text-[var(--muted-text)] focus:text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition"
              >
                <option value="">All</option>
                {options.instituteTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Branch Group (Optional - Multi-select chips) */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-[var(--foreground)] mb-1 sm:mb-1.5">
                Branch Group (Optional)
              </label>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 p-2 sm:p-3 border border-[var(--border)] rounded-lg bg-white max-h-32 overflow-y-auto">
                {options.branchGroups
                  .filter(
                    (group) => group !== "Mining / Geo" && group !== "Mining",
                  )
                  .map((group) => (
                    <button
                      key={group}
                      type="button"
                      onClick={() => handleBranchSelect(group)}
                      className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition ${
                        formData.branchGroup.includes(group)
                          ? "bg-[var(--primary)] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {group}
                    </button>
                  ))}
              </div>
              {formData.branchGroup.length > 0 && (
                <p className="text-[10px] sm:text-xs text-[var(--muted-text)] mt-1">
                  Selected: {formData.branchGroup.join(", ")}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--primary)] text-white font-semibold p-2.5 sm:p-3.5 text-sm sm:text-base rounded-lg shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Predicting..." : "Get Early Predictions"}
              </button>
            </div>

            {/* Footer Text */}
            <p className="text-center text-[10px] sm:text-xs text-[var(--muted-text)] pt-2">
              Powered by CSAB counselling data and dynamic rank calculation
            </p>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div ref={resultsRef}>
        {results && (
          <JEEEarlyPredictionResults
            results={results}
            userGender={formData.gender}
            calculatedRank={results.calculatedRank}
            percentile={formData.percentile}
          />
        )}
      </div>

      {/* Payment Modal */}
      {product && (
        <PredictorPaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onPaymentSuccess={handlePaymentSuccess}
          product={product}
        />
      )}
    </div>
  );
}
