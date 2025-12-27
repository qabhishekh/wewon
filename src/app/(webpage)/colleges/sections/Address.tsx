import React from "react";
import SubHeading from "@/components/sections/SubHeading";
import { MapPin, Phone, Mail } from "lucide-react";

interface AddressProps {
  address: string;
  city?: string;
  state?: string;
  pincode?: string;
  phone?: string;
  email?: string;
}

export default function Address({
  address,
  city,
  state,
  pincode,
  phone,
  email,
}: AddressProps) {
  return (
    <div className="py-8">
      <SubHeading
        align="left"
        top="Address"
        bottom="College location and contact details"
      />

      <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-4">
          {/* Address */}
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[var(--primary)] mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-900 font-medium mb-1">Location</p>
              <p className="text-gray-700">
                {address}
                {city && `, ${city}`}
                {state && `, ${state}`}
                {pincode && ` - ${pincode}`}
              </p>
            </div>
          </div>

          {/* Phone */}
          {phone && (
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[var(--primary)] mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-900 font-medium mb-1">Phone</p>
                <a
                  href={`tel:${phone}`}
                  className="text-[var(--primary)] hover:underline"
                >
                  {phone}
                </a>
              </div>
            </div>
          )}

          {/* Email */}
          {email && (
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[var(--primary)] mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-900 font-medium mb-1">Email</p>
                <a
                  href={`mailto:${email}`}
                  className="text-[var(--primary)] hover:underline"
                >
                  {email}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
