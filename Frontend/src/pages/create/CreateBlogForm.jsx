import React, { useState } from "react";
import api from "../../api";
import Bloggif from "../../assets/Blog.gif";
import BlogResponse from "./BlogResponse";

const CreateBlogForm = () => {
  const initialFormData = {
    topic: "",
    tone: "friendly",
    length: "medium",
    content_method: "ai",
    content: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponseData(null);

    try {
        const response = await api.post("create/", formData);
        setResponseData(response.data);
      }
    catch (error) {
      setError("Failed to create the blog. Please try again.");
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAnother = () => {
    setFormData(initialFormData);
    setResponseData(null);
    setError("");
    setIsEditing(false);
    setShowFullContent(false);
  };

  const handleSave = async () => {
    if (responseData?.slug) {
      try {
        const updatedData = {
          topic: responseData.topic,
          tone: responseData.tone,
          length: responseData.length,
          content: responseData.content,
          content_method: responseData.content_method,
        };
        await api.patch(`blogs/${responseData.slug}/edit/`, updatedData);
        alert("Blog saved successfully!");
      } catch (error) {
        alert("Failed to save the blog. Please try again.");
        console.error("Error:", error.response?.data || error.message);
      }
    }
  };
  
  const handleCopyCode = () => {
    if (responseData?.content) {
      navigator.clipboard.writeText(responseData.content);
      alert("Content copied to clipboard!");
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const toggleShowContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] pt-4 pb-10 flex justify-center items-center">
      <div className="max-w-5xl w-full flex rounded-2xl shadow-lg bg-white overflow-hidden">
        {!responseData && (
          <div className="w-1/2 bg-indigo-600 text-white p-8 flex flex-col justify-center relative">
            <img
              src={Bloggif}
              alt="Creative Background"
              className="w-full h-auto object-cover opacity-80"
            />
            <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-white">
              Start Your Creative Journey
            </h2>
          </div>
        )}

        <div
          className={`${
            responseData ? "w-full bg-[#1e1a78]" : "w-1/2"
          } p-8 flex flex-col justify-center`}
        >
          {!responseData ? (
            <>
              <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                {formData.content_method === "ai"
                  ? "Create a Blog Post"
                  : "Write Your Blog Post"}
              </h1>

              {error && (
                <div className="mb-4 p-4 bg-red-500 text-white text-center rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="topic"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Topic
                  </label>
                  <input
                    type="text"
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your blog topic"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="tone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tone
                  </label>
                  <select
                    id="tone"
                    name="tone"
                    value={formData.tone}
                    onChange={handleChange}
                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="friendly">Friendly</option>
                    <option value="professional">Professional</option>
                    <option value="neutral">Neutral</option>
                    <option value="informal">Informal</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="length"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Length
                  </label>
                  <select
                    id="length"
                    name="length"
                    value={formData.length}
                    onChange={handleChange}
                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="content_method"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Content Method
                  </label>
                  <select
                    id="content_method"
                    name="content_method"
                    value={formData.content_method}
                    onChange={handleChange}
                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="ai">AI-Generated</option>
                    <option value="user">User-Created</option>
                  </select>
                </div>

                {formData.content_method === "user" && (
                  <div>
                    <label
                      htmlFor="content"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Content
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500"
                      placeholder="Write your blog content here..."
                      rows="6"
                      required
                    />
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    className={`w-full py-3 px-4 text-white font-semibold rounded-lg ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                    }`}
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <BlogResponse
              responseData={responseData}
              formData={formData}
              isEditing={isEditing}
              showFullContent={showFullContent}
              handleCopyCode={handleCopyCode}
              toggleEdit={toggleEdit}
              toggleShowContent={toggleShowContent}
              handleCreateAnother = {handleCreateAnother}
              handleSave = {handleSave}
              setResponseData = {setResponseData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateBlogForm;