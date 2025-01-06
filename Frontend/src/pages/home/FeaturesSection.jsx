import React from "react";
import illustration from '../../assets/illustration.svg'

const FeaturesSection = () => {
  return (
    <div className="text-white py-10 mt-4 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 group">
          <img
            src={illustration}
            alt="AI Writing Illustration"
            className="rounded-lg shadow-lg w-full transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2 "
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 lg:pl-12 text-center lg:text-left">
          <h2 className="text-xl sm:text-4xl font-bold">
            Effortless Content Creation
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-300">
            BlogMagic combines advanced AI with intuitive design to help you create content faster, better, and smarter. Focus on your ideas, and we’ll handle the rest.
          </p>
          <ul className="mt-6 text-sm sm:text-base space-y-4">
            <li className="flex items-start">
              <svg
                className="h-6 w-6 text-indigo-500 mr-3"
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
              <span className="text-gray-300">Generate high-quality blogs in minutes.</span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-6 w-6 text-indigo-500 mr-3"
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
              <span className="text-gray-300">Customize tone, topic, and length effortlessly.</span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-6 w-6 text-indigo-500 mr-3"
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
              <span className="text-gray-300">AI tailored to your unique style and needs.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
