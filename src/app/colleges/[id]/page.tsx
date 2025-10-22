"use client";
import MainHeading from "@/components/sections/MainHeading";
import { useParams } from "next/navigation";
import React from "react";
import CollegeHero from "../sections/CollegeHero";
import BentoGridT from "@/components/sections/BentoGridT";
import CoursesFees from "../sections/CoursesFees";
import GoogleAds from "@/components/sections/GoogleAds";
import Recommended from "@/components/sections/Recommended";
import PlacementStatistics from "../sections/PlacementStatistics";
import CutOffsFilter from "../sections/CutOffs";

const page = () => {
  const { id } = useParams();

  const [yearsData, setYearsData] = React.useState<any[]>([
    {
      year: "2024",
      data: [
        { branch: "CE", eligible: 31, placed: 21 },
        { branch: "CSE", eligible: 66, placed: 61 },
        { branch: "EE", eligible: 62, placed: 51 },
        { branch: "ECE", eligible: 50, placed: 39 },
        { branch: "ME", eligible: 53, placed: 50 },
        { branch: "MME", eligible: 16, placed: 13 },
        { branch: "DD-CE", eligible: 19, placed: 11 },
        { branch: "DD-EE", eligible: 10, placed: 6 },
        { branch: "DD-ME", eligible: 38, placed: 25 },
        { branch: "DD-MME", eligible: 9, placed: 4 },
      ],
      placed: [
        {
          branch: "4-Year B.E./B.Tech.",
          columns: [
            { key: "branch", label: "Branch", align: "left" },
            { key: "placed", label: "Placed (%)", align: "right" },
          ],
          data: [
            { branch: "Civil Engineering", placed: "67.74%" },
            {
              branch: "Computer Science and Engineering",
              placed: "100.00%",
            },
            { branch: "Electrical Engineering", placed: "77.94%" },
            { branch: "Overall (B.Tech.)", placed: "80.55%" },
          ],
        },
        {
          branch: "5-Year B.Tech + M.Tech. (Dual Degree)",
          columns: [
            { key: "branch", label: "Branch", align: "left" },
            { key: "placed", label: "Placed (%)", align: "right" },
          ],
          data: [
            { branch: "Civil Engineering", placed: "67.74%" },
            {
              branch: "Computer Science and Engineering",
              placed: "100.00%",
            },
            { branch: "Electrical Engineering", placed: "79.94%" },
            { branch: "Overall (Dual Degree)", placed: "82.00%" },
          ],
        },
      ],
      median: [
        {
          branch: "4-Year B.E./B.Tech.",
          columns: [
            { key: "branch", label: "Branch", align: "left" },
            { key: "placed", label: "Median CTC (in LPA)", align: "right" },
          ],
          data: [
            { branch: "Civil Engineering", placed: "11.30" },
            {
              branch: "Computer Science and Engineering",
              placed: "100.00%",
            },
            { branch: "Electrical Engineering", placed: "16.30" },
            { branch: "Overall (B.Tech.)", placed: "12.00" },
          ],
        },
        {
          branch: "5-Year B.Tech + M.Tech. (Dual Degree)",
          columns: [
            { key: "branch", label: "Branch", align: "left" },
            { key: "placed", label: "Median CTC (in LPA)", align: "right" },
          ],
          data: [
            { branch: "Civil Engineering", placed: "11.30" },
            {
              branch: "Computer Science and Engineering",
              placed: "100.00%",
            },
            { branch: "Electrical Engineering", placed: "16.30" },
            { branch: "Overall (Dual Degree)", placed: "12.00" },
          ],
        },
      ],
      highest: [
        {
          branch: "4-Year B.E./B.Tech.",
          columns: [
            { key: "branch", label: "Branch", align: "left" },
            { key: "placed", label: "Max CTC (in LPA)", align: "right" },
          ],
          data: [
            { branch: "Civil Engineering", placed: "11.30" },
            {
              branch: "Computer Science and Engineering",
              placed: "100.00%",
            },
            { branch: "Electrical Engineering", placed: "16.30" },
            { branch: "Overall (B.Tech.)", placed: "12.00" },
          ],
        },
        {
          branch: "5-Year B.Tech + M.Tech. (Dual Degree)",
          columns: [
            { key: "branch", label: "Branch", align: "left" },
            { key: "placed", label: "Max CTC (in LPA)", align: "right" },
          ],
          data: [
            { branch: "Civil Engineering", placed: "11.30" },
            {
              branch: "Computer Science and Engineering",
              placed: "100.00%",
            },
            { branch: "Electrical Engineering", placed: "16.30" },
            { branch: "Overall (Dual Degree)", placed: "12.00" },
          ],
        },
      ],
      average: [
        {
          branch: "4-Year B.E./B.Tech.",
          columns: [
            { key: "branch", label: "Branch", align: "left" },
            { key: "placed", label: "Avg CTC (in LPA)", align: "right" },
          ],
          data: [
            { branch: "Civil Engineering", placed: "11.30" },
            {
              branch: "Computer Science and Engineering",
              placed: "100.00%",
            },
            { branch: "Electrical Engineering", placed: "16.30" },
            { branch: "Overall (B.Tech.)", placed: "12.00" },
          ],
        },
        {
          branch: "5-Year B.Tech + M.Tech. (Dual Degree)",
          columns: [
            { key: "branch", label: "Branch", align: "left" },
            { key: "placed", label: "Avg CTC (in LPA)", align: "right" },
          ],
          data: [
            { branch: "Civil Engineering", placed: "11.30" },
            {
              branch: "Computer Science and Engineering",
              placed: "100.00%",
            },
            { branch: "Electrical Engineering", placed: "16.30" },
            { branch: "Overall (Dual Degree)", placed: "12.00" },
          ],
        },
      ],
    },
    {
      year: "2023",
      data: [
        { branch: "CE", eligible: 28, placed: 19 },
        { branch: "CSE", eligible: 60, placed: 55 },
      ],
    },
    {
      year: "2022",
      data: [{ branch: "DD-CSE", eligible: 12, placed: 12 }],
    },
  ]);

  const tabsData = [
    {
      name: "M.Tech",
      summary: {
        description:
          "The IIT Delhi M.Tech course is a two-year program focusing on advanced engineering and technology specialization.",
        rating: 4.5,
        totalReviews: 70,
        totalCourses: 45,
        exams: ["GATE", "DASA PG"],
        fees: "₹1.4 L - ₹3 L",
        graduationScore: "60%",
      },
      courses: [
        {
          id: "1",
          name: "M.Tech in Computer Science and Engineering",
          rating: 4.7,
          duration: "2 Years",
          seatsOffered: 50,
          examsAccepted: "GATE",
          medianSalary: "₹22.5 LPA",
          totalFees: "₹2.8 L",
        },
        {
          id: "2",
          name: "M.Tech in Mechanical Design Engineering",
          rating: 4.4,
          duration: "2 Years",
          seatsOffered: 40,
          examsAccepted: "GATE",
          medianSalary: "₹15.2 LPA",
          totalFees: "₹2.3 L",
        },
        {
          id: "3",
          name: "M.Tech in Electrical Power Systems",
          rating: 4.6,
          duration: "2 Years",
          seatsOffered: 35,
          examsAccepted: "GATE",
          medianSalary: "₹16.8 LPA",
          totalFees: "₹2.5 L",
        },
        {
          id: "4",
          name: "M.Tech in Structural Engineering",
          rating: 4.3,
          duration: "2 Years",
          seatsOffered: 25,
          examsAccepted: "GATE",
          medianSalary: "₹14.1 LPA",
          totalFees: "₹2.1 L",
        },
      ],
    },
    {
      name: "B.Tech",
      summary: {
        description:
          "The IIT Delhi B.Tech program offers a comprehensive undergraduate education in engineering disciplines.",
        rating: 4.8,
        totalReviews: 120,
        totalCourses: 10,
        exams: ["JEE Main", "JEE Advanced"],
        fees: "₹8 L - ₹12 L",
        graduationScore: "75%",
      },
      courses: [
        {
          id: "1",
          name: "B.Tech in Computer Science and Engineering",
          rating: 4.9,
          duration: "4 Years",
          seatsOffered: 120,
          examsAccepted: "JEE Advanced",
          medianSalary: "₹28.5 LPA",
          totalFees: "₹9.2 L",
        },
        {
          id: "2",
          name: "B.Tech in Electrical Engineering",
          rating: 4.7,
          duration: "4 Years",
          seatsOffered: 110,
          examsAccepted: "JEE Advanced",
          medianSalary: "₹22.1 LPA",
          totalFees: "₹8.8 L",
        },
        {
          id: "3",
          name: "B.Tech in Civil Engineering",
          rating: 4.4,
          duration: "4 Years",
          seatsOffered: 90,
          examsAccepted: "JEE Advanced",
          medianSalary: "₹12.3 LPA",
          totalFees: "₹8.2 L",
        },
      ],
    },
    {
      name: "MBA",
      summary: {
        description:
          "IIT Delhi’s MBA program blends management principles with a strong technical foundation for future leaders.",
        rating: 4.6,
        totalReviews: 95,
        totalCourses: 3,
        exams: ["CAT", "GMAT"],
        fees: "₹9 L - ₹10.5 L",
        graduationScore: "60%",
      },
      courses: [
        {
          id: "1",
          name: "MBA in Technology Management",
          rating: 4.7,
          duration: "2 Years",
          seatsOffered: 80,
          examsAccepted: "CAT",
          medianSalary: "₹20.3 LPA",
          totalFees: "₹9.5 L",
        },
        {
          id: "2",
          name: "MBA in Finance and Analytics",
          rating: 4.5,
          duration: "2 Years",
          seatsOffered: 60,
          examsAccepted: "CAT",
          medianSalary: "₹18.7 LPA",
          totalFees: "₹10 L",
        },
      ],
    },
    {
      name: "PhD",
      summary: {
        description:
          "The IIT Delhi PhD program promotes advanced research in engineering, science, and humanities disciplines.",
        rating: 4.9,
        totalReviews: 50,
        totalCourses: 25,
        exams: ["GATE", "UGC NET", "CSIR NET"],
        fees: "₹80K - ₹1.2 L",
        graduationScore: "Master’s degree required",
      },
      courses: [
        {
          id: "1",
          name: "PhD in Computer Science and Artificial Intelligence",
          rating: 4.9,
          duration: "5 Years",
          seatsOffered: 20,
          examsAccepted: "GATE / NET",
          medianSalary: "₹30 LPA",
          totalFees: "₹1 L",
        },
        {
          id: "2",
          name: "PhD in Renewable Energy Systems",
          rating: 4.8,
          duration: "5 Years",
          seatsOffered: 15,
          examsAccepted: "GATE / CSIR NET",
          medianSalary: "₹18.5 LPA",
          totalFees: "₹95K",
        },
        {
          id: "3",
          name: "PhD in Computer Science and Artificial Intelligence",
          rating: 4.9,
          duration: "5 Years",
          seatsOffered: 20,
          examsAccepted: "GATE / NET",
          medianSalary: "₹30 LPA",
          totalFees: "₹1 L",
        },
        {
          id: "4",
          name: "PhD in Renewable Energy Systems",
          rating: 4.8,
          duration: "5 Years",
          seatsOffered: 15,
          examsAccepted: "GATE / CSIR NET",
          medianSalary: "₹18.5 LPA",
          totalFees: "₹95K",
        },
      ],
    },
    {
      name: "B.Sc",
      summary: {
        description:
          "IIT Delhi B.Sc program provides a strong foundation in scientific and analytical skills for undergraduates.",
        rating: 4.4,
        totalReviews: 80,
        totalCourses: 6,
        exams: ["JEE Advanced", "IIT JAM"],
        fees: "₹4 L - ₹6 L",
        graduationScore: "70%",
      },
      courses: [
        {
          id: "1",
          name: "B.Sc in Physics",
          rating: 4.5,
          duration: "3 Years",
          seatsOffered: 60,
          examsAccepted: "JEE Advanced",
          medianSalary: "₹10.5 LPA",
          totalFees: "₹4.5 L",
        },
        {
          id: "2",
          name: "B.Sc in Mathematics and Computing",
          rating: 4.8,
          duration: "3 Years",
          seatsOffered: 65,
          examsAccepted: "JEE Advanced",
          medianSalary: "₹15.8 LPA",
          totalFees: "₹5.2 L",
        },
      ],
    },
  ];

  const onCompare = (courseId: string, tabName: string) => {
    console.log(`Comparing course ${courseId} in tab ${tabName}`);
  };

  const onDownloadBrochure = (courseId: string, tabName: string) => {
    console.log(
      `Downloading brochure for course ${courseId} in tab ${tabName}`
    );
  };

  const onDownloadMainBrochure = (tabName: string) => {
    console.log(`Downloading main brochure for tab ${tabName}`);
  };

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
      <CoursesFees
        tabsData={tabsData}
        onCompare={onCompare}
        onDownloadBrochure={onDownloadBrochure}
        onDownloadMainBrochure={onDownloadMainBrochure}
      />
      <PlacementStatistics
        yearsData={yearsData}
        eligibleColor="var(--primary)"
        placedColor="#FF7A3D"
      />
      <CutOffsFilter />
      <GoogleAds />
      <Recommended />
    </div>
  );
};

export default page;
