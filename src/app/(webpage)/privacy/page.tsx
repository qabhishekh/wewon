import React from "react";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Colleges Khojo (Associated with We Won Academy)
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              1. Data Collection
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We collect personal information such as name, email address, phone
              number, academic details, and payment information solely for
              counselling, admission guidance, and communication purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              2. Data Usage
            </h2>
            <div className="text-gray-700 leading-relaxed">
              <p className="mb-2">Your personal data is used only to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Provide counselling services</li>
                <li>Share updates and important information</li>
                <li>Offer academic and admission-related support</li>
              </ul>
              <p className="mt-2">
                We do not sell, rent, or share your personal information with
                third parties for marketing purposes.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              3. Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed">
              All user data is stored on secure and encrypted servers. Online
              payment transactions are processed through trusted, secure, and
              PCI-compliant payment gateways to ensure maximum safety.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. Cookies & Tracking
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies to enhance website performance and improve user
              experience. Users may disable cookies through browser settings;
              however, some features of the website may not function properly.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
