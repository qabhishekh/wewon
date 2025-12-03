import React from "react";
import SubHeading from "@/components/sections/SubHeading";
import { Fee as FeeType } from "@/store/types";

interface FeesStructureProps {
  fees: FeeType[];
}

export default function FeesStructure({ fees }: FeesStructureProps) {
  if (!fees || fees.length === 0) {
    return null;
  }

  // Group fees by category
  const feesByCategory: { [key: string]: FeeType[] } = {};
  fees.forEach((fee) => {
    if (!feesByCategory[fee.Category]) {
      feesByCategory[fee.Category] = [];
    }
    feesByCategory[fee.Category].push(fee);
  });

  // Calculate total fees
  const totalFees = fees.reduce((sum, fee) => sum + fee.Amount, 0);

  return (
    <div className="py-12">
      <SubHeading top="Fee Structure" bottom="Detailed breakdown of fees" />

      <div className="mt-8 space-y-6">
        {Object.entries(feesByCategory).map(([category, items]) => (
          <div key={category}>
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: "var(--primary)" }}
            >
              {category}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 border">Fee Component</th>
                    <th className="text-right p-3 border">Amount (₹)</th>
                    <th className="text-center p-3 border">Frequency</th>
                    <th className="text-center p-3 border">Refundable</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((fee) => (
                    <tr key={fee._id} className="hover:bg-gray-50">
                      <td className="p-3 border">{fee.Fee_Component}</td>
                      <td className="text-right p-3 border">
                        ₹{fee.Amount.toLocaleString("en-IN")}
                      </td>
                      <td className="text-center p-3 border">
                        {fee.Frequency}
                      </td>
                      <td className="text-center p-3 border">
                        {fee.Is_Refundable ? (
                          <span className="text-green-600 font-medium">
                            Yes
                          </span>
                        ) : (
                          <span className="text-red-600 font-medium">No</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-semibold">
                    <td className="p-3 border">Subtotal ({category})</td>
                    <td className="text-right p-3 border">
                      ₹
                      {items
                        .reduce((sum, fee) => sum + fee.Amount, 0)
                        .toLocaleString("en-IN")}
                    </td>
                    <td className="p-3 border" colSpan={2}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <div className="p-6 rounded-lg bg-primary/10 border-2 border-primary">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-primary">Total Fees</h3>
            <p className="text-3xl font-bold text-primary">
              ₹{totalFees.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
