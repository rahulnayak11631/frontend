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

  const handleCalendar= () =>{
    navigate("/eventsCalendar")
  }

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
  const navigateToUserDashboard = () => {
    navigate("/userDashboard");
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-black p-4">
      <div
        className="flex items-center flex-shrink-0 text-white mr-6"
        onClick={navigateToUserDashboard}
        style={{ cursor: "pointer" }} // Inline style to change cursor to pointer on hover
      >
        <span
          id="UserDashboard"
          className="font-semibold text-xl tracking-tight"
        >
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
        <button className="text-white" onClick={handleCalendar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
            <path
              fillRule="evenodd"
              d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
              clipRule="evenodd"
            />
          </svg>
          
        </button>
        <button
          className="flex items-center gap-3 px-3 normal-case text-white font-semibold p-3 rounded-lg hover:bg-gray-300 hover:text-black cursor-pointer"
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
        </button>
        <img
          className="inline-block h-8 w-8 rounded-full ring-2 ring-white cursor-pointer"
          src="https://www.kindpng.com/picc/m/105-1055656_account-user-profile-avatar-avatar-user-profile-icon.png"
          alt="User Avatar"
          onClick={handleAvatarClick}
        />
      </div>
      {showUserProfile && <UserProfile />}{" "}
      {/* Render UserProfile if showUserProfile is true */}
    </nav>
  );
}

export default UserNavBar;
