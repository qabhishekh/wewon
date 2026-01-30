import { Metadata } from "next";
import ExamClient from "./ExamClient";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://wewon-backend.vercel.app/";

  try {
    const response = await fetch(`${apiUrl}api/exams/${id}`, {
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
      const exam = data.data;
      return {
        title: `${exam.examName} - Updates, Pattern, Syllabus & Application`,
        description: `Get the latest updates on ${exam.examName} on Colleges Khojo. Check exam pattern, eligibility criteria, syllabus, important dates, and application process.`,
        openGraph: {
          title: `${exam.examName} | Colleges Khojo by We Won Academy`,
          description: `Comprehensive guide for ${exam.examName} on Colleges Khojo: pattern, syllabus, and application details.`,
          images: ["/og-image.png"],
        },
      };
    }
  } catch (error) {
    console.error("Error fetching exam for metadata:", error);
  }

  return {
    title: "Exam Details | We Won Academy",
    description:
      "Detailed information about upcoming engineering entrance exams.",
  };
}

export default function Page() {
  return <ExamClient />;
}
