"use client";
import MainHeading from "@/components/sections/MainHeading";
import { useParams } from "next/navigation";
import React from "react";
import CollegeHero from "../../colleges/sections/CollegeHero";
import BentoGridT from "@/components/sections/BentoGridT";
import Popular from "@/components/sections/Popular";
import SyllabusPDFViewer from "../sections/SyllabusPDFViewer";
import SubHeading from "@/components/sections/SubHeading";

const page = () => {
  const { id } = useParams();

  return (
    <div>
      <div className="container mx-auto">
        <MainHeading
          top={"Stay Updated With Upcoming"}
          bottom={"Exams And Results"}
        />
        <CollegeHero
          name="Joint Entrance Examination (JEE Main 2026)"
          conductedBy="IIT Kanpur"
          logo="https://images.unsplash.com/photo-1738464024478-2a60ac914513?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sbGVnZSUyMGxvZ298ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900"
          tags={["Undergraduate", "National Level", "Engineering"]}
          buttons={[
            {
              label: "Website Link",
              icon: "Link",
              function: () => console.log("Saved!"),
            },
            {
              label: "Guide",
              icon: "Download",
              function: () => console.log("Downloading..."),
            },
          ]}
        />
      </div>
      <BentoGridT
        leftHead={{
          title: "Overview",
          description: [
            "The Joint Entrance Examination (Main), commonly called JEE Main, is the national-level entrance exam for admission to B.Tech, BArch, and BPlan courses at NITs, IIITs, CFTIs and many other private Institutions/universities.",
            "The JEE Mains is also an eligibility test for JEE Advanced exam. ",
            "The National Testing Agency (NTA) conducts the JEE Main exam every year in January and April.",
          ],
        }}
        rightHead={{
          title: "What's new?",
          description: [
            "The JEE Main 2026 registration process for the first session for admission to the BTech course is expected to begin in Nov 2025.",
          ],
        }}
        bottomHead={{
          title: "Registerations",
          description: [
            "More than 10 lakh candidates appear in the JEE Mains exam every year.",
          ],
        }}
      />
      <div className="container mx-auto px-4">
        <SyllabusPDFViewer pdfUrl={"http://localhost:3000/JEE%20Advanced%202025%20Syllabus.pdf"} />
        <SubHeading top="Prepration Tips" align="left" />
        <div>
          <li>Only pens, pencils, drinking water in a transparent bottle, the downloaded admit card, and an original photo identity card are permitted inside the examination hall.</li>
          <li>Candidates arriving at the examination centre after the commencement of the examination for each paper (09:00 IST for Paper 1 and 14:30 IST for Paper 2) will not be allowed to take the test.</li>
        </div>
        <Popular />
      </div>
    </div>
  );
};

export default page;
