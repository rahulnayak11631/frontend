// Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


function Navbar({ onGetEventsClick, onGetEventProvidersClick }) {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/adminDashboard");
  };

  const handleSignout = () => {
    Cookies.remove("token");
    Cookies.remove("email");
    console.log("navigate to admin login page")
    navigate("/admin");
  };

  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div
          className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
          onClick={navigateToHome}
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="TechCommune Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Admin Dashboard
          </span>
        </div>
        <button
          onClick={onGetEventsClick}
          data-collapse-toggle="navbar-solid-bg"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-solid-bg"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
          <ul className="flex flex-col  font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <button
                onClick={onGetEventProvidersClick}
                className="flex items-center gap-3 px-1 normal-case text-white  font-semibold p-2 rounded-lg hover:bg-gray-300 hover:text-black cursor-pointer"
              >
                Get Event Providers
              </button>
            </li>
       
            <li>
              <button
                className="flex items-center gap-3 px-1 normal-case text-white font-semibold p-2 rounded-lg hover:bg-gray-300 hover:text-black cursor-pointer"
                onClick={handleSignout}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span>Sign Out</span>
              </button>{" "}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
