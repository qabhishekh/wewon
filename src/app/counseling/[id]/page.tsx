
import React from "react";
import { notFound } from "next/navigation";

// Demo JSON data (replace with API or file fetch as needed)
const counselingData = [
	{
		id: 1,
		title: "JEE Advanced Mentorship Program",
		description:
			"Comprehensive guidance for JEE Advanced preparation with expert mentors. Get personalized study plans, mock tests, and one-on-one sessions.",
		imageUrl:
			"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1974&auto=format&fit=crop",
		originalPrice: 4999,
		currentPrice: 2999,
		features: [
			"Personalized study plan",
			"1-on-1 mentorship",
			"Mock tests",
			"Doubt clearing sessions",
		],
		buttonText: "Get Guidance",
		mentor: {
			name: "Dr. Anjali Sharma",
			image: "https://randomuser.me/api/portraits/women/68.jpg",
			bio: "IIT Bombay alumna, 10+ years of JEE mentoring, 98% student success rate. Passionate about personalized learning.",
		},
		highlights: [
			"Live interactive sessions",
			"Weekly progress tracking",
			"24x7 doubt support",
			"Access to premium study material",
		],
		faq: [
			{
				q: "Who is this program for?",
				a: "Students preparing for JEE Advanced who want expert guidance and a personalized approach."
			},
			{
				q: "How are sessions conducted?",
				a: "All sessions are online via Zoom/Google Meet, with recordings available."
			},
			{
				q: "Is there a refund policy?",
				a: "Yes, full refund within 7 days if not satisfied."
			}
		],
		contact: {
			email: "mentorship@wewon.com",
			phone: "+91-9876543210"
		},
		testimonials: [
			{
				name: "Rahul Verma",
				text: "The mentorship was a game-changer! My concepts became crystal clear and I cracked JEE Advanced.",
				image: "https://randomuser.me/api/portraits/men/32.jpg"
			},
			{
				name: "Sneha Patel",
				text: "Personalized study plan and constant support made all the difference. Highly recommend!",
				image: "https://randomuser.me/api/portraits/women/44.jpg"
			}
		]
	},
	// ...add more counseling objects as needed
];

function getCounselingById(id: string) {
	return counselingData.find((item) => item.id.toString() === id);
}


export default function CounselingDetailPage({ params }: { params: { id: string } }) {
	const counseling = getCounselingById(params.id);
	if (!counseling) return notFound();

	return (
		<div className="w-full bg-[var(--muted-background)] pb-12 px-4 pt-8">
			{/* Hero Section */}
			<div className="w-full mx-auto py-8 container">
				<div className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row">
					<div className="md:w-1/2 h-64 md:h-auto">
						<img
							src={counseling.imageUrl}
							alt={counseling.title}
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="md:w-1/2 p-6 flex flex-col justify-between">
						<div>
							<h1 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-2">
								{counseling.title}
							</h1>
							<p className="text-gray-700 mb-4">{counseling.description}</p>
							<ul className="mb-4 list-disc pl-5 text-[var(--primary)]">
								{counseling.features?.map((feature, i) => (
									<li key={i} className="mb-1 text-base text-[var(--foreground)]">{feature}</li>
								))}
							</ul>
							{/* Highlights */}
							{counseling.highlights && (
								<div className="mb-4">
									<h3 className="font-semibold text-lg text-[var(--primary)] mb-1">Highlights</h3>
									<ul className="list-disc pl-5">
										{counseling.highlights.map((h: string, i: number) => (
											<li key={i} className="text-[var(--foreground)] text-base mb-1">{h}</li>
										))}
									</ul>
								</div>
							)}
						</div>
						<div className="mt-4">
							<div className="flex items-baseline gap-2 mb-3">
								{counseling.originalPrice && (
									<span className="text-base text-red-500 line-through">
										₹{counseling.originalPrice.toLocaleString()}
									</span>
								)}
								<span className="text-xl font-bold text-[var(--accent)]">
									₹{counseling.currentPrice.toLocaleString()}
								</span>
							</div>
							<button
								className="w-full rounded-lg bg-[var(--accent)] px-4 py-3 text-white font-bold text-lg transition-all duration-300 hover:bg-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 cursor-pointer"
							>
								{counseling.buttonText}
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Mentor Section */}
			{counseling.mentor && (
				<div className="w-full mx-auto container mb-8">
					<div className="bg-white rounded-3xl shadow p-6 flex flex-col md:flex-row items-center gap-6">
						<img src={counseling.mentor.image} alt={counseling.mentor.name} className="w-24 h-24 rounded-full object-cover border-4 border-[var(--accent)]" />
						<div>
							<h3 className="text-xl font-bold text-[var(--primary)]">Meet Your Mentor: {counseling.mentor.name}</h3>
							<p className="text-gray-700 mt-2">{counseling.mentor.bio}</p>
						</div>
					</div>
				</div>
			)}

			{/* FAQ Section */}
			{counseling.faq && (
				<div className="w-full mx-auto container mb-8">
					<div className="bg-white rounded-3xl shadow p-6">
						<h3 className="text-xl font-bold text-[var(--primary)] mb-4">Frequently Asked Questions</h3>
						<div className="space-y-4">
							{counseling.faq.map((item: any, i: number) => (
								<div key={i}>
									<div className="font-semibold text-[var(--primary)]">Q: {item.q}</div>
									<div className="text-gray-700 ml-2">A: {item.a}</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}

			{/* Contact Section */}
			{counseling.contact && (
				<div className="w-full mx-auto container mb-8">
					<div className="bg-white rounded-3xl shadow p-6 flex flex-col md:flex-row items-center gap-6">
						<div>
							<h3 className="text-xl font-bold text-[var(--primary)] mb-2">Contact for More Info</h3>
							<div className="text-gray-700">Email: <a href={`mailto:${counseling.contact.email}`} className="text-[var(--primary)] underline">{counseling.contact.email}</a></div>
							<div className="text-gray-700">Phone: <a href={`tel:${counseling.contact.phone}`} className="text-[var(--primary)] underline">{counseling.contact.phone}</a></div>
						</div>
					</div>
				</div>
			)}

			{/* Testimonials Section */}
			{counseling.testimonials && (
				<div className="w-full mx-auto container mb-8">
					<div className="bg-white rounded-3xl shadow p-6">
						<h3 className="text-xl font-bold text-[var(--primary)] mb-4">What Our Students Say</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{counseling.testimonials.map((t: any, i: number) => (
								<div key={i} className="flex gap-4 items-center bg-[var(--muted-background)] rounded-xl p-4">
									<img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-[var(--accent)]" />
									<div>
										<div className="font-semibold text-[var(--primary)]">{t.name}</div>
										<div className="text-gray-700 text-sm mt-1">{t.text}</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
