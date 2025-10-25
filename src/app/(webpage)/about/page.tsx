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
      title: "10K+ personalized mentorships",
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
    {
      icon: BookOpen,
      title: "5K+ verified college profiles",
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
            "We Won Academy is a one-stop education and career guidance platform designed to empower students with accurate information, smart tools, and personalized mentorship.",
            "We help students make confident decisions about their college admissions, entrance exams, and career goals — all in one place.",
          ],
        }}
        rightHead={{
          title: "Our Vision",
          description: [
            "To become India's most trusted student guidance ecosystem that empowers every learner to make informed, confident, and successful career decisions.",
          ],
        }}
        bottomHead={{
          title: "Our Story",
          description: [
            "We Won Academy was founded with a simple belief — every student deserves the right information at the right time.",
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
