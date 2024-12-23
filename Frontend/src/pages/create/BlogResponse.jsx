import React from "react";
import { FaCopy, FaPen, FaTimes } from "react-icons/fa";

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
  slug
}) => {
  return (
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
              {slug ? (
                  <button
                    onClick={handleDelete}
                    className="py-3 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    onClick={handleCreateAnother}
                    className="py-3 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
                  >
                    Create Another
                  </button>
                )}
                <button
                  onClick={handleSave}
                  className="py-3 px-4 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 hover:from-cyan-500 hover:via-teal-500 hover:to-green-500 text-white font-semibold rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
  )
}

export default BlogResponse