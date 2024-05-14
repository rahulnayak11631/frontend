import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { apiConfig } from "../Constants/ApiConfig";

function UserEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [eventDetails, setEventDetails] = useState([]);

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
    

    fetchEnrollments();
  }, []);

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

  return (
    <div>
    {eventDetails.map((eventDetail, index) => (
      <div key={index} className="flex items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img className="object-cover w-48 h-49 rounded-l-lg" src={"image-4.jpg"} alt="" />
        <div className="flex flex-col p-4">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{eventDetail.title}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 dark:text-white">{eventDetail.description}</p>
          <div className="mt-auto">
            <p className="text-sm text-gray-500">Location: {eventDetail.location}</p>
            {/* Assuming startTime and endTime are in the eventDetail object */}
            <p className="text-sm text-gray-500">Start Time: {eventDetail.startTime}</p>
            <p className="text-sm text-gray-500">End Time: {eventDetail.endTime}</p>
            {/* Add more event details as needed */}
          </div>
        </div>
      </div>
    ))}
  </div>
);
}

export default UserEnrollments;
