import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiConfig } from "../Constants/ApiConfig";

function GetEventsClickable() {
  const [events, setEvents] = useState([]);
  const [eventImages, setEventImages] = useState({});
  const [organizationNames, setOrganizationNames] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${apiConfig.baseURL}/getallevent`);
        const eventsData = response.data;
        setEvents(eventsData);
        fetchEventImages(eventsData);
        fetchEventOrganizations(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const fetchEventImages = async (events) => {
      try {
        const imagePromises = events.map((event) =>
          axios.get(`${apiConfig.baseURL}/eventcoverimage`, {
            headers: {
              eventId: event.eventId,
            },
          })
        );

        const imagesResponses = await Promise.all(imagePromises);
        const images = imagesResponses.map((response) => response.data);

        const imageMap = {};
        images.forEach((imageArray) => {
          imageArray.forEach((image) => {
            imageMap[image.eventId] = image.imageURL;
          });
        });

        setEventImages(imageMap);
      } catch (error) {
        console.error("Error fetching event images:", error);
      }
    };

    const fetchEventOrganizations = async (events) => {
      try {
        const organizationPromises = events.map((event) =>
          handleOrganizerName(event) // Pass each event to fetch organizer name
        );

        const organizationNamesArray = await Promise.all(organizationPromises);
        
        const organizationMap = {};
        events.forEach((event, index) => {
          organizationMap[event.eventId] = organizationNamesArray[index];
        });

        setOrganizationNames(organizationMap);
      } catch (error) {
        console.error("Error fetching event organizations:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (eventId) => {
    navigate(`/eventenroll/${eventId}`);
  };

  const handleOrganizerName = async (event) => {
    try {
      const response = await axios.get(`${apiConfig.baseURL}/getEPDetailsById`, {
        headers: {
          id: event.eventOrgId, // Assuming org_id is the correct identifier for organizer
        },
      });

      const organizerName = response.data.orgName;
      return organizerName;
    } catch (error) {
      console.error("Error fetching organizer details:", error);
      return null;
    }
  };

  // Function to generate a background color class based on organization name
  const getOrganizationColorClass = (orgName) => {
    // Ensure orgName is a string and not undefined or null
    if (typeof orgName !== 'string') {
      return "bg-gray-200"; // Default background color if orgName is not valid
    }
  
    // Generate a hash code from the organization name
    const hashCode = orgName.split('').reduce((hash, char) => {
      hash = ((hash << 5) - hash) + char.charCodeAt(0);
      return hash & hash; // Convert to 32-bit integer
    }, 0);
  
    // Generate a class name based on the hash code
    const colorClasses = [
      "bg-blue-200",
      "bg-green-200",
      "bg-yellow-200",
      "bg-pink-200",
      "bg-purple-200",
      "bg-indigo-200",
      "bg-red-200",
      "bg-gray-200",
    ];
    const index = Math.abs(hashCode % colorClasses.length);
    return colorClasses[index];
  };
  

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.eventId}
            onClick={() => handleEventClick(event.eventId)}
            className="rounded-lg bg-white overflow-hidden shadow-lg cursor-pointer transform transition-transform hover:scale-105"
          >
            <img
              className="w-full h-64 object-cover rounded-t-lg"
              src={eventImages[event.eventId] || "/default-image.jpg"}
              alt="Event"
            />
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  {event.title}
                </h3>
                <p className={`text-sm text-gray-600 ${getOrganizationColorClass(organizationNames[event.eventId])} rounded-lg px-2 py-1`}>
                  {organizationNames[event.eventId]}
                </p>
              </div>
              <div className="flex items-center mb-2">
                <svg
                  className="w-4 h-4 fill-current text-gray-600 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2.5c-3.512 0-6.39 2.871-6.39 6.413 0 2.066.996 3.458 2.31 4.838 1.073 1.128 2.423 2.537 3.547 4.158.356.475.726.963 1.064 1.471.34-.508.71-.996 1.066-1.471 1.123-1.621 2.474-3.03 3.547-4.158 1.314-1.38 2.31-2.772 2.31-4.838 0-3.542-2.878-6.413-6.39-6.413zM10 17.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-gray-600">{event.location}</p>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 fill-current text-gray-600 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm7-9a9 9 0 100 18 9 9 0 000-18zm.293 12.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 1.414L9 12.586l2.293-2.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-gray-600">
                  {new Date(event.startTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} -{' '}
                  {new Date(event.endTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetEventsClickable;
