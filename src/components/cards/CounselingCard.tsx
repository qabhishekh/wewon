import { CircleChevronRight } from "lucide-react";

type Props = {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
  originalPrice?: number;
  currentPrice: number;
  buttonText?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const CounselingCard = ({ 
  title, 
  description, 
  imageUrl, 
  imageAlt, 
  originalPrice, 
  currentPrice, 
  buttonText = "Get Now", 
  href, 
  onClick, 
  className = "" 
}: Props) => {
  const buttonContent = (
    <>
      <span className="font-bold">{buttonText}</span>
      <span className="flex items-center justify-center rounded-full bg-white/25 p-1">
        <CircleChevronRight size={16} />
      </span>
    </>
  );

  return (
    <div className={`max-w-sm overflow-hidden rounded-xl bg-white shadow-lg font-sans ${className}`}>
      <img
        className="w-full"
        src={imageUrl}
        alt={imageAlt || title}
      />

      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <h2 className="text-xl font-bold text-[var(--primary)] line-clamp-1">
          {title}
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {description}
        </p>

        {/* Price */}
        <div className="mt-4 flex items-baseline gap-2">
          {originalPrice && (
            <span className="text-base text-red-500 line-through">₹ {originalPrice}</span>
          )}
          <span className="text-base font-bold text-[var(--accent)]">₹ {currentPrice}</span>
        </div>

        {/* Button */}
        {href ? (
          <a
            href={href}
            className="mt-6 w-full flex items-center justify-between rounded-lg bg-[var(--accent)] px-4 py-3 text-white transition-colors hover:bg-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2"
          >
            {buttonContent}
          </a>
        ) : (
          <button
            onClick={onClick}
            className="mt-6 w-full flex items-center justify-between rounded-lg bg-[var(--accent)] px-4 py-3 text-white transition-colors hover:bg-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 cursor-pointer"
          >
            {buttonContent}
          </button>
        )}
      </div>
    </div>
  );
};

export default CounselingCard;