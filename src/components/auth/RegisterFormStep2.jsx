"use client";

export default function RegisterFormStep2({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd validate these fields before final submission
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact */}
      <div>
        <label
          htmlFor="contact"
          className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
        >
          Contact
        </label>
        <input
          type="text"
          id="contact"
          placeholder="Enter your Contact"
          className="w-full p-3 border border-[var(--border)] rounded-lg shadow-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition placeholder:text-[var(--muted-text)]"
          required
        />
      </div>

      {/* Preferences */}
      <div>
        <label
          htmlFor="preferences"
          className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
        >
          Preferences
        </label>
        <input
          type="text"
          id="preferences"
          placeholder="Enter your Preferences"
          className="w-full p-3 border border-[var(--border)] rounded-lg shadow-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition placeholder:text-[var(--muted-text)]"
          required
        />
      </div>

      {/* Course */}
      <div>
        <label
          htmlFor="course"
          className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
        >
          Course
        </label>
        <select
          id="course"
          defaultValue="Engineering"
          className="w-full p-3 border border-[var(--border)] rounded-lg shadow-sm bg-white text-[var(--muted-text)] focus:text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition"
          required
        >
          <option>Engineering</option>
          <option>Medical</option>
          <option>Commerce</option>
          <option>Arts</option>
        </select>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-[var(--primary)] text-white font-semibold p-3.5 rounded-lg shadow-md hover:opacity-90 transition-opacity"
        >
          Submit
        </button>
      </div>
    </form>
  );
}