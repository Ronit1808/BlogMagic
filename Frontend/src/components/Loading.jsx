import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative">
        <div className="w-16 h-16 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </div>
  );
};

export default Loading;
