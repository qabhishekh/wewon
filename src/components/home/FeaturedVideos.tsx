import React from "react";
import { Play, MoreVertical, Youtube, Globe, Video, PlayCircle } from "lucide-react";
import Sections from "./sections";
import Heading from "./heading";

const FeaturedVideos = () => {
  return (
    <Sections>
      <Heading centered={true} text="Featured Videos" />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="">
          <div className="aspect-video rounded-2xl overflow-hidden shadow">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/F_8Gy8T-PvY?si=9cmnHop2EhyFaWDX"
              title="What’s Figma?"
            ></iframe>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col justify-between gap-4">
            <div className="aspect-video rounded-2xl overflow-hidden shadow">
                <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/F_8Gy8T-PvY?si=9cmnHop2EhyFaWDX"
                title="What’s Figma?"
                ></iframe>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow">
                <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/F_8Gy8T-PvY?si=9cmnHop2EhyFaWDX"
                title="What’s Figma?"
                ></iframe>
            </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Intermediate_College_Lucknow.jpg/800px-Intermediate_College_Lucknow.jpg"
                alt="UP Board Class 12 Hindi"
                className="w-full h-full min-h-[400px] md:min-h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm w-12 h-12 flex items-center justify-center rounded-full">
                <Play className="text-[var(--primary)]"/>
                </div>
                <h3 className="text-lg font-semibold">
                UP Board Class 12 Hindi...
                </h3>
                <p className="text-sm text-gray-200">
                UP Board Class 12 Hindi Question Paper with Answer Ke
                </p>
            </div>
            </div>
        </div>
      </div>
    </Sections>
  );
};

export default FeaturedVideos;
