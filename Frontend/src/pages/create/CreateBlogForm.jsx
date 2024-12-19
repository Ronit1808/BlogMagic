import React, { useState } from "react";
import api from "../../api";
import Bloggif from "../../assets/Blog.gif";
import { FaCopy, FaPen, FaTimes } from "react-icons/fa";

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
      if (formData.content_method === "ai") {
        const response = await api.post("create/", formData);
        setResponseData(response.data);
      } else {
        setResponseData({
          topic: formData.topic,
          tone: formData.tone,
          length: formData.length,
          content: formData.content,
        });
      }
    } catch (error) {
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

  const handleSave = () => {
    alert("Blog saved successfully");
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
            <div>
              <div className="text-center text-white font-semibold text-2xl">
                {formData.topic}
              </div>
              <p className="text-left px-6 text-green-300 pr-10 italic">
                Tone : {formData.tone}
              </p>
              <p className="text-left px-6 mb-4 text-green-300 pr-10 italic">
                Length : {formData.length}
              </p>
              <div className="flex justify-end items-center text-gray-300 pr-10 gap-4 mb-4">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={handleCopyCode}
                >
                  <FaCopy className="mr-2" /> Copy 
                </div>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={toggleEdit}
                >
                  {isEditing ? <FaTimes className="mr-2" /> : <FaPen className="mr-2" />}
                  {isEditing ? "Stop Editing" : "Edit"}
                </div>
              </div>
              <div
                className={`p-6 rounded-lg ${
                  isEditing
                    ? "bg-white text-black border"
                    : "bg-[#1e1a78] text-white"
                }`}
              >
                {isEditing ? (
                  <textarea
                    value={responseData.content}
                    onChange={(e) =>
                      setResponseData({ ...responseData, content: e.target.value })
                    }
                    className="block w-full px-4 py-3 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    rows="8"
                  />
                ) : (
                  <div
                    className={`overflow-hidden ${
                      showFullContent ? "max-h-full" : "max-h-32"
                    } transition-all duration-300`}
                    style={{
                      whiteSpace: "pre-wrap",
                      lineHeight: "1.6",
                    }}
                  >
                    {responseData.content}
                  </div>
                )}
                {!isEditing && (
                  <button
                    onClick={toggleShowContent}
                    className="mt-4 text-indigo-300 underline"
                  >
                    {showFullContent ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={handleCreateAnother}
                  className="py-3 px-4 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-semibold rounded-lg"
                >
                  Create Another
                </button>
                <button
                  onClick={handleSave}
                  className="py-3 px-4 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 hover:from-cyan-500 hover:via-teal-500 hover:to-green-500 text-white font-semibold rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateBlogForm;