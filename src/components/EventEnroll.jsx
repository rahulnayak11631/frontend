import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { apiConfig } from "../Constants/ApiConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserNavBar from "./UserNavBar";
import "../Styles/Loader.css";


function EventEnroll() {
  const [event, setEvent] = useState(null);
  const [organizationNames, setOrganizationNames] = useState("");
  const [loading, setLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${apiConfig.baseURL}/getevent`, {
          headers: {
            eventId: eventId,
          },
        });
        setEvent(await response.data);
        fetchEventOrganizations(await response.data);
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
              eventId: eventId,
            },
          }
        );
        setImageUrl(response.data[0].imageURL);
      } catch (error) {
        console.error("Error fetching event image:", error);
      }
    };
    const fetchEventOrganizations = async (event) => {
      try {
        console.log(event);
        handleOrganizerName(event);
        setOrganizationNames(event.eventId);
        console.log(organizationNames);
      } catch (error) {
        console.error("Error fetching event organizations:", error);
      }
    };

    fetchEvent();

    fetchEventImage();
  }, [eventId]);

  const [orgNameLatest, setorgNameLatest] = useState("");
  const handleOrganizerName = async (event) => {
    try {
      const response = await axios.get(
        `${apiConfig.baseURL}/getEPDetailsById`,
        {
          headers: {
            id: event.eventOrgId, // Assuming org_id is the correct identifier for organizer
          },
        }
      );

      const organizerName = response.data.orgName;
      console.log("organizer name ", organizerName);
      setorgNameLatest(organizerName);
      return organizerName;
    } catch (error) {
      console.error("Error fetching organizer details:", error);
      return null;
    }
  };

  

  const enrollUser = async () => {
    setLoading(true); // Set loading to true when enrolling user
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
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error enrolling user:", error);
      toast.error("Error enrolling user");
    } finally {
      setLoading(false); // Reset loading after enrolling attempt is finished
    }
  };
  
 

  return (
    <>
      <UserNavBar />
      <div className="container mx-auto py-8 w-full h-full">
        {loading && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="loader">
              <span className="loader-text">Loading...</span>
              <span className="load"></span>
            </div>
          </div>
        )}
          {event ? (
            <div className="flex flex-col items-center justify-between w-full h-full">
              <div
                className="flex  mb-8  py-5 rounded-lg p-2 justify-evenly"
                style={{ width: "100%" }}
              >
                <div
                  style={{
                    flex: "1 1 0",
                    marginRight: "1rem",
                    marginLeft: "2%",
                  }}
                >
                  {imageUrl && (
                    <img
                      style={{
                        width: "90%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                      }}
                      src={imageUrl}
                      alt="Event Cover"
                    />
                  )}
                </div>
                <div
                  style={{
                    width: "30%",
                    backgroundColor: "#fff",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    padding: "1.5rem",
                    border: "1px solid #ccc",
                    marginRight: "5%",
                  }}
                >
                  <h1 className="text-3xl text-black font-bold mb-8">
                    {event.title}
                  </h1>
                  <div className="flex flex-row">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p className={`text-l font-medium text-gray-600 ml-4`}>
                      {orgNameLatest && orgNameLatest}
                    </p>
                  </div>

                  <div className="flex items-center my-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                      style={{ marginRight: "5%" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                      />
                    </svg>

                    <p className="text-l font-medium text-gray-600">
                      {new Date(event.startTime).toLocaleDateString([], {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center my-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                      style={{ marginRight: "5%" }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p className="text-l font-medium text-gray-600">
                      {new Date(event.startTime).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(event.endTime).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                      style={{ marginRight: "5%" }}
                    >
                      <path
                        fillRule="evenodd"
                        d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p className="text-l font-medium text-gray-600">
                      {event.location}
                    </p>
                  </div>
                  <div className="flex items-center mb-4 mt-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                      style={{ marginRight: "5%" }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9 7.5A.75.75 0 0 0 9 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 0 0 9 12h3.622a2.251 2.251 0 0 1-2.122 1.5H9a.75.75 0 0 0-.53 1.28l3 3a.75.75 0 1 0 1.06-1.06L10.8 14.988A3.752 3.752 0 0 0 14.175 12H15a.75.75 0 0 0 0-1.5h-.825A3.733 3.733 0 0 0 13.5 9H15a.75.75 0 0 0 0-1.5H9Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p className="text-l font-medium text-gray-600">
                      Price: Rs {event.price}
                    </p>
                  </div>
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
              <div className="w-full bg-white shadow-lg rounded-lg p-8 border border-gray-300">
                <h2 className="text-2xl font-bold mb-4">Event Description</h2>
                <p className="text-lg text-gray-800 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <ToastContainer position="top-right" autoClose={5000} />
        </div>
      ) 
    </>
  );
}

export default EventEnroll;
