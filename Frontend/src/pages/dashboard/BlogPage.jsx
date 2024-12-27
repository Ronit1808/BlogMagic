import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlogResponse from "../create/BlogResponse";
import api from "../../api";
import { toast } from "react-toastify";

const BlogPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [originalContent, setOriginalContent] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`blogs/${slug}/`);
        setBlog(response.data);
        setOriginalContent(response.data.content); // Store original content
      } catch (error) {
        console.error("Failed to fetch blog:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const confirmDelete = () => {
    toast( 
      ({ closeToast }) => (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-800 text-center font-semibold">
            Are you sure you want to delete this blog?
          </p>
          <div className="flex justify-around mt-4">
            <button
              className="py-2 px-6 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600"
              onClick={() => {
                closeToast();
                handleDelete();
              }}
            >
              Yes
            </button>
            <button
              className="py-2 px-6 bg-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-400"
              onClick={closeToast}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        hideProgressBar: true,
        theme: "white"
      }
    );
  };
  

  const handleDelete = async () => {
    try {
      await api.delete(`blogs/${slug}/delete/`);
      toast.success("Blog deleted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to delete blog:", error.response?.data || error.message);
      alert("Failed to delete the blog. Please try again.");
    }
  };

  const handleNavigation = (path) => {
    if (blog?.content !== originalContent) {
      toast(
        ({ closeToast }) => (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-800 text-center font-semibold">
              You have unsaved changes. Save before leaving?
            </p>
            <div className="flex justify-around mt-4">
              <button
                className="py-2 px-6 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600"
                onClick={() => {
                  closeToast();
                  handleSave(); // Save changes
                  navigate(path); // Navigate to the new page
                }}
              >
                Save
              </button>
              <button
                className="py-2 px-6 bg-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-400"
                onClick={() => {
                  closeToast();
                  navigate(path); // Navigate without saving
                }}
              >
                Discard
              </button>
            </div>
          </div>
        ),
        {
          position: "top-center",
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          closeButton: false,
          hideProgressBar: true,
          theme: "white"
        }
      );
    } else {
      navigate(path); // Navigate immediately if no changes
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
        toast.success("Blog saved successfully!");
        setOriginalContent(blog.content); 
      } catch (error) {
        toast.error("Failed to save the blog. Please try again.");
        console.error("Error:", error.response?.data || error.message);
      }
    } else {
      toast.error("Unable to save. Blog slug is missing.");
    }
  };

  const handleCopyCode = () => {
    if (blog?.content) {
      navigator.clipboard.writeText(blog.content);
      toast.info("Content copied to clipboard!");
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
    <div className="container max-w-5xl w-full rounded-lg px-3 sm:px-10 mt-4 bg-[#1e1a78] mx-auto py-8">
      <BlogResponse
        responseData={blog}
        formData={{
          topic: blog.topic,
          tone: blog.tone,
          length: blog.length,
          content_method: blog.content_method,
        }}
        slug={slug} // Passed slug to determine which button to show
        isEditing={isEditing}
        showFullContent={showFullContent}
        handleCopyCode={handleCopyCode}
        toggleEdit={toggleEdit}
        toggleShowContent={toggleShowContent}
        handleSave={handleSave}
        handleDelete={confirmDelete}
        handleCreateAnother={() => handleNavigation("/create")} 
        setResponseData={setBlog}
      />
      <div className="mt-6 text-center">
        <button
          onClick={() => handleNavigation("/dashboard")}
          className="py-3 px-4 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
        >
          Back 
        </button>
      </div>
    </div>
  );
};

export default BlogPage;
