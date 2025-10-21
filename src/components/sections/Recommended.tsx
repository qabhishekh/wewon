"use client";
import React from "react";
import MainHeading from "./MainHeading";
import CollegeCard from "../cards/CollegeCard";
import { useRouter } from "next/navigation";

interface College {
  id: string;
  name: string;
  location: string;
  city: string;
  established: string;
  nirf: string;
  naac: string;
  image: string;
}

const Recommended = () => {
  const router = useRouter();

  const RecommendedColleges: College[] = [
    {
      id: "1",
      name: "IIT, BHUBANESWAR",
      location: "Bhubaneswar, Odisha",
      city: "Bhubaneswar",
      established: "Estd. 1885",
      nirf: "Top 5 NIRF",
      naac: "NAAC A++",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    {
      id: "2",
      name: "IIT, BHUBANESWAR",
      location: "Bhubaneswar, Odisha",
      city: "Bhubaneswar",
      established: "Estd. 1885",
      nirf: "Top 5 NIRF",
      naac: "NAAC A++",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    {
      id: "3",
      name: "IIT, BHUBANESWAR",
      location: "Bhubaneswar, Odisha",
      city: "Bhubaneswar",
      established: "Estd. 1885",
      nirf: "Top 5 NIRF",
      naac: "NAAC A++",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    {
      id: "4",
      name: "IIT, BHUBANESWAR",
      location: "Bhubaneswar, Odisha",
      city: "Bhubaneswar",
      established: "Estd. 1885",
      nirf: "Top 5 NIRF",
      naac: "NAAC A++",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
  ];
  const handleKnowMore = (collegeId: string) => {
    router.push(`/colleges/${collegeId}`);
  };
  return (

    <div className="p-6 md:py-8 lg:p-12 ">
      <MainHeading top="Recommended Colleges" align={"left"} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
        {RecommendedColleges.map((college) => (
          <CollegeCard
            key={college.id}
            college={college}
            handleKnowMore={handleKnowMore}
          />
        ))}
      </div>
      </div>

  );
};

export default Recommended;
