import React from "react";

interface AdmissionRule {
  _id: string;
  instituteId: string;
  Degree: string;
  Course_Type: string;
  Duration: string;
  Entrance_Exam: string;
  Admission_Mode: string;
  Eligibility_Criteria: string;
  Important_Link: string;
}

interface AdmissionRulesProps {
  admissionRules: AdmissionRule[];
}

const AdmissionRules: React.FC<AdmissionRulesProps> = ({ admissionRules }) => {
  if (!admissionRules || admissionRules.length === 0) {
    return null;
  }

  // Group by degree
  const groupedByDegree = admissionRules.reduce((acc, rule) => {
    if (!acc[rule.Degree]) {
      acc[rule.Degree] = [];
    }
    acc[rule.Degree].push(rule);
    return acc;
  }, {} as { [key: string]: AdmissionRule[] });

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-[var(--primary)] mb-6">
        Admission Rules
      </h2>

      <div className="space-y-6">
        {Object.entries(groupedByDegree).map(([degree, rules]) => (
          <div
            key={degree}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="bg-[var(--primary)] text-white px-6 py-3">
              <h3 className="text-xl font-semibold">{degree}</h3>
            </div>

            <div className="p-6 space-y-4">
              {rules.map((rule) => (
                <div
                  key={rule._id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        Course Type
                      </p>
                      <p className="text-gray-900">{rule.Course_Type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        Duration
                      </p>
                      <p className="text-gray-900">{rule.Duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        Entrance Exam
                      </p>
                      <p className="text-gray-900">{rule.Entrance_Exam}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        Admission Mode
                      </p>
                      <p className="text-gray-900">{rule.Admission_Mode}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-600 font-medium mb-1">
                      Eligibility Criteria
                    </p>
                    <p className="text-gray-900 text-sm leading-relaxed">
                      {rule.Eligibility_Criteria}
                    </p>
                  </div>

                  {rule.Important_Link && (
                    <div className="mt-4">
                      <a
                        href={rule.Important_Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[var(--accent)] hover:text-[var(--primary)] font-medium text-sm"
                      >
                        Visit Official Link →
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdmissionRules;
