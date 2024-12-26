import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="text-white flex justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading Section */}
        <h1 className="text-2xl sm:text-6xl font-bold tracking-tight leading-tight">
          Build Smarter, Write Faster. <br />
          <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">Unleash AI-Powered Blogging.</span>
        </h1>
        <p className="mt-3 sm:mt-6 text-sm sm:text-xl text-gray-300">
          Create beautiful, engaging blogs at lightning speed. <br/>
          Let BlogMagic revolutionize how you share your story with the world.
        </p>

          <div className="mt-12">
          <Link
            to="/create"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-6 rounded-lg text-lg shadow-xl transition duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            Create Now
          </Link>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;
