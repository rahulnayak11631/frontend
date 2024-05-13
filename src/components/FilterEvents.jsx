import React, { useState } from "react";
import axios from "axios";
import { apiConfig } from "../Constants/ApiConfig";

function FilterEvents() {
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  const handleFilter = async () => {
    try {
      const response = await axios.get(`${apiConfig.baseURL}/filterevents`, {
        params: {
          location: location,
          mode: mode
        }
      });
      
      setFilteredEvents(response.data); // Update filtered events state
    } catch (error) {
      console.error("Error filtering events:", error);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Filter Events</h2>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Location"
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-3 rounded-lg text-sm focus:outline-none"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mode"
          className="ml-2 border-2 border-gray-300 bg-white h-10 px-5 pr-3 rounded-lg text-sm focus:outline-none"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-purple-600"
          onClick={handleFilter}
        >
          Filter
        </button>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Display filtered events */}
        {filteredEvents.map((event) => (
          <div key={event.eventId} className="bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            {/* Render event details here */}
            <h3 className="text-xl font-bold">{event.title}</h3>
            <p>{event.description}</p>
            {/* Add more event details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterEvents;
