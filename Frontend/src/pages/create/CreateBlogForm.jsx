import React, { useState } from "react";
import api from "../../api";
import Bloggif from "../../assets/Blog.gif";

const CreateBlogForm = () => {
  const [formData, setFormData] = useState({
    topic: "",
    tone: "friendly",
    length: "medium",
    content_method: "ai",
  });
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");

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
    } catch (error) {
      setError("Failed to create the blog. Please try again.");
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    alert("Blog saved successfully!"); // Placeholder for save functionality
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] flex justify-center items-center">
      <div className={`max-w-5xl w-full flex rounded-2xl shadow-lg bg-white overflow-hidden`}>
        {/* Conditionally render the left GIF section */}
        {!responseData && (
          <div className="w-1/2 bg-indigo-600 text-white p-8 flex flex-col justify-center relative">
            <img
              src={Bloggif} // Replace with your GIF path
              alt="Creative Background"
              className="w-full h-auto object-cover opacity-80"
            />
            <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-white">
              Start Your Creative Journey
            </h2>
          </div>
        )}

        {/* Right Form/Response Section */}
        <div className={`${responseData ? "w-full" : "w-1/2"} p-8 flex flex-col justify-center`}>
          {!responseData ? (
            <>
              <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Create a Blog Post
              </h1>

              {error && (
                <div className="mb-4 p-4 bg-red-500 text-white text-center rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Topic */}
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

                {/* Tone */}
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

                {/* Length */}
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

                {/* Content Method */}
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

                {/* Submit Button */}
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
                    {loading ? "Creating..." : "Create"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Blog Created Successfully!
              </h2>
              <div className="space-y-4 bg-gray-100 p-6 rounded-lg shadow-md">
                <p>
                  <strong>Topic:</strong> {responseData.topic}
                </p>
                <p>
                  <strong>Tone:</strong> {responseData.tone}
                </p>
                <p>
                  <strong>Length:</strong> {responseData.length}
                </p>
                <div>
                  <strong>Content:</strong>
                  <div className="mt-2 p-4 bg-white rounded-lg shadow-sm h-60 overflow-y-auto border">
                    {responseData.content}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setResponseData(null)} // Reset the form
                  className="py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg"
                >
                  Create Another Blog Post
                </button>
                <button
                  onClick={handleSave} // Save button functionality
                  className="py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
                >
                  Save Blog Post
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateBlogForm;
