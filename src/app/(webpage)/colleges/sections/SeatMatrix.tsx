import React from "react";

interface SeatMatrixEntry {
  _id: string;
  instituteId: string;
  Degree: string;
  Branch: string;
  Seats_Gender_Neutral: number;
  Seats_Female_Only: number;
  Total_Seats: number;
  Change_Trend: string;
}

interface SeatMatrixProps {
  seatMatrix: SeatMatrixEntry[];
}

const SeatMatrix: React.FC<SeatMatrixProps> = ({ seatMatrix }) => {
  if (!seatMatrix || seatMatrix.length === 0) {
    return null;
  }

  // Group by degree
  const groupedByDegree = seatMatrix.reduce((acc, entry) => {
    if (!acc[entry.Degree]) {
      acc[entry.Degree] = [];
    }
    acc[entry.Degree].push(entry);
    return acc;
  }, {} as { [key: string]: SeatMatrixEntry[] });

  const getTrendColor = (trend: string) => {
    switch (trend.toLowerCase()) {
      case "increased":
        return "text-green-600 bg-green-50";
      case "decreased":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-[var(--primary)] mb-6">
        Seat Matrix
      </h2>

      <div className="space-y-6">
        {Object.entries(groupedByDegree).map(([degree, entries]) => (
          <div
            key={degree}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="bg-[var(--primary)] text-white px-6 py-3">
              <h3 className="text-xl font-semibold">{degree}</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Branch
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Gender Neutral
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Female Only
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Total Seats
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {entries.map((entry) => (
                    <tr key={entry._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {entry.Branch}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 text-center">
                        {entry.Seats_Gender_Neutral}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 text-center">
                        {entry.Seats_Female_Only}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-center">
                        {entry.Total_Seats}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getTrendColor(
                            entry.Change_Trend
                          )}`}
                        >
                          {entry.Change_Trend}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  Total Branches: {entries.length}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  Total Seats:{" "}
                  {entries.reduce((sum, e) => sum + e.Total_Seats, 0)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatMatrix;
