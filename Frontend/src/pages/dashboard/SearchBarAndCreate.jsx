import React from "react";
import { Link } from "react-router-dom";

const SearchBarAndCreate = () => {
  return (
    <div className="flex justify-center items-center mb-8 gap-6 ">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search blogs..."
        className="w-2/3 px-4 py-2 rounded-lg bg-white border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />

      {/* Create Blog Button */}
      <Link to='/create'>
        <button
            className="ml-4 bg-indigo-700 hover:bg-indigo-500 text-white py-2 px-6 rounded-lg shadow-md transition duration-300"
        >
            Create
        </button>
      </Link>
    </div>
  );
};

export default SearchBarAndCreate;
