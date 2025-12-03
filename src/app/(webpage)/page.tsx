import NewsSection from "@/components/home/FeaturedNews";
import FeatureCounselling from "@/components/home/FeatureCounselling";
import FeaturedVideos from "@/components/home/FeaturedVideos";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorks from "@/components/home/HowItWorks";
import PersonalizedMentorship from "@/components/home/PersonalizedMentorship";
import StudentStoryTestimonial from "@/components/home/StudentStoryTestimonial";
import TopColleges from "@/components/home/TopColleges";
import CollegesSlider from "@/components/home/TopCollegesSlider";
import CallToAction from "@/components/sections/CallToAction";
import HeroSection from "@/components/sections/HeroSection";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
      </div>
      <CollegesSlider />
      <div className="container mx-auto">
        <FeaturesSection />
        <HowItWorks />
      </div>
      <div className="overflow-hidden">
        <div className="container mx-auto">
          <PersonalizedMentorship />
        </div>
      </div>
      {/* <div className="container mx-auto">
        <FeaturedVideos />
      </div> */}
      <div className="container mx-auto">
        <TopColleges />
      </div>
      <div className="container mx-auto">
        <FeatureCounselling />
      </div>
      <div className="bg-[var(--muted-background)]">
        <NewsSection />
      </div>
      <div className="container mx-auto">
        <StudentStoryTestimonial />
      </div>
      <div className="px-4">
        <CallToAction />
      </div>
      <Newsletter />
    </>
  );
}
