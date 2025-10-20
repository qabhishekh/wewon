import React from 'react'
import Sections from './sections'
import Heading from './heading'
import CounselingCard from '../cards/CounselingCard'

const counsellingData = [
  {
    title: "JEE Advanced Mentorship 2025",
    description: "Complete guidance for JEE Advanced preparation with expert mentors and proven strategies.",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop&crop=top",
    originalPrice: 4999,
    currentPrice: 2999,
    buttonText: "Get Guidance"
  },
  {
    title: "NEET UG Counselling Guide",
    description: "Step-by-step NEET counselling process with seat allocation strategies and college selection.",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop&crop=center",
    originalPrice: 3999,
    currentPrice: 1999,
    buttonText: "Get Guidance"
  },
  {
    title: "MBA Entrance Prep",
    description: "CAT, XAT, GMAT preparation with personalized study plans and mock tests.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center",
    currentPrice: 2499,
    buttonText: "Get Guidance"
  },
  {
    title: "Engineering College Selection",
    description: "Expert guidance for choosing the right engineering college based on your rank and preferences.",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop&crop=center",
    originalPrice: 2999,
    currentPrice: 1499,
    buttonText: "Get Guidance"
  }
];

export default function FeatureCounselling() {

  return (
    <Sections>
        <Heading text="Counselling Services" centered className="mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {counsellingData.map((service, index) => (
              <CounselingCard 
                key={index}
                title={service.title}
                description={service.description}
                imageUrl={service.imageUrl}
                originalPrice={service.originalPrice}
                currentPrice={service.currentPrice}
                buttonText={service.buttonText}
              />
            ))}
        </div>
    </Sections>
  )
}
