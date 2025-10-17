import { Search } from "lucide-react";
import React from "react";

const SearchBar = ({
  onSearch,
  placeholder,
}: {
  onSearch: () => void;
  placeholder: string;
}) => {
  return (
    <div className="mt-2 max-w-3xl mx-auto border-2 border-gray-300 rounded-full bg-white/10 shadow-lg mb-4">
      <form className="relative flex items-center" onSubmit={onSearch}>
        <input
          type="text"
          placeholder={placeholder}
          className="w-full h-16 pl-8 pr-24 text-lg text-gray-800 placeholder-gray-500 bg-white rounded-full focus:outline-none focus:ring-4 focus:ring-blue-500/50"
        />
        <button
          type="submit"
          aria-label="Search"
          className="absolute right-2 w-13 h-13 bg-[var(--primary)] rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-4 focus:ring-blue-500/50 cursor-pointer hover:bg-[var(--accent)]"
        >
          <Search className="h-6 w-6 text-white" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
