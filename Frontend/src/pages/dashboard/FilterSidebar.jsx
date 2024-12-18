import React from "react";

const FilterSidebar = () => {
  return (
    <div className="w-full lg:w-1/4 bg-gradient-to-r from-blue-800 to-indigo-900 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-white mb-4">Filter Blogs</h3>

      {/* Tone Filter */}
      <div className="mb-4">
        <h4 className="text-white text-sm font-medium mb-2">Tone</h4>
        <div className="space-y-2">
          <label className="flex items-center text-gray-300">
            <input type="checkbox" className="mr-2" />
            Formal
          </label>
          <label className="flex items-center text-gray-300">
            <input type="checkbox" className="mr-2" />
            Friendly
          </label>
          <label className="flex items-center text-gray-300">
            <input type="checkbox" className="mr-2" />
            Informal
          </label>
          <label className="flex items-center text-gray-300">
            <input type="checkbox" className="mr-2" />
            Professional
          </label>
        </div>
      </div>

      {/* Length Filter */}
      <div className="mb-4">
        <h4 className="text-white text-sm font-medium mb-2">Length</h4>
        <div className="space-y-2">
          <label className="flex items-center text-gray-300">
            <input type="checkbox" className="mr-2" />
            Short
          </label>
          <label className="flex items-center text-gray-300">
            <input type="checkbox" className="mr-2" />
            Medium
          </label>
          <label className="flex items-center text-gray-300">
            <input type="checkbox" className="mr-2" />
            Long
          </label>
        </div>
      </div>

      {/* Type Filter */}
      <div className="mb-4">
        <h4 className="text-white text-sm font-medium mb-2">Type</h4>
        <div className="space-y-2">
          <label className="flex items-center text-gray-300">
            <input type="checkbox" className="mr-2" />
            AI Generated
          </label>
          <label className="flex items-center text-gray-300">
            <input type="checkbox" className="mr-2" />
            User Generated
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
