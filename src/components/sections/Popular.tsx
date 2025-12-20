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
      _id: "1",
      examName: "JEE Advanced",
      logoUrl:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
      websiteUrl: "",
      tags: ["Engineering", "IIT"],
      sections: [
        {
          sectionTitle: "About JEE Advanced",
          description:
            "The IIT JEE Advanced exam is held annually for admission to the 23 IITs in India",
        },
      ],
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "2",
      examName: "JEE Main",
      logoUrl:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
      websiteUrl: "",
      tags: ["Engineering", "NIT"],
      sections: [
        {
          sectionTitle: "About JEE Main",
          description:
            "The IIT JEE Advanced exam is held annually for admission to the 23 IITs in India",
        },
      ],
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "3",
      examName: "NEET",
      logoUrl:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
      websiteUrl: "",
      tags: ["Medical", "MBBS"],
      sections: [
        {
          sectionTitle: "About NEET",
          description:
            "The IIT JEE Advanced exam is held annually for admission to the 23 IITs in India",
        },
      ],
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "4",
      examName: "BITSAT",
      logoUrl:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
      websiteUrl: "",
      tags: ["Engineering", "BITS"],
      sections: [
        {
          sectionTitle: "About BITSAT",
          description:
            "The IIT JEE Advanced exam is held annually for admission to the 23 IITs in India",
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
