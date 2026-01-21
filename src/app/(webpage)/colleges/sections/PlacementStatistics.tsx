import DynamicTable from "@/components/sections/DynamicTable";
import SubHeading from "@/components/sections/SubHeading";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface BranchData {
  branch: string;
  eligible: number;
  placed: number;
}
interface Branch {
  branch: string;
  placed: string;
}
interface Columns {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
}
interface Placed {
  branch: string;
  columns: Columns[];
  data: Branch[];
}

interface YearData {
  year: string | number;
  data: BranchData[];
  placed?: Placed[];
  median?: Placed[];
  highest?: Placed[];
  average?: Placed[];
}

interface PlacementStatisticsProps {
  title?: string;
  yearsData: YearData[];
  eligibleColor?: string;
  placedColor?: string;
  hideHeading?: boolean;
}

export default function PlacementStatistics({
  yearsData,
  eligibleColor,
  placedColor,
  hideHeading = false,
}: PlacementStatisticsProps) {
  const [activeYearIndex, setActiveYearIndex] = useState(0);

  const primaryColor = eligibleColor || "var(--primary)";
  const accentColor = placedColor || "#FF7A3D";

  const activeYear = yearsData[activeYearIndex];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <p className="font-semibold mb-2" style={{ color: "var(--primary)" }}>
            {label}
          </p>
          <p className="text-sm mb-1" style={{ color: primaryColor }}>
            <span className="font-semibold">Eligible:</span> {payload[0].value}
          </p>
          <p className="text-sm" style={{ color: accentColor }}>
            <span className="font-semibold">Placed:</span> {payload[1].value}
          </p>
          <p className="text-xs mt-2 text-gray-600">
            Placement Rate:{" "}
            {((payload[1].value / payload[0].value) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom label component for bar values
  const renderCustomBarLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
      <text
        x={x + width / 2}
        y={y - 5}
        fill="#1a1a1a"
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
      >
        {value}
      </text>
    );
  };

  return (
    <div className="w-full" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="w-full mx-auto">
        {/* Title */}
        {!hideHeading && <SubHeading top="Placements" align="left" />}
        <div className="bg-white rounded-2xl border border-[var(--border)] p-2 mb-6 overflow-x-auto mt-10">
          <div className="flex gap-2 min-w-max">
            {yearsData.map((yearData, index) => (
              <button
                key={yearData.year}
                onClick={() => setActiveYearIndex(index)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-all whitespace-nowrap ${
                  activeYearIndex === index
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                style={
                  activeYearIndex === index
                    ? { backgroundColor: "var(--primary)" }
                    : {}
                }
              >
                {yearData.year}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-3xl border border-[var(--border)] p-6 md:p-8 ">
          {/* Year Tabs */}

          {/* Chart */}
          <div className="w-full" style={{ minHeight: "400px" }}>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart
                data={activeYear.data}
                margin={{ top: 30, right: 30, left: 0, bottom: 20 }}
                barGap={8}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                  vertical={false}
                />
                <XAxis
                  dataKey="branch"
                  tick={{
                    fill: "#6B7280",
                    fontSize: 12,
                    fontFamily: "Poppins",
                  }}
                  axisLine={{ stroke: "#E5E7EB" }}
                  tickLine={false}
                />
                <YAxis
                  label={{
                    value: "No. of Students",
                    angle: -90,
                    position: "insideLeft",
                    style: {
                      fill: "#6B7280",
                      fontFamily: "Poppins",
                      fontSize: 14,
                    },
                  }}
                  tick={{
                    fill: "#6B7280",
                    fontSize: 12,
                    fontFamily: "Poppins",
                  }}
                  axisLine={{ stroke: "#E5E7EB" }}
                  tickLine={false}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(13, 58, 102, 0.05)" }}
                />
                <Legend
                  wrapperStyle={{
                    paddingTop: "20px",
                    fontFamily: "Poppins",
                    fontSize: "14px",
                  }}
                  iconType="square"
                  iconSize={12}
                />
                <Bar
                  dataKey="eligible"
                  fill={primaryColor}
                  name="Eligible"
                  radius={[8, 8, 0, 0]}
                  label={renderCustomBarLabel}
                  maxBarSize={60}
                />
                <Bar
                  dataKey="placed"
                  fill={accentColor}
                  name="Placed"
                  radius={[8, 8, 0, 0]}
                  label={renderCustomBarLabel}
                  maxBarSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4 py-6 border-y border-gray-200">
            <div className="text-center">
              <div
                className="text-2xl md:text-3xl font-bold"
                style={{ color: "var(--primary)" }}
              >
                {activeYear.data.reduce((sum, item) => sum + item.eligible, 0)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Total Eligible</div>
            </div>
            <div className="text-center">
              <div
                className="text-2xl md:text-3xl font-bold"
                style={{ color: accentColor }}
              >
                {activeYear.data.reduce((sum, item) => sum + item.placed, 0)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Total Placed</div>
            </div>
            <div className="text-center">
              <div
                className="text-2xl md:text-3xl font-bold"
                style={{ color: "var(--accent)" }}
              >
                {activeYear.data.length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Branches</div>
            </div>
            <div className="text-center">
              <div
                className="text-2xl md:text-3xl font-bold"
                style={{ color: "var(--accent)" }}
              >
                {(
                  (activeYear.data.reduce((sum, item) => sum + item.placed, 0) /
                    activeYear.data.reduce(
                      (sum, item) => sum + item.eligible,
                      0,
                    )) *
                  100
                ).toFixed(1)}
                %
              </div>
              <div className="text-sm text-gray-600 mt-1">Overall Rate</div>
            </div>
          </div>

          {activeYear.placed?.map((placedItem) => (
            <div key={placedItem.branch}>
              <h2 className="text-xl font-semibold mt-10 mb-4">
                {placedItem.branch}
              </h2>

              <DynamicTable
                columns={placedItem.columns}
                data={placedItem.data}
              />
            </div>
          ))}

          {activeYear?.median && (
            <SubHeading
              top="Median Package Offered (Branchwise)"
              align="left"
            />
          )}

          {activeYear?.median?.map((placedItem) => (
            <div key={placedItem.branch}>
              <h2 className="text-xl font-semibold mt-10 mb-4">
                {placedItem.branch}
              </h2>

              <DynamicTable
                columns={placedItem.columns}
                data={placedItem.data}
              />
            </div>
          ))}

          {activeYear?.highest && (
            <SubHeading
              top="Highest Package Offered (Branchwise)"
              align="left"
            />
          )}

          {activeYear?.highest?.map((placedItem) => (
            <div key={placedItem.branch}>
              <h2 className="text-xl font-semibold mt-10 mb-4">
                {placedItem.branch}
              </h2>

              <DynamicTable
                columns={placedItem.columns}
                data={placedItem.data}
              />
            </div>
          ))}

          {activeYear?.average && (
            <SubHeading
              top="Average Package Offered (Branchwise)"
              align="left"
            />
          )}

          {activeYear?.average?.map((placedItem) => (
            <div key={placedItem.branch}>
              <h2 className="text-xl font-semibold mt-10 mb-4">
                {placedItem.branch}
              </h2>

              <DynamicTable
                columns={placedItem.columns}
                data={placedItem.data}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
