import React from "react";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Terms and Conditions
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Colleges Khojo (Associated with We Won Academy)
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              1. Mentor’s Authority
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Mentors associated with Colleges Khojo reserve the right to remove
              any student/subscriber from any counselling session, class, or
              course at their sole discretion. In such cases, the student shall
              not be entitled to any compensation, refund, or legal claim
              against Colleges Khojo or We Won Academy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              2. Content Usage
            </h2>
            <p className="text-gray-700 leading-relaxed">
              All counselling material, study resources, videos, recordings, and
              educational content provided by Colleges Khojo are strictly for
              personal use only. Any unauthorized copying, recording, sharing,
              forwarding, resale, or public distribution of content without
              written permission is strictly prohibited and may result in legal
              action.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              3. Platform’s Liability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Colleges Khojo acts as a platform connecting students with Mentors
              and counsellors. The platform is not responsible for the accuracy,
              outcomes, opinions, or advice shared by individual Mentors. Any
              disputes, claims, or legal liabilities arising from Mentor advice
              must be addressed directly with the respective Mentor, not
              Colleges Khojo or We Won Academy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. Subscription & Payment Method
            </h2>
            <p className="text-gray-700 leading-relaxed">
              All subscriptions and payments must be made only through official
              online payment gateways provided by Colleges Khojo. Offline
              payments, direct transfers, or payments made through unauthorized
              sources will be considered invalid and non-refundable.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
