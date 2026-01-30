import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://collegeskhojo.com";
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://wewon-backend.vercel.app/";

  // Static pages
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/counseling",
    "/mentorship",
    "/predictor",
    "/percentile",
    "/colleges",
    "/exams",
    "/privacy",
    "/terms",
    "/refund",
    "/jee-mains-predictor",
    "/jee-advanced-predictor",
    "/jee-early-predictor",
    "/uptac-predictor",
    "/hbtu-predictor",
    "/mmmut-predictor",
    "/jac-delhi-predictor",
    "/jac-chandigarh-predictor",
  ];

  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("daily" as const) : ("weekly" as const),
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic College pages
  let collegePages: MetadataRoute.Sitemap = [];
  try {
    const collegesRes = await fetch(`${apiUrl}api/colleges?limit=1000`);
    const collegesData = await collegesRes.json();
    if (collegesData.success && Array.isArray(collegesData.data)) {
      collegePages = collegesData.data.reduce((acc: any[], college: any) => {
        // Main college page
        acc.push({
          url: `${baseUrl}/colleges/${college.slug}`,
          lastModified: new Date(college.updatedAt || new Date()),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        });
        // Cutoff page
        acc.push({
          url: `${baseUrl}/colleges/${college.slug}/cutoffs`,
          lastModified: new Date(college.updatedAt || new Date()),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        });
        return acc;
      }, []);
    }
  } catch (error) {
    console.error("Error fetching colleges for sitemap:", error);
  }

  // Dynamic Exam pages
  let examPages: MetadataRoute.Sitemap = [];
  try {
    const examsRes = await fetch(`${apiUrl}api/exams?limit=1000`);
    const examsData = await examsRes.json();
    if (Array.isArray(examsData.data)) {
      examPages = examsData.data.map((exam: any) => ({
        url: `${baseUrl}/exams/${exam._id}`,
        lastModified: new Date(exam.createdAt || new Date()),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error("Error fetching exams for sitemap:", error);
  }

  // Dynamic Counseling pages
  let counselingPages: MetadataRoute.Sitemap = [];
  try {
    const counselingRes = await fetch(`${apiUrl}api/counseling?limit=1000`);
    const counselingData = await counselingRes.json();
    if (counselingData.success && Array.isArray(counselingData.data)) {
      counselingPages = counselingData.data.map((product: any) => ({
        url: `${baseUrl}/counseling/${product.slug}`,
        lastModified: new Date(product.updatedAt || new Date()),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error("Error fetching counseling for sitemap:", error);
  }

  return [...staticPages, ...collegePages, ...examPages, ...counselingPages];
}
