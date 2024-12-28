import React, { useState, useRef } from "react";
import useOutsideClick from '../../../useOutsideClick';

const TYPE_CHOICES = [
  { value: "ai", label: "AI-Generated" },
  { value: "user", label: "User-Created" },
];

const FilterSidebar = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef();
  const excludeRefs = []; // Add any additional refs to exclude from outside clicks

  // Use custom hook for outside click detection
  useOutsideClick(sidebarRef, () => setIsOpen(false), excludeRefs);

  const handleChange = (category, value) => {
    const updatedFilters = { ...filters };
    if (!updatedFilters[category]) updatedFilters[category] = [];

    const index = updatedFilters[category].indexOf(value);
    if (index > -1) {
      updatedFilters[category].splice(index, 1);
    } else {
      updatedFilters[category].push(value);
    }

    console.log("Updating filters:", updatedFilters);
    setFilters(updatedFilters);
  };

  return (
    <div className="flex basis-1/5 justify-around">
      {/* Toggle Button for Mobile */}
      <button
        className="mr-8 py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-base text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 transition-all duration-200"
        onClick={() => setIsOpen(true)}
      >
        Filters
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-gradient-to-r from-blue-900 to-indigo-900 p-6 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-4/5 lg:w-1/4`}
      >
        {/* Close Icon */}
        <button
          className="text-white text-xl absolute top-4 right-4"
          onClick={() => setIsOpen(false)}
        >
          &times;
        </button>

        <h3 className="text-lg font-bold text-white mb-6">Filter Blogs</h3>

        {/* Tone Filter */}
        <div className="mb-4">
          <h4 className="text-white text-sm font-medium mb-2">Tone</h4>
          <div className="space-y-2">
            {["neutral", "informal", "friendly", "professional"].map((tone) => (
              <label key={tone} className="flex items-center text-gray-300">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={filters.tone?.includes(tone)}
                  onChange={() => handleChange("tone", tone)}
                />
                {tone.charAt(0).toUpperCase() + tone.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Length Filter */}
        <div className="mb-4">
          <h4 className="text-white text-sm font-medium mb-2">Length</h4>
          <div className="space-y-2">
            {["short", "medium", "long"].map((length) => (
              <label key={length} className="flex items-center text-gray-300">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={filters.length?.includes(length)}
                  onChange={() => handleChange("length", length)}
                />
                {length.charAt(0).toUpperCase() + length.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div className="mb-4">
          <h4 className="text-white text-sm font-medium mb-2">Type</h4>
          <div className="space-y-2">
            {TYPE_CHOICES.map(({ value, label }) => (
              <label key={value} className="flex items-center text-gray-300">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={filters.type?.includes(value)}
                  onChange={() => handleChange("type", value)}
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
