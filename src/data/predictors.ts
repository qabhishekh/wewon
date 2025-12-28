export interface Predictor {
  id: string;
  name: string;
  shortName: string;
  description: string;
  route: string;
  price: number;
  discountPrice?: number;
  icon: string;
  category: PredictorCategory;
  isActive: boolean;
  features: string[];
}

export enum PredictorCategory {
  JEE = "JEE",
  STATE = "State Level",
  NEET = "NEET",
  OTHER = "Other",
}

export const PREDICTORS: Predictor[] = [
  {
    id: "jee-mains-predictor",
    name: "JEE Mains College Predictor",
    shortName: "Mains Predictor",
    description:
      "Predict your college based on JEE Mains rank and preferences. Get accurate predictions for NITs, IIITs, and GFTIs.",
    route: "/mainpredictor",
    price: 499,
    discountPrice: 299,
    icon: "🎓",
    category: PredictorCategory.JEE,
    isActive: true,
    features: [
      "NIT, IIIT & GFTI Predictions",
      "Branch-wise Analysis",
      "Previous Year Cutoffs",
      "Personalized Recommendations",
    ],
  },
  {
    id: "jee-advanced-predictor",
    name: "JEE Advanced College Predictor",
    shortName: "Advanced Predictor",
    description:
      "Predict your IIT based on JEE Advanced rank. Get detailed insights into IIT admissions and branch predictions.",
    route: "/iitpredictor",
    price: 599,
    discountPrice: 399,
    icon: "🏆",
    category: PredictorCategory.JEE,
    isActive: true,
    features: [
      "All IIT Predictions",
      "Branch-wise Cutoffs",
      "Seat Availability",
      "Opening & Closing Ranks",
    ],
  },
  {
    id: "uptac-predictor",
    name: "UPTAC College Predictor",
    shortName: "UPTAC Predictor",
    description:
      "Predict colleges for UPTAC counseling. Get predictions for engineering colleges in Uttar Pradesh based on your rank.",
    route: "/uptacpredictor",
    price: 399,
    discountPrice: 249,
    icon: "🎯",
    category: PredictorCategory.STATE,
    isActive: true,
    features: [
      "UP Engineering Colleges",
      "Round-wise Predictions",
      "Category-wise Analysis",
      "TFW Seat Predictions",
    ],
  },
  // Placeholder for future predictors (15 more to be added)
  // Examples:
  // - NEET UG Predictor
  // - NEET PG Predictor
  // - MHT CET Predictor
  // - KCET Predictor
  // - WBJEE Predictor
  // - TS EAMCET Predictor
  // - AP EAMCET Predictor
  // - COMEDK Predictor
  // - BITSAT Predictor
  // - VITEEE Predictor
  // - SRMJEEE Predictor
  // - KEAM Predictor
  // - GUJCET Predictor
  // - TNEA Predictor
  // - OJEE Predictor
];

// Helper functions
export const getActivePredictors = (): Predictor[] => {
  return PREDICTORS.filter((predictor) => predictor.isActive);
};

export const getPredictorsByCategory = (
  category: PredictorCategory
): Predictor[] => {
  return PREDICTORS.filter(
    (predictor) => predictor.category === category && predictor.isActive
  );
};

export const getPredictorById = (id: string): Predictor | undefined => {
  return PREDICTORS.find((predictor) => predictor.id === id);
};

export const getPredictorByRoute = (route: string): Predictor | undefined => {
  return PREDICTORS.find((predictor) => predictor.route === route);
};
