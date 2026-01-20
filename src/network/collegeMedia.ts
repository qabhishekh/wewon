import apiClient from "@/hooks/Axios";

// Media type definition
export interface CollegeMedia {
  _id: string;
  collegeId: string;
  type:
    | "logo"
    | "banner"
    | "gallery"
    | "video"
    | "Top_Recruiters"
    | "Past_Recruiters";
  url: string;
  publicId: string;
  createdAt: string;
}

// Fetch all media for a college
export const getCollegeMedia = async (
  collegeId: string,
): Promise<CollegeMedia[]> => {
  const response = await apiClient.get(`/api/college-media/${collegeId}`);
  return response.data.data || response.data || [];
};

// Helper to get logo from media array
export const getLogoFromMedia = (media: CollegeMedia[]): string | null => {
  const logo = media.find((m) => m.type === "logo");
  return logo?.url || null;
};

// Helper to get gallery images from media array
export const getGalleryFromMedia = (media: CollegeMedia[]): CollegeMedia[] => {
  return media.filter((m) => m.type === "gallery");
};

// Helper to get banner from media array
export const getBannerFromMedia = (media: CollegeMedia[]): string | null => {
  const banner = media.find((m) => m.type === "banner");
  return banner?.url || null;
};

// Helper to get Top Recruiters image from media array
export const getTopRecruitersImageFromMedia = (
  media: CollegeMedia[],
): string | null => {
  const topRecruiters = media.find((m) => m.type === "Top_Recruiters");
  return topRecruiters?.url || null;
};

// Helper to get Past Recruiters image from media array
export const getPastRecruitersImageFromMedia = (
  media: CollegeMedia[],
): string | null => {
  const pastRecruiters = media.find((m) => m.type === "Past_Recruiters");
  return pastRecruiters?.url || null;
};
