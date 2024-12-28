import React from "react";
import { FaCopy, FaPen, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BlogResponse = ({
  responseData,
  formData,
  isEditing,
  showFullContent,
  handleCopyCode,
  toggleEdit,
  toggleShowContent,
  handleCreateAnother,
  handleSave,
  setResponseData,
  handleDelete,
  handleNavigation,
  slug
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if(slug){
      handleNavigation("/dashboard");
    }
    else{
      navigate("/dashboard");
    }
  }
  return (
            <div>
              <div className="text-center text-white font-semibold text-xl mb-4 sm:text-2xl">
                {formData.topic}
              </div>
              <p className="text-left px-2 text-sm sm:text-lg sm:px-6 text-green-300 pr-10 italic">
                Tone : {formData.tone}
              </p>
              <p className="text-left px-2 text-sm sm:text-lg sm:px-6 mb-4 text-green-300 pr-10 italic">
                Length : {formData.length}
              </p>
              <div className="flex justify-end items-center text-xs sm:text-lg text-gray-300 pr-2 sm:pr-8 gap-4 mb-4">
                <div
                  className="flex items-center cursor-pointer  hover:text-white"
                  onClick={handleCopyCode}
                >
                  <FaCopy className="mr-2" /> Copy 
                </div>
                <div
                  className="flex items-center cursor-pointer  hover:text-white"
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
                    className="block w-full px-2 sm:px-4 py-3 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
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

              <div className="mt-6 flex px-4 justify-between">
              {slug ? (
                  <button
                    onClick={handleDelete}
                    className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-base bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    onClick={handleCreateAnother}
                    className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 transition-all duration-200"
                  >
                    Create Another
                  </button>
                )}
                <button
                  onClick={handleBack}
                  className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-base bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
                >
                  Back 
                </button>
                <button
                  onClick={handleSave}
                  className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 transition-all duration-200"
                >
                  Save
                </button>
              </div>
            </div>
  )
}

export default BlogResponse