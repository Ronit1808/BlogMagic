import React from "react";

const BlogCard = ({ title, content, author, date, onClick }) => {
  return (
    <div
      className="bg-[#1e1a78] p-4 rounded-lg shadow-md hover:shadow-lg max-w-sm min-h-[200px] max-h-[200px] flex flex-col transition-shadow duration-300 cursor-pointer"
      onClick={onClick} // Trigger to view full content
    >
      {/* Title */}
      <h2 className="text-lg font-bold text-white">{title}</h2>
      
      {/* Description with line clamping */}
      <p
        className="text-gray-300 text-sm mt-2 line-clamp-3"
      >
        {content}
      </p>

      {/* Footer */}
      <div className="mt-4 flex justify-between items-center text-gray-400 text-xs">
        <span>By: {author}</span>
        <span>{date}</span>
      </div>
    </div>
  );
};

export default BlogCard;
