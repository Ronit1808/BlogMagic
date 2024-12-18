import React from "react";
import SearchBarAndCreate from "./SearchBarAndCreate";
import FilterSidebar from "./FilterSidebar";
import BlogCardsContainer from "./BlogCardsContainer";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Section: Search & Create */}
      <SearchBarAndCreate />

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row mt-8 gap-8">
        {/* Filter Sidebar */}
        <FilterSidebar />

        {/* Blog Cards */}
        <BlogCardsContainer />
      </div>
    </div>
  );
};

export default DashboardPage;
