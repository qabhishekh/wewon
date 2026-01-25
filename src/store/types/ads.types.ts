export interface IAdData {
  _id: string;
  title: string; // Admin-facing name
  location: string; // KEY for frontend mapping (e.g., 'overview_main')
  isActive: boolean; // Master toggle
  description: string; // The Payload (HTML or JSON string)
  priority: number; // Ordering if multiple ads share a location
}

export interface AdsState {
  ads: IAdData[];
  loading: boolean;
  error: string | null;
}
