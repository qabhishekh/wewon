"use client";
import MainHeading from "@/components/sections/MainHeading";
import { useParams } from "next/navigation";
import React from "react";
import CollegeHero from "../sections/CollegeHero";
import BentoGridT from "@/components/sections/BentoGridT";

const page = () => {
  const { id } = useParams();

  return (
    <div>
      <MainHeading
        top={"Explore campus life, programs,"}
        bottom={"and placement insights"}
      />
      <CollegeHero
        name="Indian Institute of Technology, DELHI"
        location="Hauz Khas, Delhi"
        rating={4.5}
        image="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2086"
        logo="https://images.unsplash.com/photo-1738464024478-2a60ac914513?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sbGVnZSUyMGxvZ298ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900"
        type="Public/Government University"
        established="1961"
        onSave={() => console.log("Saved!")}
        onDownloadBrochure={() => console.log("Downloading...")}
      />
      <BentoGridT
        leftHead={{
          title: "Highlights",
          description: [
            "IIT Delhi was established in 1961 and later declared as Institution of National Importance. ",
            "Indian Institute of Technology Delhi has been ranked 4 under the 'Overall' category and 2 under the 'Engineering' category by the NIRF Ranking 2025. ",
            "The popular programmes offered at IIT Delhi include BTech and MTech. IIT Delhi is planning to open its campus in Abu Dhabi.",
          ],
        }}
        rightHead={{
          title: "What's new?",
          description: [
            "The JEE Main 2026 registration process for the first session for admission to the BTech course is expected to begin in Nov 2025.",
          ],
        }}
        bottomHead={{
          title: "Programmes",
          description: [
            "BTech and MTech are the most popular choices among students at IIT Delhi. ",
          ],
        }}
      />
    </div>
  );
};

export default page;
