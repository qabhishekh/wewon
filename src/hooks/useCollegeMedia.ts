import { useState, useEffect } from "react";
import {
  getCollegeMedia,
  CollegeMedia,
  getLogoFromMedia,
  getGalleryFromMedia,
  getBannerFromMedia,
  getTopRecruitersImageFromMedia,
  getPastRecruitersImageFromMedia,
} from "@/network/collegeMedia";

interface UseCollegeMediaReturn {
  media: CollegeMedia[];
  logo: string | null;
  banner: string | null;
  gallery: CollegeMedia[];
  topRecruitersImage: string | null;
  pastRecruitersImage: string | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useCollegeMedia = (
  collegeId: string | null,
): UseCollegeMediaReturn => {
  const [media, setMedia] = useState<CollegeMedia[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMedia = async () => {
    if (!collegeId) {
      setMedia([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getCollegeMedia(collegeId);
      setMedia(data);
    } catch (err: any) {
      // Silently handle 404 errors - expected when no media exists for a college
      if (err?.response?.status === 404) {
        setMedia([]);
      } else {
        console.error("Error fetching college media:", err);
        setError("Failed to load college media");
        setMedia([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [collegeId]);

  return {
    media,
    logo: getLogoFromMedia(media),
    banner: getBannerFromMedia(media),
    gallery: getGalleryFromMedia(media),
    topRecruitersImage: getTopRecruitersImageFromMedia(media),
    pastRecruitersImage: getPastRecruitersImageFromMedia(media),
    loading,
    error,
    refetch: fetchMedia,
  };
};

export default useCollegeMedia;
