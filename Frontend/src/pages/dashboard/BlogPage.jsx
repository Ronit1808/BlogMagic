import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlogResponse from "../create/BlogResponse";
import api from "../../api";

const BlogPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`blogs/${slug}/`);
        setBlog(response.data);
      } catch (error) {
        console.error("Failed to fetch blog:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const handleDelete = async () => {
    try {
      await api.delete(`blogs/${slug}/delete/`);
      alert("Blog deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete blog:", error.response?.data || error.message);
      alert("Failed to delete the blog. Please try again.");
    }
  };

  const handleSave = async () => {
    if (blog?.slug) {
      try {
        const updatedData = {
          topic: blog.topic,
          tone: blog.tone,
          length: blog.length,
          content: blog.content,
          content_method: blog.content_method,
        };
        await api.patch(`blogs/${blog.slug}/edit/`, updatedData);
        alert("Blog saved successfully!");
      } catch (error) {
        alert("Failed to save the blog. Please try again.");
        console.error("Error:", error.response?.data || error.message);
      }
    } else {
      alert("Unable to save. Blog slug is missing.");
    }
  };

  const handleCopyCode = () => {
    if (blog?.content) {
      navigator.clipboard.writeText(blog.content);
      alert("Content copied to clipboard!");
    }
  };

  const toggleEdit = () => setIsEditing(!isEditing);
  const toggleShowContent = () => setShowFullContent(!showFullContent);

  if (loading) {
    return <p>Loading blog...</p>;
  }

  if (!blog) {
    return <p>Blog not found.</p>;
  }

  return (
    <div className="container max-w-5xl w-full rounded-lg px-10 mt-4 bg-[#1e1a78] mx-auto py-8">
      <BlogResponse
        responseData={blog}
        formData={{
          topic: blog.topic,
          tone: blog.tone,
          length: blog.length,
          content_method: blog.content_method,
        }}
        slug={slug} // Pass slug to determine which button to show
        isEditing={isEditing}
        showFullContent={showFullContent}
        handleCopyCode={handleCopyCode}
        toggleEdit={toggleEdit}
        toggleShowContent={toggleShowContent}
        handleSave={handleSave}
        handleDelete={handleDelete} // Delete functionality
        handleCreateAnother={() => navigate("/create")} // Redirect to create page
        setResponseData={setBlog}
      />
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/dashboard")}
          className="py-3 px-4 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
        >
          Back to Blog List
        </button>
      </div>
    </div>
  );
};

export default BlogPage;
