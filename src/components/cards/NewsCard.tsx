import { ChevronRightIcon } from "lucide-react";

const NewsCard = ({ title, date, description, link }:{ title: string; date: string; description: string; link: string; }) => (
  <a href={link} className="flex-shrink-0 w-full bg-white shadow-sm rounded-xl p-6 flex flex-col">
    {/* Card Content */}
    <div className="flex-grow">
      <h3 className="text-lg font-bold text-[var(--primary)] leading-tight line-clamp-2">
        {title}
      </h3>
      <p className="mt-2 text-sm text-[var(--muted-text)]">{date}</p>
      <p className="mt-4 text-gray-700 text-sm leading-relaxed line-clamp-3">
        {description}
      </p>
    </div>

    {/* Read More Link */}
    <div className="mt-6 flex items-center justify-between font-semibold text-[var(--primary)] group">
      <span>Read more</span>
      <ChevronRightIcon className="w-5 h-5 text-[var(--primary)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-transform duration-200" />
    </div>
  </a>
);

export default NewsCard;