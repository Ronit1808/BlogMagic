import React, { useState , useEffect } from "react";
import SearchBarAndCreate from "./SearchBarAndCreate";
import FilterSidebar from "./FilterSidebar";
import BlogCardsContainer from "./BlogCardsContainer";
import api from "../../api";

const DashboardPage = () => {
  const [filters, setFilters] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get("blogs/");
        setBlogs(response.data.results); // Assuming paginated results
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Fetch blogs based on filters
  useEffect(() => {
    const fetchFilteredBlogs = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (filters.tone) queryParams.append("tone", filters.tone.join(","));
        if (filters.length) queryParams.append("length", filters.length.join(","));
        if (filters.type) queryParams.append("type", filters.type.join(","));

        const response = await api.get(`blogs/?${queryParams.toString()}`);
        setBlogs(response.data.results);
      } catch (error) {
        console.error("Failed to fetch blogs:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredBlogs();
  }, [filters]);

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Section: Search & Create */}
      <SearchBarAndCreate />

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row mt-8 gap-8">
        {/* Filter Sidebar */}
        <FilterSidebar filters={filters} setFilters={setFilters} />

        {/* Blog Cards */}
        <BlogCardsContainer blogs={blogs} loading={loading} />
      </div>
    </div>
  );
};

export default DashboardPage;
