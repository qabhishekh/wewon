import React from "react";

const RefundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Cancellation & Refund Policy
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Colleges Khojo (Associated with We Won Academy)
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              1. Cancellation Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Users may submit a cancellation request for their booked
              counseling session or subscription before the service is accessed
              or the session has started. Once the session has begun or the
              service has been accessed, cancellation will not be permitted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              2. Cancellation Method
            </h2>
            <p className="text-gray-700 leading-relaxed">
              All cancellation requests must be raised only through the official
              support channels of Colleges Khojo. Requests made via phone calls,
              social media, or unofficial communication will not be considered
              valid.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              3. No-Show Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If a user fails to attend a scheduled session without prior
              cancellation, the session will be treated as completed, and no
              refund or rescheduling will be provided.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. Non-Cancellable Services
            </h2>
            <div className="text-gray-700 leading-relaxed">
              <p className="mb-2">
                The following are strictly non-cancellable:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Digital courses, reports, or materials once access is provided
                </li>
                <li>
                  Services that have already started or are partially delivered
                </li>
                <li>Payments made via offline or unauthorized methods</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              5. Platform-Initiated Cancellation
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Colleges Khojo reserves the right to cancel or reschedule services
              due to technical issues, Mentor unavailability, or operational
              reasons. In such cases, an alternative session or appropriate
              resolution will be offered at the platform’s discretion.
            </p>
          </section>

          <div className="border-t border-gray-200 my-8"></div>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Refund Policy
            </h2>
            <div className="text-gray-700 leading-relaxed">
              <p className="mb-2">
                Refunds are applicable only in the following cases:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Duplicate payment</li>
                <li>
                  Technical payment failure where course or session access is
                  not provided
                </li>
              </ul>
              <p className="mt-2">
                Refund requests must be sent via email to our official support
                team along with valid payment proof. Approved refunds will be
                processed within 7–15 business days.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Non-Refundable Cases
            </h2>
            <div className="text-gray-700 leading-relaxed">
              <p className="mb-2">
                No refunds shall be provided in the following situations:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Change of mind after accessing the course or service</li>
                <li>Failure to attend a booked counselling session</li>
                <li>Payments made through offline or unauthorized methods</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPage;
