import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiConfig } from "../Constants/ApiConfig";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Cookies from 'js-cookie';

function UserNavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function
  
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
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto relative text-center">
        <div className="flex items-center justify-center mx-auto text-gray-600"> {/* Center the search bar */}
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-8 rounded-lg text-sm focus:outline-none w-full md:w-96"
            type="search"
            name="search"
            placeholder="Search Events by Title..."
            value={searchQuery}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center space-x-2">  {/* Order buttons here */}
          <button
            className="flex items-center gap-3 px-3 normal-case ml-4 text-gray-500 font-semibold p-3 rounded-lg hover:bg-gray-300  cursor-pointer"
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
            alt=""
            onClick={handleAvatarClick} // Call handleAvatarClick function on click
          />
        </div>
      </div>
    </nav>
  );
  
    
}

export default UserNavBar;
