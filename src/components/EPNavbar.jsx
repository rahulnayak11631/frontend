import React from "react";
import { Link } from "react-router-dom";

const EPNavbar = () => {
  return (
    <nav
      className="px-1 py-1 flex justify-end items-center bg-gray-100 "
      style={{ width: "75%", marginLeft: "300px", marginTop: "12px" }}
    >
      <Link to="/" className="text-gray-500 font-normal mr-auto">
        Dashboard /<span className="font-semibold text-gray-700"> Home</span>
      </Link>

      <form className="max-w-md mx-auto" style={{width:"40%"}}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white-50 focus:ring-gray-500 focus:border-gray-400 dark:bg-white-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-gray-400 dark:focus:border-gray-400"
            placeholder="Search Events..."
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      <button className="flex items-center gap-3 px-3 normal-case ml-4 text-gray-500 font-semibold p-3 rounded-lg hover:bg-gray-300  cursor-pointer">

      <svg className="w-6 h-6 text-gray-800 dark:text-gray" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
</svg>
        <span >Sign Out</span>
      </button>
    </nav>
  );
};

export default EPNavbar;
