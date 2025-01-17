import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-auto text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold">About BlogMagic</h3>
            <p className="mt-4 text-gray-300">
              BlogMagic is an AI-powered platform to create stunning, engaging, 
              and personalized blog content effortlessly. Start your journey with us today.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-base sm:text-lg  font-semibold">Quick Links</h3>
            <ul className="mt-4 text-sm space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-indigo-500 transition duration-200"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-indigo-500 transition duration-200"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-indigo-500 transition duration-200"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-indigo-500 transition duration-200"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-base sm:text-lg  font-semibold">Stay Connected</h3>
            <form className="mt-4">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 text-gray-800 rounded focus:outline-none"
              />
              <button
                type="submit"
                className="mt-2 w-full bg-indigo-800 text-white py-2 px-4 rounded hover:bg-indigo-500 transition duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-600 pt-4 flex flex-col sm:flex-row justify-between">
          <p className="text-gray-300 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} BlogMagic. All rights reserved.
          </p>
          <div className="flex text-base sm:text-lg space-x-4 mt-4 sm:mt-0">
            <a
              href="https://facebook.com"
              className="hover:text-indigo-500 transition duration-200"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              className="hover:text-indigo-500 transition duration-200"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://instagram.com"
              className="hover:text-indigo-500 transition duration-200"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              className="hover:text-indigo-500 transition duration-200"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
