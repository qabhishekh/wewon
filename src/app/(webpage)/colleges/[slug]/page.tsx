import { Metadata } from "next";
import CollegeClient from "./CollegeClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://wewon-backend.vercel.app/";

  try {
    const response = await fetch(`${apiUrl}api/colleges/slug/${slug}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("API did not return JSON");
    }

    const data = await response.json();

    if (data.success && data.data) {
      const college = data.data;
      return {
        title: `${college.Name} - Overview, Courses, Fees, Placements & Cutoffs`,
        description: `Everything you need to know about ${college.Name}, ${college.City}, ${college.State} on We Won Academy. Check admission rules, course fees, placement statistics, rankings, and cutoff ranks.`,
        openGraph: {
          title: `${college.Name} | We Won Academy`,
          description: `Get detailed information about ${college.Name} including courses, fees, and placements on We Won Academy.`,
          images: ["/og-image.png"],
        },
      };
    }
  } catch (error) {
    console.error("Error fetching college for metadata:", error);
  }

  return {
    title: "College Details | We Won Academy",
    description: "Explore detailed information about top engineering colleges.",
  };
}

export default function Page() {
  return <CollegeClient />;
}
