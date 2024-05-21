import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { apiConfig } from "../Constants/ApiConfig";
import { useNavigate } from "react-router-dom";

function UserNavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSignout = () => {
    Cookies.remove("token");
    Cookies.remove("eventId");
    Cookies.remove("Id");
    Cookies.remove("email");
    Cookies.remove("role");
    navigate("/login");
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`${apiConfig.baseURL}/searchevents`, {
          params: {
            topic: searchQuery // Assuming "topic" is the parameter expected by your backend
          }
        });

        setSearchResults(response.data); // Update search results state
      } catch (error) {
        console.error("Error searching events:", error);
        // Handle errors, e.g., display an error message to the user
      }
    };

    // Fetch search results when searchQuery changes
    if (searchQuery.trim() !== "") {
      fetchSearchResults();
    } else {
      // Reset search results if search query is empty
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAvatarClick = () => {
    navigate("/userprofile"); // Navigate to the user profile page
  };

  const handleResultClick = (eventId) => {
    navigate(`/eventenroll/${eventId}`); // Navigate to EventEnroll with eventId as param
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-purple-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">User Dashboard</span>
      </div>
      <div className="flex flex-grow items-center justify-center relative">
        <div className="text-gray-600 w-full max-w-lg"> {/* Center the search bar */}
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-8 rounded-lg text-sm focus:outline-none w-full"
            type="search"
            name="search"
            placeholder="Search Events by Title..."
            value={searchQuery}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute right-0 top-0 mt-3 mr-4"
          >
            <svg
              className="text-gray-600 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                className="heroicon-ui"
                d="M21.707 20.293l-5.3-5.3A7.95 7.95 0 0018 11c0-4.418-3.582-8-8-8s-8 3.582-8 8 3.582 8 8 8c1.739 0 3.348-.558 4.657-1.5l5.3 5.3c.191.192.45.297.707.297s.516-.105.707-.293c.391-.39.391-1.024 0-1.414zM4 11c0-3.309 2.691-6 6-6s6 2.691 6 6-2.691 6-6 6-6-2.691-6-6z"
              />
            </svg>
          </button>
          {/* Display search results */}
          <div className={`absolute top-full left-0 right-0 bg-white rounded-b-lg shadow-lg mt-2 overflow-hidden ${searchResults.length === 0 ? "hidden" : "block"}`}>
            {searchResults.map((result) => (
              <div key={result.eventId} className="p-4 border-b border-gray-200 cursor-pointer" onClick={() => handleResultClick(result.eventId)}>
                <p className="font-bold">{result.title}</p>
                <p>{result.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="flex items-center gap-3 px-3 normal-case text-gray-500 font-semibold p-3 rounded-lg hover:bg-gray-300 cursor-pointer"
          onClick={handleSignout}
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-gray"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
          <span>Sign Out</span>
        </button>
        <img
          className="inline-block h-8 w-8 rounded-full ring-2 ring-white cursor-pointer"
          src="https://www.kindpng.com/picc/m/105-1055656_account-user-profile-avatar-avatar-user-profile-icon.png"
          alt="User Avatar"
          onClick={handleAvatarClick}
        />
      </div>
    </nav>
  );
}

export default UserNavBar;
