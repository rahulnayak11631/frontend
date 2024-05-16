import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { apiConfig } from "../Constants/ApiConfig";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

function UserEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [eventDetails, setEventDetails] = useState([]);
  const [coverImages, setCoverImages] = useState({});
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get(`${apiConfig.baseURL}/getenrollmentsbytoken`, {
          headers: {
            token: Cookies.get("token")
          }
        });

        setEnrollments(response.data);
        fetchEventDetails(response.data);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      }
    };

    const fetchEventDetails = async (enrollmentsData) => {
      try {
        const eventDetailsPromises = enrollmentsData.map(async (enrollment) => {
          const response = await axios.get(`${apiConfig.baseURL}/getevent`, {
            headers: {
              eventId: enrollment.eventId
            }
          });
          return response.data;
        });

        const details = await Promise.all(eventDetailsPromises);
        setEventDetails(details);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEnrollments();
  }, []);

  useEffect(() => {
    const fetchCoverImages = async () => {
      try {
        const coverImagePromises = eventDetails.map(async (eventDetail) => {
          const response = await axios.get(`${apiConfig.baseURL}/eventcoverimage`, {
            headers: {
              eventId: eventDetail.eventId
            }
          });
          return { eventId: eventDetail.eventId, imageURL: response.data[0].imageURL }; // Assuming imageURL is the key in each object
        });

        const images = await Promise.all(coverImagePromises);
        const imageMap = {};
        images.forEach(image => {
          imageMap[image.eventId] = image.imageURL;
        });
        setCoverImages(imageMap);
      } catch (error) {
        console.error("Error fetching cover images:", error);
      }
    };

    if (eventDetails.length > 0) {
      fetchCoverImages();
    }
  }, [eventDetails]);

  const handleClick = (eventId) => {
    navigate(`/cancelenroll/${eventId}`); // Navigate to cancelenroll page with eventId
  };

  return (
    <div className="grid grid-cols-3 mt-4 gap-3 ml-13">
        {eventDetails.map((eventDetail, index) => (
            <div key={index} onClick={() => handleClick(eventDetail.eventId)} className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer">
                <img className="w-full" src={coverImages[eventDetail.eventId] || "default-image.jpg"} alt="Event" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{eventDetail.title}</div>
                    <p className="text-gray-700 text-base">{eventDetail.description}</p>
                </div>
                <div className="px-6 py-4">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{eventDetail.location}</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{eventDetail.startTime}</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{eventDetail.endTime}</span>
                </div>
            </div>
        ))}
    </div>
);

}

export default UserEnrollments;
