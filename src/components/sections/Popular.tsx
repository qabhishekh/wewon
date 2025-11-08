"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ExamCard from "../cards/ExamCard";
import SubHeading from "./SubHeading";

interface Exams {
  id: string;
  name: string;
  description: string;
  image: string;
}

const Popular = () => {
  const router = useRouter();

  const PopularExams: Exams[] = [
    {
      id: "1",
      name: "JEE Advanced",
      description:
        "The IIT JEE Advanced exam is held annually for admission to the 23 IITs in India",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    {
      id: "2",
      name: "JEE Advanced",
      description:
        "The IIT JEE Advanced exam is held annually for admission to the 23 IITs in India",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    {
      id: "3",
      name: "JEE Advanced",
      description:
        "The IIT JEE Advanced exam is held annually for admission to the 23 IITs in India",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    {
      id: "4",
      name: "JEE Advanced",
      description:
        "The IIT JEE Advanced exam is held annually for admission to the 23 IITs in India",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    
  ];
  const handleKnowMore = (collegeId: string) => {
    router.push(`/colleges/${collegeId}`);
  };
  return (
    <div className="">
      <SubHeading top="Popular Exams" align={"left"} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
        {PopularExams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} handleKnowMore={handleKnowMore} />
        ))}
      </div>
    </div>
  );
};

export default Popular;
