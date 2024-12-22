import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import Modal from "./Modal";
import api from "../../api";

const BlogCardsContainer = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch blogs from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get("blogs/");
        setBlogs(response.data.results); // Assuming paginated results
      } catch (error) {
        console.error("Failed to fetch blogs:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Handlers
  const handleCardClick = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleEdit = () => {
    alert("Edit functionality coming soon!");
  };

  const handleDelete = () => {
    alert("Delete functionality coming soon!");
  };

  // Loader display while fetching data
  if (loading) {
    return <p>Loading blogs...</p>;
  }

  return (
    <div>
      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.slug} // Use `slug` or `id` as the unique identifier
            title={blog.topic}
            content={blog.content || "No content available"}
            author={blog.user.username || "Anonymous"} // Adjust if user is included in API response
            date={new Date(blog.created_at).toLocaleDateString()} // Format the date
            onClick={() => handleCardClick(blog)}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedBlog && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          blog={selectedBlog}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default BlogCardsContainer;
