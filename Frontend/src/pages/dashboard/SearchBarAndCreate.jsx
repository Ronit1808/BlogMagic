import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SearchBarAndCreate = ({ searchQuery, setSearchQuery }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(localSearchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [localSearchQuery, setSearchQuery]);

  const handleSearch = (e) => {
    setLocalSearchQuery(e.target.value);
  };

  return (
    <div className="flex basis-4/5 flex-row justify-around items-center" >
      {/* Search Bar */}
      <input
        type="text"
        value={localSearchQuery}
        onChange={handleSearch}
        placeholder="Search blogs..."
        className="w-2/3 px-4 py-2 rounded-lg bg-white border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />

      {/* Create Blog Button */}
      <Link to='/create'>
        <button
            className="ml-8 py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 transition-all duration-200"
        >
            Create
        </button>
      </Link>
    </div>
  );
};

export default SearchBarAndCreate;
