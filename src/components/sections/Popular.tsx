"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ExamCard from "../cards/ExamCard";
import SubHeading from "./SubHeading";
import { Exam } from "@/store/types";

const Popular = () => {
  const router = useRouter();

  const PopularExams: Exam[] = [
    {
      _id: "696b3937fee340d124bb3242",
      examName: "IISER Aptitude Test(IISER AT)",
      logoUrl:
        "https://res.cloudinary.com/dtqjgv5aa/image/upload/v1768634591/sk9bp79sycjl2kkuzxls.webp",
      websiteUrl: "/exams/696b3937fee340d124bb3242",
      tags: ["IISER AT", "APTITUDE TEST"],
      sections: [
        {
          sectionTitle: "About IISER AT",
          description:
            "IISER Aptitude Test for admission to BS-MS dual degree programs.",
        },
      ],
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "696b33d452eb7d49413e1245",
      examName: "National Entrance Screening Test(NEST)",
      logoUrl:
        "https://res.cloudinary.com/dtqjgv5aa/image/upload/v1768633201/nv7vrchcp9daacysi9tg.webp",
      websiteUrl: "/exams/696b33d452eb7d49413e1245",
      tags: ["NEST", "SCREENING TEST"],
      sections: [
        {
          sectionTitle: "About NEST",
          description: "Entrance exam for admission to NISER and UM-DAE CEBS.",
        },
      ],
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "696b7b7f808db14e1ed4310c",
      examName: "Indraprastha University Common Entrance Test (IPU CET)",
      logoUrl:
        "https://res.cloudinary.com/dtqjgv5aa/image/upload/v1768651525/hmp0tmbezmdzdb2asug2.webp",
      websiteUrl: "/exams/696b7b7f808db14e1ed4310c",
      tags: ["Undergraduate", "Engineering"],
      sections: [
        {
          sectionTitle: "About IPU CET",
          description: "Common Entrance Test for admission to GGSIPU.",
        },
      ],
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "696a511662473cc366b14891",
      examName: "Joint Entrance Examination (Main)",
      logoUrl:
        "https://res.cloudinary.com/dtqjgv5aa/image/upload/v1768575092/j9ubyv1hqxsbilxoqntg.webp",
      websiteUrl: "/exams/696a511662473cc366b14891",
      tags: ["JEE MAIN", "NTA"],
      sections: [
        {
          sectionTitle: "About JEE Main",
          description:
            "Joint Entrance Examination for admission to NITs, IIITs, and CFTIs.",
        },
      ],
      isActive: true,
      createdAt: new Date().toISOString(),
    },
  ];
  const handleKnowMore = (examId: string) => {
    router.push(`/exams/${examId}`);
  };
  return (
    <div className="">
      <SubHeading top="Popular Exams" align={"left"} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
        {PopularExams.map((exam) => (
          <ExamCard
            key={exam._id}
            exam={exam}
            handleKnowMore={handleKnowMore}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
