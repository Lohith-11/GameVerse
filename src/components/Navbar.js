import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ userLoggedIn, setUserLoggedIn }) => {
  const handleLogout = () => {
    setUserLoggedIn(null); // Log out the user
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Brand */}
        <h1 className="text-3xl font-extrabold text-white">GameVerse</h1>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-white hover:text-yellow-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/games"
            className="text-white hover:text-yellow-300 transition duration-300"
          >
            Games
          </Link>
          <Link
            to="/about-us"
            className="text-white hover:text-yellow-300 transition duration-300"
          >
            About
          </Link>
          <Link
            to="/contact-us"
            className="text-white hover:text-yellow-300 transition duration-300"
          >
            Contact
          </Link>

          {/* Dynamic Login/Logout */}
          {userLoggedIn ? (
            <div className="relative">
              <div className="group relative flex items-center">
                <button
                  className="text-white hover:text-yellow-300 flex items-center space-x-2 focus:outline-none"
                  aria-expanded="false"
                >
                  <span>{userLoggedIn.name}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 9l6 6 6-6"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <ul
                  className="absolute right-0 mt-2 w-32 bg-gray-800 text-white rounded-md shadow-lg group-hover:block hidden"
                  style={{ zIndex: 1000 }}
                >
                  <li
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white hover:text-yellow-300 transition duration-300"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
