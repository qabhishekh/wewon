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
  const email = "support@example.com";
  const phone = "+91 98765 43210";
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
      className="pt-12 bg-background"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Contact Info */}
        <div
          className="rounded-r-3xl p-8 md:p-12 text-white"
          style={{ backgroundColor: "var(--primary)" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact us</h1>
          <p className="text-lg md:text-xl mb-12 opacity-90">
            Have a question? Need Some Help? Or Just want to say hello?
          </p>

          <div className="space-y-6">
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-4 hover:opacity-80 transition-opacity"
            >
              <Mail className="w-6 h-6 flex-shrink-0" />
              <span className="text-lg underline">{email}</span>
            </a>

            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="flex items-center gap-4 hover:opacity-80 transition-opacity"
            >
              <Phone className="w-6 h-6 flex-shrink-0" />
              <span className="text-lg underline">{phone}</span>
            </a>

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
              <span className="text-lg leading-relaxed">{address}</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-background pr-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                rows={6}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
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
                className="w-5 h-5 mt-0.5 rounded border-gray-300 focus:ring-2 focus:ring-primary cursor-pointer"
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
              className="w-full py-4 rounded-xl text-white font-semibold text-lg hover:opacity-90 transition-opacity"
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
