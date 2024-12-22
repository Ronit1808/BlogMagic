import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./context/AuthContext";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {user , logoutUser} = useContext(AuthContext)
  const isLoggedIn = !!user


  return (
    <div className="Navbar">
      <nav className=" text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to='/'>
                <span className="text-2xl font-bold text-white">
                  BlogMagic
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex sm:space-x-6 items-center">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="hover:text-indigo-500 transition duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="hover:text-indigo-500 transition duration-200"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="hover:text-indigo-500 transition duration-200"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/account"
                    className="hover:text-indigo-500 transition duration-200"
                  >
                    Account
                  </Link>
                  <Link
                    className="hover:text-indigo-500 transition duration-200"
                    onClick={logoutUser}
                  >
                    Logout
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-indigo-500 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            {!isLoggedIn ? (
              <>
                <a
                  href="/login"
                  className="block px-4 py-2 text-white hover:bg-indigo-800"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="block px-4 py-2 text-white hover:bg-indigo-800"
                >
                  Register
                </a>
              </>
            ) : (
              <>
                <a
                  href="/account"
                  className="block px-4 py-2 text-white hover:bg-indigo-800"
                >
                  Account
                </a>
                <a
                  href="/logout"
                  className="block px-4 py-2 text-white hover:bg-indigo-800"
                >
                  Logout
                </a>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
