import React from "react";

const TYPE_CHOICES = [
  { value: 'ai', label: 'AI-Generated' },
  { value: 'user', label: 'User-Created' }
];

const FilterSidebar = ({ filters, setFilters }) => {
  const handleChange = (category, value) => {
    const updatedFilters = { ...filters };
    if (!updatedFilters[category]) updatedFilters[category] = [];

    const index = updatedFilters[category].indexOf(value);
    if (index > -1) {
      updatedFilters[category].splice(index, 1);
    } else {
      updatedFilters[category].push(value);
    }

    console.log('Updating filters:', updatedFilters);
    setFilters(updatedFilters);
  };

  return (
    <div className="w-full lg:w-1/4 bg-[#1e1a78] p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-white mb-4">Filter Blogs</h3>

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
  );
};

export default FilterSidebar;