import React, { useState, useEffect } from "react";
import SearchBarAndCreate from "./SearchBarAndCreate";
import FilterSidebar from "./FilterSidebar";
import BlogCardsContainer from "./BlogCardsContainer";
import api from "../../api";

const DashboardPage = () => {
  const [filters, setFilters] = useState({
    tone: [],
    length: [],
    type: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFilterChange = (newFilters) => {
    console.log('Previous filters:', filters);
    console.log('New filters:', newFilters);
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      tone: [],
      length: [],
      type: []
    }); 
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get("blogs/");
        setBlogs(response.data.results);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchFilteredBlogs = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        
        Object.entries(filters).forEach(([key, values]) => {
          if (values && values.length > 0) {
            const paramKey = key === 'type' ? 'content_method__in' : `${key}__in`;
            queryParams.append(paramKey, values.join(','));
          }
        });

        const queryString = queryParams.toString();
        const url = `blogs/${queryString ? `?${queryString}` : ''}`;

        console.log('Fetching URL:', url);
        const response = await api.get(url);
        setBlogs(response.data.results);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredBlogs();
  }, [filters]);

  useEffect(() => {
    const fetchFilteredBlogs = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        
       
        if (searchQuery) {
          queryParams.append('search', searchQuery);
        }

        Object.entries(filters).forEach(([key, values]) => {
          if (values && values.length > 0) {
            const paramKey = key === 'type' ? 'content_method__in' : `${key}__in`;
            queryParams.append(paramKey, values.join(','));
          }
        });

        const queryString = queryParams.toString();
        const url = `blogs/${queryString ? `?${queryString}` : ''}`;

        const response = await api.get(url);
        setBlogs(response.data.results);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFilteredBlogs();
  }, [filters, searchQuery]);


  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-row max-w-7xl px-4 sm:px-6 items-center ">
        <FilterSidebar  filters={filters} setFilters={handleFilterChange} handleClearFilters={handleClearFilters} />
        <SearchBarAndCreate  searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      </div>
      <div className=" flex flex-col px-2 lg:flex-row lg:justify-around mt-10">
       
        <BlogCardsContainer blogs={blogs} loading={loading} />
      </div>
    </div>
  );
};

export default DashboardPage;