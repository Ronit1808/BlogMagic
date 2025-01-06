import React from "react";
import illustration2 from "../../assets/illustration2.svg";

const DescriptionSection = () => {
  return (
    <div className="text-white py-10 mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center">
        {/* Text Section */}
        <div className="w-full lg:w-1/2 lg:pr-12 text-center lg:text-left">
          <h2 className="text-xl sm:text-4xl font-bold">
            Your Creativity, Amplified
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-300">
            BlogMagic lets you focus on your ideas while we provide the tools to
            transform them into compelling content. From bloggers to businesses, 
            we’ve got you covered.
          </p>
          <ul className="mt-6 text-sm space-y-4">
            <li className="flex items-start">
              <svg
                className="h-6 w-6 text-indigo-500 mr-3 "
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4M7 7h.01M4 7h.01M7 10h.01M4 10h.01M10 10h.01M4 4h16M4 16h16M4 20h16"
                ></path>
              </svg>
              <span className="text-gray-300">
                AI-driven insights to improve your writing.
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-6 w-6 text-indigo-500 mr-3 "
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4M7 7h.01M4 7h.01M7 10h.01M4 10h.01M10 10h.01M4 4h16M4 16h16M4 20h16"
                ></path>
              </svg>
              <span className="text-gray-300">
                Integrate creativity with cutting-edge technology.
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-6 w-6 text-indigo-500 mr-3 "
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4M7 7h.01M4 7h.01M7 10h.01M4 10h.01M10 10h.01M4 4h16M4 16h16M4 20h16"
                ></path>
              </svg>
              <span className="text-gray-300">
                Perfect for all types of content creators.
              </span>
            </li>
          </ul>
        </div>

        {/* Image Section */}
        <div className="w-full mb-20 lg:w-1/2 mt-12 lg:mt-0">
          <img
            src={illustration2}
            alt="AI Writing Illustration"
            className="rounded-lg shadow-lg w-full transform transition-transform duration-500 hover:scale-105 hover:rotate-2"
          />
        </div>
      </div>
    </div>
  );
};

export default DescriptionSection;
