import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import useOutsideClick from "../../useOutsideClick";
import { RxMagicWand } from "react-icons/rx";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const isLoggedIn = !!user;

  const menuRef = useRef();
  const buttonRef = useRef(); 
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useOutsideClick(menuRef, () => setIsMenuOpen(false), [buttonRef]);

  return (
    <div className="Navbar">
      <nav className="text-white">
        <div className="max-w-7xl py-2 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">BlogMagic</span>
              </Link>
              <span className="text-lg sm:text-xl  pt-2 pl-2 "> <RxMagicWand /> </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex sm:space-x-6 items-center">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="hover:text-indigo-500 transition duration-200">
                    Login
                  </Link>
                  <Link to="/register" className="hover:text-indigo-500 transition duration-200">
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="hover:text-indigo-500 transition duration-200">
                    Dashboard
                  </Link>
                  <Link to="/account" className="hover:text-indigo-500 transition duration-200">
                    Account
                  </Link>
                  <Link className="hover:text-indigo-500 transition duration-200" onClick={logoutUser}>
                    Logout
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden flex items-center">
              <button
                ref={buttonRef}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-indigo-500 focus:outline-none"
              >
                {isMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div ref={menuRef} className="sm:hidden">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="block px-4 py-2 text-white hover:bg-indigo-800">
                  Login
                </Link>
                <Link to="/register" className="block px-4 py-2 text-white hover:bg-indigo-800">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="block px-4 py-2 text-white hover:bg-indigo-800">
                  Dashboard
                </Link>
                <Link to="/account" className="block px-4 py-2 text-white hover:bg-indigo-800">
                  Account
                </Link>
                <Link onClick={logoutUser} className="block px-4 py-2 text-white hover:bg-indigo-800">
                  Logout
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
