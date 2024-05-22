import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { apiConfig } from "../Constants/ApiConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserNavBar from "./UserNavBar";

function EventEnroll() {
  const [event, setEvent] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // State to store the image URL
  const { eventId } = useParams(); // Get the event ID from URL params

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${apiConfig.baseURL}/getevent`, {
          headers: {
            eventId: eventId, // Pass event ID as a header
          },
        });
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
              eventId: eventId, // Pass event ID as a header
            },
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
          paymentRequired: event.paymentRequired,
        },
        {
          headers: {
            token: Cookies.get("token"),
          },
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
      <UserNavBar />
      <div className="container mx-auto py-8 w-full border border-red">
        {event ? (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden m-5">
            <div className="flex flex-wrap">
              {/* Left Column - Event Cover Image */}
              <div className="w-full md:w-2/3">
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  {imageUrl && (
                    <img
                      className="w-full h-auto object-cover rounded-t-lg"
                      src={imageUrl}
                      alt="Event Cover"
                    />
                  )}
                </div>
              </div>
              {/* Right Column - Event Details */}
              <div className="w-full md:w-1/3 p-8">
                <div className="shadow-lg rounded-lg bg-white">
                  <div className="p-4">
                    {/* Event Title */}
                    <div className="flex items-center mb-4">
                      <h2 className="text-3xl text-black font-bold">{event.title}</h2>
                    </div>
                    {/* Location */}
                    <div className="flex items-center mb-4">
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
                    {/* Time */}
                    <div className="flex items-center mb-4">
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
                        {new Date(event.startTime).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} -{" "}
                        {new Date(event.endTime).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                      </p>
                    </div>
                    {/* Price */}
                    <div className="flex items-center mb-4">
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
                      <p className="text-sm text-gray-600">Price: ${event.price}</p>
                    </div>
                    {/* Enroll Button */}
                    <div className="flex justify-center mt-8">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={enrollUser}
                      >
                        Enroll
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Event Description Section */}
            <div className="p-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold mb-4">Event Description</h2>
              <p className="text-lg text-gray-800 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        {/* Toast Container */}
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </>
  );
  
}

export default EventEnroll;
