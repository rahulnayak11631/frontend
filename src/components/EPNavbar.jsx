import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { apiConfig } from "../Constants/ApiConfig";
import UpdateEventModal from "./UpdateEventModal";

const EPNavbar = ({setisOpenState}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSignout = () => {
    Cookies.remove("token");
    Cookies.remove("eventId");
    Cookies.remove("Id");
    Cookies.remove("email");
    navigate("/login");
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }
      try {
        const response = await axios.get(`${apiConfig.baseURL}/searchevents`, {
          params: { topic: searchQuery },
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching events:", error);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleResultClick = (result) => {

    setSelectedEvent(result);
    setisOpenState(true)
    document.getElementById("eventModal").style.display = "";
    Cookies.set("CloseIcon", true);
  };

  return (
    <nav
      className="px-1 py-1 flex justify-end items-center bg-gray-100"
      style={{ width: "75%", marginLeft: "300px", marginTop: "12px" }}
    >
      <div className="text-gray-500 font-normal mr-auto">
        Dashboard /<span className="font-semibold text-gray-700"> Home</span>
      </div>

      <form className="max-w-md mx-auto" style={{ width: "40%" }}>
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
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white-50 focus:ring-gray-500 focus:border-gray-400"
            placeholder="Search Events..."
            required
            value={searchQuery}
            onChange={handleChange}
          />
        
          {/* Display search results */}
          <div className={`absolute top-full left-0 right-0 bg-white rounded-b-lg shadow-lg mt-2 overflow-hidden ${searchResults.length === 0 ? "hidden" : "block"}`}>
            {searchResults.map((result) => (
              <div key={result.eventId} className="p-4 border-b border-gray-200 cursor-pointer" onClick={() => handleResultClick(result)}>
                <p className="font-bold">{result.title}</p>
                <p>{result.description}</p>
              </div>
            ))}
          </div>
        </div>
      </form>

      {selectedEvent && (
        <UpdateEventModal
          event={selectedEvent}
          isOpen={true}
          first={setSelectedEvent}
        />
      )}
    </nav>
  );
};

export default EPNavbar;
