import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { apiConfig } from "../Constants/ApiConfig";
import { useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile"; // Import the UserProfile component

function UserNavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showUserProfile, setShowUserProfile] = useState(false); // State to toggle user profile display
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
            topic: searchQuery,
          },
        });

        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching events:", error);
      }
    };

    if (searchQuery.trim() !== "") {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAvatarClick = () => {
    setShowUserProfile(!showUserProfile); // Toggle user profile display
  };

  const handleResultClick = (eventId) => {
    navigate(`/eventenroll/${eventId}`);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-black p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          User Dashboard
        </span>
      </div>
      <div className="flex flex-grow items-center justify-center relative">
        <div className="text-gray-600 w-full max-w-lg">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-8 rounded-lg text-sm focus:outline-none w-full"
            type="search"
            name="search"
            placeholder="Search Events by Title..."
            value={searchQuery}
            onChange={handleChange}
          />
          <div
            className={`absolute top-full bg-white rounded-b-lg shadow-lg mt-2 overflow-hidden z-50 ${
              searchResults.length === 0 ? "hidden" : "block"
            }`}
            style={{
              width: "50%",
              minHeight: "100px",
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {searchResults.map((result) => (
              <div
                key={result.eventId}
                className="p-4 border-b border-gray-200 cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => handleResultClick(result.eventId)}
              >
                <p className="font-bold">{result.title}</p>
                <p>{result.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="flex items-center gap-3 px-3 normal-case text-white font-semibold p-3 rounded-lg hover:bg-gray-300 hover:text-black cursor-pointer"
          onClick={handleSignout}
        >
          <svg
            className="w-6 h-6 text-white dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
            style={{ transition: "color 0.3s ease" }}
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
      {showUserProfile && <UserProfile />} {/* Render UserProfile if showUserProfile is true */}
    </nav>
  );
}

export default UserNavBar;
