import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import type { FormData } from "../page"; // 👈 import the type from parent

interface ContactUsProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit?: (data: FormData) => void;
}

export default function ContactUs({
  formData,
  setFormData,
  onSubmit,
}: ContactUsProps) {
  const email = "collegeskhojoyt@gmail.com";
  const phone = "+91 9532845978";
  const address = "123 Student Lane, Jaipur, Rajasthan, India";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  return (
    <div
      className="pt-8 md:pt-12 bg-background px-4 md:px-0"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Contact Info */}
        <div
          className="rounded-3xl md:rounded-r-3xl md:rounded-l-none p-6 md:p-8 lg:p-12 text-white"
          style={{ backgroundColor: "var(--primary)" }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Contact us
          </h1>
          <p className="text-base md:text-lg lg:text-xl mb-8 md:mb-12 opacity-90">
            Have a question? Need Some Help? Or Just want to say hello?
          </p>

          <div className="space-y-5 md:space-y-6">
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 md:gap-4 hover:opacity-80 transition-opacity"
            >
              <Mail className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              <span className="text-base md:text-lg underline break-all">{email}</span>
            </a>

            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 md:gap-4 hover:opacity-80 transition-opacity"
            >
              <Phone className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              <span className="text-base md:text-lg underline">{phone}</span>
            </a>

            {/* <div className="flex items-start gap-3 md:gap-4">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 mt-1" />
              <span className="text-base md:text-lg leading-relaxed">{address}</span>
            </div> */}
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-background px-4 md:pr-12 md:pl-0 pb-8 md:pb-0">
          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium mb-2 text-foreground"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium mb-2 text-foreground"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-foreground"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2 text-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message..."
                rows={5}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                required
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="w-4 h-4 md:w-5 md:h-5 mt-0.5 rounded border-gray-300 focus:ring-2 focus:ring-primary cursor-pointer"
                required
              />
              <label
                htmlFor="acceptTerms"
                className="text-sm text-foreground cursor-pointer"
              >
                I accept the <span className="underline">Terms</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 md:py-4 rounded-xl text-white font-semibold text-base md:text-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "var(--primary)" }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}