import React from "react";
import SubHeading from "@/components/sections/SubHeading";
import { Connectivity as ConnectivityType } from "@/store/types";
import { Bus, Train, Plane } from "lucide-react";

interface ConnectivityProps {
  connectivity: ConnectivityType[];
}

export default function Connectivity({ connectivity }: ConnectivityProps) {
  if (!connectivity || connectivity.length === 0) {
    return null;
  }

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "bus":
        return <Bus className="w-6 h-6" />;
      case "train":
      case "railway":
        return <Train className="w-6 h-6" />;
      case "airport":
      case "flight":
        return <Plane className="w-6 h-6" />;
      default:
        return <Bus className="w-6 h-6" />;
    }
  };

  return (
    <div className="py-12">
      <SubHeading
        align="left"
        top="How to Reach"
        bottom="Transportation and connectivity options"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {connectivity.map((item) => (
          <div
            key={item._id}
            className="p-6 rounded-lg border hover:shadow-lg transition-shadow"
            style={{ borderColor: "rgba(13, 58, 102, 0.2)" }}
          >
            <div className="flex items-start gap-4">
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: "rgba(13, 58, 102, 0.1)" }}
              >
                <div style={{ color: "var(--primary)" }}>
                  {getIcon(item.Type)}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1">
                  {item.Type}
                </h4>
                <p className="text-gray-600 mb-2">{item.Name}</p>
                <p className="text-sm text-gray-500">
                  Distance: {item.Distance_KM} km
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
