import BentoGridT from "@/components/sections/BentoGridT";
import MainHeading from "@/components/sections/MainHeading";
import React from "react";
import CoreValues from "./sections/CoreValues";
import OurImpact from "./sections/OurImpact";
import {
  Sparkles,
  Users,
  Award,
  GraduationCap,
  Wand2,
  BookOpen,
} from "lucide-react";
import FounderTeam from "./sections/FounderTeam";
import Interns from "./sections/Interns";
import GoogleAds from "@/components/sections/GoogleAds";

const About = () => {
  const values = [
    {
      number: "01",
      title: "TRANSPARENCY",
      description:
        "Every piece of information we share is verified and authentic.",
    },
    {
      number: "02",
      title: "EMPOWERMENT",
      description:
        "We equip students with tools and mentorship to make informed choices.",
    },
    {
      number: "03",
      title: "INNOVATION",
      description:
        "We continuously enhance our platform with AI and predictive analytics.",
    },
    {
      number: "04",
      title: "ACCESSIBILITY",
      description:
        "Making quality guidance available to every student, everywhere.",
    },
  ];
  const impacts = [
    {
      icon: Sparkles,
      title: "Empower Every Learner",
    },
    {
      icon: Users,
      title: "1 Lakh+ personalized mentorships",
    },
    {
      icon: Award,
      title: "Create Future Leaders",
    },
    {
      icon: GraduationCap,
      title: "1M+ students reach through videos",
    },
    {
      icon: Wand2,
      title: "Promote Innovation",
    },
  ];

  const team = [
    {
      name: "Dr. Emily Carter",
      role: "Founder & Chief AI Scientist",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=faces",
    },
    {
      name: "Elon Park",
      role: "CTO, DeepMind",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=faces",
    },
    {
      name: "Dr. Alan Foster",
      role: "CTO, ChatGPT",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=faces",
    },
    {
      name: "Laura Kim",
      role: "AI Scientist",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop&crop=faces",
    },
    {
      name: "Dr. Emily Carter",
      role: "Founder & Chief AI Scientist",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=faces",
    },
    {
      name: "Elon Park",
      role: "CTO, DeepMind",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=faces",
    },
    {
      name: "Dr. Alan Foster",
      role: "CTO, ChatGPT",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=faces",
    },
    {
      name: "Laura Kim",
      role: "AI Scientist",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop&crop=faces",
    },
  ];
  const interns = [
    {
      name: "Dr. Emily Carter",
      role: "Founder & Chief AI Scientist",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=faces",
    },
    {
      name: "Elon Park",
      role: "CTO, DeepMind",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=faces",
    },

    {
      name: "Dr. Alan Foster",
      role: "CTO, ChatGPT",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=faces",
    },
    {
      name: "Laura Kim",
      role: "AI Scientist",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop&crop=faces",
    },
  ];
  return (
    <>
      <div className="container mx-auto">
        <MainHeading
          top={"Learn More About"}
          bottom={"Our Journey and Purpose"}
        />
      </div>
      <BentoGridT
        leftHead={{
          title: "Who We Are",
          description: [
            "Colleges Khojo is a dedicated college discovery and admission guidance platform, developed as an associate initiative of We Won Academy.",
            "Our goal is to help students explore the right colleges, courses, and entrance exams based on their interests, performance, and career goals.",
            "Through our platform, students can search colleges, check entrance exams, analyze ranks, and understand admission possibilities—all in one place. We simplify the complex admission process and provide accurate, student-focused guidance to ensure confident decision-making.",
          ],
        }}
        rightHead={{
          title: "Our Vision",
          description: [
            "Our vision is to help every student secure the best possible college based on their rank, exam performance, and career aspirations.",
            "We aim to create a trusted ecosystem where students can easily compare colleges, evaluate options, and receive proper guidance for admissions across India.",
            "At Colleges Khojo, we believe that right guidance at the right time can change a student's future.",
          ],
        }}
        bottomHead={{
          title: "Our Story",
          description: [
            "We Won Academy was founded by Aman Mishra (Aman Bhaiya), an alumnus of IISER Bhopal, with a strong belief that students deserve clear, honest, and practical career guidance.",
            "The idea of Colleges Khojo started during his time at IISER Bhopal, when he observed how students struggled to find the right colleges despite having good ranks and potential.",
            "Since then, the mission has been simple — guide students properly, help them understand their options, and support them in securing admissions to suitable colleges.",
            "Today, Colleges Khojo continues this mission by combining technology, experience, and mentorship to support students at every step of their admission journey.",
          ],
        }}
        showEmployees={true}
        employees={[
          {
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
          },
          {
            img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
          },
          {
            img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100",
          },
          {
            img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100",
          },
        ]}
      />
      <CoreValues values={values} />
      <div className="container mx-auto">
        <GoogleAds />
        <OurImpact impacts={impacts} />
        <FounderTeam team={team} />
        <Interns interns={interns} />
      </div>
    </>
  );
};

export default About;
