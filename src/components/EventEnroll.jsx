import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { apiConfig } from "../Constants/ApiConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EventEnroll() {
  const [event, setEvent] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // State to store the image URL
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

    const fetchEventImage = async () => {
      try {
        const response = await axios.get(
          `${apiConfig.baseURL}/eventcoverimage`,
          {
            headers: {
              eventId: eventId // Pass event ID as a header
            }
          }
        );
        setImageUrl(response.data[0].imageURL); // Assuming imageURL is the key for the image URL in the response
      } catch (error) {
        console.error("Error fetching event image:", error);
      }
    };

    fetchEvent();
    fetchEventImage();
  }, [eventId]); // Fetch event details and image when eventId changes

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
      <nav className="flex items-center justify-between flex-wrap bg-purple-800 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">Event Details</span>
        </div>
      </nav>
      <div className="container  mx-auto py-8">
        {event ? (
          <div className="max-w-md mx-auto bg-gray-300 rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                {imageUrl && <img className="h-48 w-full object-cover md:w-48" src={imageUrl} alt="Event Cover" />}
              </div>
              <div className="p-8">
                <div className="block mt-1 text-lg leading-tight font-medium text-indigo-500">{event.title}</div>
                <p className="mt-3 tracking-wide text-sm text-black font-semibold">{event.description}</p>
                <p className="mt-2 text-gray-500">Location: {event.location}</p>
                <p className="mt-2 text-gray-500">Mode: {event.mode}</p>
                <p className="mt-2 text-gray-500">Start Time: {event.startTime}</p>
                <p className="mt-2 text-gray-500">End Time: {event.endTime}</p>
                <p className="mt-2 text-gray-500">Max Capacity: {event.maxCapacity}</p>
                <p className="mt-2 text-gray-500">Price: ${event.price}</p>
                <p className="mt-2 text-gray-500">Payment Required: {event.paymentRequired ? 'Yes' : 'No'}</p>
                <p className="mt-2 text-gray-500">Rating: {event.rating}</p>
                <p className="mt-2 text-gray-500">Number of Ratings: {event.numberOfRatings}</p>
                <p className="mt-2 text-gray-500">Rating Sum: {event.ratingSum}</p>
                <button
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={enrollUser}
                >
                  Enroll
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </>
  );

}

export default EventEnroll;
