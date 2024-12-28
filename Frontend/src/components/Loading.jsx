import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative">
        {/* Spinner */}
        <div className="w-16 h-16 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
        {/* Glow Effect */}
        <div className="absolute top-0 left-0 w-16 h-16 rounded-full bg-blue-500 blur-lg opacity-30"></div>
      </div>
    </div>
  );
};

export default Loading;
