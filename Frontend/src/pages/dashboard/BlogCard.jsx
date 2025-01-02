import React from "react";

const BlogCard = ({ title, content, author, date, profile_image, onClick }) => {
  const contentSource = author === "ai" ? "AI Generated" : "User Created";

  return (
    <div
      className="bg-gradient-to-r from-violet-200 to-pink-200 p-6 rounded-lg shadow-lg hover:shadow-xl max-w-sm min-h-[220px] transition-transform duration-300 transform hover:-translate-y-2 cursor-pointer"
      onClick={onClick} 
    >
      {/* Profile Image and Title */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={profile_image || "https://via.placeholder.com/40"} 
          alt={`${author} profile`}
          className="w-12 h-12 rounded-full object-cover shadow-md"
        />
        <h2 className="text-lg font-bold text-black line-clamp-2">{title}</h2>
      </div>

      {/* Content Preview */}
      <p className=" text-sm font-semibold mb-4 line-clamp-3">{content}</p>

      {/* Footer with Content Type and Date */}
      <div className="flex justify-between items-center text-sm text-black">
        <p className="bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent font-semibold">{contentSource}</p>
        <p>{date}</p>
      </div>
    </div>
  );
};

export default BlogCard;
