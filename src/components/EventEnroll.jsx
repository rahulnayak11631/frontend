import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { apiConfig } from "../Constants/ApiConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EventEnroll() {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams(); // Get the event ID from URL params

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `${apiConfig.baseURL}/getevent`,
          {
            headers: {
              eventId: eventId // Pass event ID as a header
            }
          }
        );
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [eventId]); // Fetch event details when eventId changes

  const enrollUser = async () => {
    try {
      const response = await axios.post(
        `${apiConfig.baseURL}/enroll`,
        {
          eventId: eventId,
          enrollmentDate: new Date().toISOString(),
          price: event.price,
          paymentRequired: event.paymentRequired
        },
        {
          headers: {
            token: Cookies.get("token")
          }
        }
      );
      console.log(response.data); // Handle successful enrollment
      // Redirect to some success page or show a success message
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error enrolling user:", error);
      // Handle error - show error message or redirect to error page
    }
  };

  return (
    <>
    <div className="container mx-auto py-8">
      {event ? (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          <p className="text-gray-700 mb-4">{event.description}</p>
          <p className="text-gray-700 mb-4">Location: {event.location}</p>
          <p className="text-gray-700 mb-4">Mode: {event.mode}</p>
          <p className="text-gray-700 mb-4">Start Time: {event.startTime}</p>
          <p className="text-gray-700 mb-4">End Time: {event.endTime}</p>
          <p className="text-gray-700 mb-4">Max Capacity: {event.maxCapacity}</p>
          <p className="text-gray-700 mb-4">Price: {event.price}</p>
          <p className="text-gray-700 mb-4">Payment Required: {event.paymentRequired ? 'Yes' : 'No'}</p>
          <p className="text-gray-700 mb-4">Rating: {event.rating}</p>
          <p className="text-gray-700 mb-4">Number of Ratings: {event.numberOfRatings}</p>
          <p className="text-gray-700 mb-4">Rating Sum: {event.ratingSum}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={enrollUser}
          >
            Enroll
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    <ToastContainer position="top-right" autoClose={5000} />

    </>
  );
}

export default EventEnroll;
