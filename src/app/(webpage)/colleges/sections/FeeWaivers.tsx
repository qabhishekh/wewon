import SubHeading from "@/components/sections/SubHeading";
import React from "react";

interface FeeWaiver {
  _id: string;
  instituteId: string;
  Waiver_Category_Name: string;
  Eligibility_Criteria: string;
  Waiver_Amount_Details: string;
}

interface FeeWaiversProps {
  feeWaivers: FeeWaiver[];
}

// Keywords for categorizing fee waivers vs scholarships
const FEE_WAIVER_KEYWORDS = [
  "tuition fee",
  "fee wavier",
  "tuition fee wavier",
  "fee waiver",
  "tuition fee waiver",
];

const SCHOLARSHIP_KEYWORDS = [
  "scholarship",
  "institute merit award",
  "earn while your learn",
  "earn while you learn",
];

const categorizeWaiver = (waiver: FeeWaiver): "fee_waiver" | "scholarship" => {
  const categoryName = waiver.Waiver_Category_Name.toLowerCase();

  // Check for fee waiver keywords
  for (const keyword of FEE_WAIVER_KEYWORDS) {
    if (categoryName.includes(keyword.toLowerCase())) {
      return "fee_waiver";
    }
  }

  // Check for scholarship keywords
  for (const keyword of SCHOLARSHIP_KEYWORDS) {
    if (categoryName.includes(keyword.toLowerCase())) {
      return "scholarship";
    }
  }

  // Default to fee waiver if no match
  return "fee_waiver";
};

const WaiverCard: React.FC<{ waiver: FeeWaiver; accentColor: string }> = ({
  waiver,
  accentColor,
}) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div className={`${accentColor} text-white px-6 py-4`}>
      <h3 className="text-lg font-semibold">{waiver.Waiver_Category_Name}</h3>
    </div>

    <div className="p-6 space-y-4">
      <div>
        <p className="text-sm text-gray-600 font-medium mb-2">
          Eligibility Criteria
        </p>
        <p className="text-gray-900 text-sm leading-relaxed">
          {waiver.Eligibility_Criteria}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-600 font-medium mb-2">Waiver Details</p>
        <p className="text-gray-900 text-sm leading-relaxed font-medium">
          {waiver.Waiver_Amount_Details}
        </p>
      </div>
    </div>
  </div>
);

const FeeWaivers: React.FC<FeeWaiversProps> = ({ feeWaivers }) => {
  if (!feeWaivers || feeWaivers.length === 0) {
    return null;
  }

  // Separate fee waivers and scholarships
  const feeWaiverItems = feeWaivers.filter(
    (waiver) => categorizeWaiver(waiver) === "fee_waiver",
  );
  const scholarshipItems = feeWaivers.filter(
    (waiver) => categorizeWaiver(waiver) === "scholarship",
  );

  return (
    <div className="py-8 space-y-12">
      {/* Fee Waivers Section */}
      {feeWaiverItems.length > 0 && (
        <div>
          <SubHeading align="left" top="Fee Waivers" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {feeWaiverItems.map((waiver) => (
              <WaiverCard
                key={waiver._id}
                waiver={waiver}
                accentColor="bg-[var(--primary)]"
              />
            ))}
          </div>
        </div>
      )}

      {/* Scholarships Section */}
      {scholarshipItems.length > 0 && (
        <div>
          <SubHeading align="left" top="Scholarships" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {scholarshipItems.map((waiver) => (
              <WaiverCard
                key={waiver._id}
                waiver={waiver}
                accentColor="bg-gradient-to-r from-amber-500 to-orange-500"
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> Please verify the latest fee waiver information
          and eligibility criteria with the college administration before
          applying.
        </p>
      </div>
    </div>
  );
};

export default FeeWaivers;
