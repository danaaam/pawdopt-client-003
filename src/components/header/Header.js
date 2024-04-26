import { FaPaw, FaCog } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa6";

import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Header = () => {
  const isLoggedIn = localStorage.getItem("token", "role");
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const userRole = localStorage.getItem("role");

  const toggleDropdown = (event, dropdownId) => {
    event.preventDefault();
    const dropdownMenu = document.getElementById(dropdownId);
    dropdownMenu.classList.toggle("hidden");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("verified");
    localStorage.removeItem("role");
    window.localStorage.removeItem("isLoggedin"); 
    navigate("/login");
  };

  const handleClickUserstatus = () => {
    navigate('/valid');
  };
  const handleClickAdoptionStatus = () => {
    navigate('/adoption-status');
  };

  useEffect(() => {
  },[handleLogout]);

  return (
    <header class="text-gray-900 body-font bg-[#6dbb48]">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div class="flex title-font font-medium items-center text-gray-00 mb-4 md:mb-0">
          <Link to="/">
            <div className="title flex items-center">
              <FaPaw size={35} />
              <span className="ml-3 text-xl">PawDopt</span>
            </div>
          </Link>
        </div>

        <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center font-semibold">
          {/* 1st Dropdown */}
          <div className="relative">
            <Link to="/" className="inline-flex items-center">
              <span className="hover:text-white">Home</span>
            </Link>
          </div>

          <div className="relative ml-8">
            <button
              onClick={(e) => toggleDropdown(e, "aboutDropdown")}
              className="inline-flex items-center hover:text-white hover:bg-[#6dbb48]"
            >
              <span>Information</span>
              <svg
                className="w-6 h-6 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.293 14.293a1 1 0 0 0 1.414 0L14 10.414V10a1 1 0 1 0-2 0v3.586l-3.293-3.293a1 1 0 0 0-1.414 1.414l4 4z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div
              id="aboutDropdown"
              className="hidden absolute z-50 mt-2 py-2 w-32 bg-white rounded-md shadow-lg"
            >
              <Link
                to="/about"
                className="block px-4 py-2 text-sm text-gray-700 hover:text-[#6dbb48] hover:bg-gray-100"
              >
                About Us
              </Link>
              <Link
                to="/how-to"
                className="block px-4 py-2 text-sm text-gray-700 hover:text-[#6dbb48] hover:bg-gray-100"
              >
                FAQs
              </Link>
              <Link
                to="/staff"
                className="block px-4 py-2 text-sm text-gray-700 hover:text-[#6dbb48] hover:bg-gray-100"
              >
                Staff
              </Link>
            </div>
          </div>

          {/* 2nd Dropdown */}
          <div className="relative ml-4">
            <button
              onClick={(e) => toggleDropdown(e, "adoptionDropdown")}
              className="inline-flex items-center hover:text-white hover:bg-[#6dbb48]"
            >
              <span>Gallery</span>
              <svg
                className="w-6 h-6 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.293 14.293a1 1 0 0 0 1.414 0L14 10.414V10a1 1 0 1 0-2 0v3.586l-3.293-3.293a1 1 0 0 0-1.414 1.414l4 4z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div
              id="adoptionDropdown"
              className="hidden absolute z-50 mt-2 py-2 w-32 bg-white rounded-md shadow-lg"
            >
              <Link
                to="/items-donated"
                className="block px-4 py-2 text-sm text-gray-700 hover:text-[#6dbb48] hover:bg-gray-100"
              >
                Items Donated
              </Link>
              <Link
                to="/successful-adopted"
                className="block px-4 py-2 text-sm text-gray-700 hover:text-[#6dbb48] hover:bg-gray-100"
              >
                Successfully Adopted
              </Link>
              <Link
                to="/available-to-adopt"
                className="block px-4 py-2 text-sm text-gray-700 hover:text-[#6dbb48] hover:bg-gray-100"
              >
                Adoption
              </Link>
            </div>
          </div>

          {/* Admin Dropdown */}
          <div className="relative ml-4">
          {userRole === "admin" && (
              <>
                <div className="relative ml-4">
                  <button
                    onClick={(e) => toggleDropdown(e, "adminDropdown")}
                    className="inline-flex items-center hover:text-white hover:bg-[#6dbb48]"
                  >
                    <span>Management</span>
                    <svg
                      className="w-6 h-6 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.293 14.293a1 1 0 0 0 1.414 0L14 10.414V10a1 1 0 1 0-2 0v3.586l-3.293-3.293a1 1 0 0 0-1.414 1.414l4 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div
                    id="adminDropdown"
                    className="hidden absolute z-50 mt-2 py-2 w-32 bg-white rounded-md shadow-lg"
                  >
                    <Link
                      to="/adoption-request"
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-[#6dbb48] hover:bg-gray-100"
                    >
                      Adoption Request
                    </Link>
                    <Link
                      to="/adoption-archives"
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-[#6dbb48] hover:bg-gray-100"
                    >
                      Adoption Archives
                    </Link>
                    <Link
                      to="/users"
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-[#6dbb48] hover:bg-gray-100"
                    >
                      Users
                    </Link>
                    {/* <Link
                      to="/approval"
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-[#6dbb48] hover:bg-gray-100"
                    >
                      Pending Images
                    </Link> */}
                    <Link
                      to="/upload"
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-[#6dbb48] hover:bg-gray-100"
                    >
                     Successful Uploads
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>
        {!isLoggedIn ? (
          <span className="relative transition-transform duration-300 transform hover:-translate-y-1">
            <Link
              to="/signup"
              class="inline-flex items-center  text-[18px] py-2 px-4 font-semibold hover:shadow-lg bg-white hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            >
              Join Us
              <FaLocationArrow className="ml-2 " />
            </Link>
          </span>
        ) : (
          <div className="relative ml-4">
            <button
              onClick={(e) => toggleDropdown(e, "settingsDropdown")}
              className="inline-flex items-center hover:text-white hover:bg-[#6dbb48]"
            >
              <FaCog className="w-6 h-6" />{email}
            </button>
            <div
              id="settingsDropdown"
              className="hidden absolute z-50 mt-2 py-2 w-32 bg-white rounded-md shadow-lg"
            >
              {userRole === 'user' && (
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:text-[#6dbb48] hover:bg-gray-100 w-full text-left"
                onClick={handleClickUserstatus}
              >
                User Profile
              </button>
              )}
              {userRole === 'user' && (
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:text-[#6dbb48] hover:bg-gray-100 w-full text-left"
                onClick={handleClickAdoptionStatus}
              >
                Adoption Status
              </button>
               )}
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-700 hover:text-[#6dbb48] hover:bg-gray-100 w-full text-left"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;