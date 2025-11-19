// Main Types
export interface AuthState {
  user: User | Counsellor;
  token: string | null;
  loading: boolean;
  btnloading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface Counsellor {
  userId: UserId;
  _id?: string;
  bio: string;
  specialization: string[];
  experience: number;
  qualifications: Qualifications[];
  languages: string[];
  rating: {
    average: number;
    totalReviews: number;
  };
  sessionsCompleted: number;
  profileVideo?: string;
  verified: boolean;

  socialLinks?: {
    linkedin?: string;
    youtube?: string;
    website?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
export interface User {
  userId: UserId;
  _id?: string;
  academics?: {
    tenth?: AcademicRecord;
    twelfth?: AcademicRecord;
  };
  exams: ExamRecord[];
  preferences?: Preferences;

  savedColleges: [];
  appliedColleges: [];

  createdAt?: string;
  updatedAt?: string;
}

// Sub Types

interface Qualifications {
  degree: string;
  institution: string;
  year: number;
}
interface AcademicRecord {
  board?: string;
  year?: number;
  percentage?: number;
  school?: string;
  stream?: string;
}

interface ExamRecord {
  name: string;
  score?: number;
  rank?: number;
  year: number;
}

interface Preferences {
  stream?: string;
  courseType?: string;
  preferredStates?: string[];
  preferredCollegeType?: "government" | "private" | "any";
}

export interface UserId {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  phone: string;
}
