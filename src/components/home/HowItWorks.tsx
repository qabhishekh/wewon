import React from "react";
import { Eye, SquarePen, UserCheck } from "lucide-react";
import Heading from "./heading";
import Sections from "./sections";

const HowItWorks = () => {
  return (
    // Section with the light grey-blue background from the image
    <Sections>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
          {/* --- Left Column: Steps --- */}
          <div className="space-y-8 lg:space-y-10">
            <Heading text="How It Works" />

            {/* Step 1 */}
            <div className="flex items-center justify-start gap-4 sm:gap-6">
              <span className="text-5xl sm:text-6xl font-bold text-[var(--muted-text)]">
                01
              </span>
              <div className="bg-[var(--primary)] text-white rounded-xl p-4 sm:p-5 flex items-center space-x-3 shadow-md w-full max-w-md">
                <SquarePen className="w-6 h-6 flex-shrink-0" />
                <span className="text-lg sm:text-xl font-semibold">
                  Enter Your Rank
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center justify-end gap-4 sm:gap-6">
              <div className="bg-[var(--primary)] text-white rounded-xl p-4 sm:p-5 flex items-center space-x-3 shadow-md w-full max-w-md">
                <Eye className="w-6 h-6 flex-shrink-0" />
                <span className="text-lg sm:text-xl font-semibold">
                  See Your College Options
                </span>
              </div>
              <span className="text-5xl sm:text-6xl font-bold text-[var(--muted-text)]">
                02
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex items-center justify-start gap-4 sm:gap-6">
              <span className="text-5xl sm:text-6xl font-bold text-[var(--muted-text)]">
                03
              </span>
              <div className="bg-[var(--primary)] text-white rounded-xl p-4 sm:p-5 flex items-center space-x-3 shadow-md w-full max-w-md">
                <UserCheck className="w-6 h-6 flex-shrink-0" />
                <span className="text-lg sm:text-xl font-semibold">
                  Get Expert Guidance
                </span>
              </div>
            </div>
          </div>

          {/* --- Right Column: Images & Card (Desktop) --- */}
          <div className="relative mt-8 lg:mt-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="order-2 lg:order-1">
                <img
                  src="/howitworks/1.png"
                  alt="Group of students"
                  className="w-full h-full md:max-h-[70%] object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div className="order-2">
                <img
                  src="/howitworks/2.png"
                  alt="Smiling student"
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>

            {/* Happy Students Card (Absolutely Positioned) */}
            <div className="md:absolute bottom-4 left-1/4 w-auto bg-white p-3 rounded-2xl shadow-xl flex items-center space-x-3 z-30">
              <div className="flex -space-x-3">
                <img
                  src="/avatar/Avatar.png"
                  alt="avatar 1"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="/avatar/Avatar.png"
                  alt="avatar 2"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="/avatar/Avatar.png"
                  alt="avatar 3"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-lg text-gray-900">1M+</p>
                <p className="text-sm text-gray-500">Happy Students</p>
              </div>
            </div>
          </div>

          {/* --- Right Column: Mobile-only stack --- */}
        </div>
      </div>
    </Sections>
  );
};

export default HowItWorks;
