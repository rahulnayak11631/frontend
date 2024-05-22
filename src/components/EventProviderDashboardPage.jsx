import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import AttendanceProgressBar from "./AttendenceProgressBar";
import StatisticsCards from "./StatisticsCards";
import EPNavbar from "./EPNavbar";
import UpcomingEvents from "./UpcomingEvents";
import UpdateEventModal from "./UpdateEventModal";
import { useLocation } from "react-router-dom";
import "../Styles/Sidebar.css";
import CreateEvent from "./CreateEvent";
import axios from "axios";
import GetAttendeeList from "./GetAttendeeList";
import { apiConfig } from "../Constants/ApiConfig";
import QRScanner from "./QRScanner";

function EventProviderDashboardPage() {
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [first, setfirst] = useState(false);
  const [clickAdd, setClickAdd] = useState(false);
  const [eventImages, setEventImages] = useState({});
  const [attendeeList, setattendeeList] = useState(false);
  const [showQRCode, setshowQRCode] = useState(false);
  const [isOpenState, setisOpenState] = useState(false);
  useEffect(() => {
    // Fetch events from the API endpoint
    async function fetchEvents() {
      try {
        const response = await fetch(
          `${apiConfig.baseURL}/getalleventbyorgid`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              organizerId: Cookies.get("Id"),
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const eventData = await response.json();
        setEvents(eventData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchEvents();
  }, [first]);

  const handleEventCardClick = (event) => {
    setSelectedEvent(event);
    // document.getElementById("eventModal").style.display = "";
    setisOpenState(true);
    Cookies.set("CloseIcon", true);
    console.log(event);
    Cookies.set("eventId", event.eventId);
  };

  const [completedEvents, setCompletedEvents] = useState([]);

  useEffect(() => {
    async function fetchCompletedEvents() {
      try {
        const response = await fetch(`${apiConfig.baseURL}/completed`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Pass organizerId in the header
            organizerId: Cookies.get("Id"),
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch completed events");
        }
        const eventData = await response.json();
        setCompletedEvents(eventData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCompletedEvents();
    setfirst(false);
  }, [first]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (index) => {
    setSelectedItem(index === 0 ? null : index);
    // setSelectedItem(index);
  };
  const handleScanQR = () => {
    setshowQRCode(true);
  };

  const handleAddEvent = () => {
    // document.getElementById("CreateEvent").style.display = "";
    Cookies.set("CloseIcon", true);
    setClickAdd(true);
  };

  const handleAttendeeList = () => {
    setattendeeList(true);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${apiConfig.baseURL}/getalleventbyorgid`,
          {
            headers: {
              "Content-Type": "application/json",
              organizerId: Cookies.get("Id"),
            },
          }
        );
        const eventsData = response.data;
        setEvents(eventsData);
        fetchEventImages(eventsData);
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

        // Assuming each response data is an array of image objects
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

    fetchEvents();
  }, [eventImages]);

  return (
    <>
      <div className="flex flex-row bg-gray-100">
        <aside
          id="logo-sidebar"
          className="fixed top-[1rem] left-2 z-40 w-64 pt-8 pl-4 pr-2 overflow-y-auto border-r border-gray-200 sm:translate-x-0"
          aria-label="Sidebar"
          style={{
            backgroundColor: "#2b2b2b",
            color: "#fbfbfb",
            borderRadius: "10px",
            bottom: "10px",
            position:"fixed"
          }}
        >
          <div className="h-full pb-4">
            <ul className="space-y-2 font-medium">
              <span to className="py-6 px-8 text-center text-white font-bold">
                <h6>Event Provider Dashboard</h6>
              </span>
              {[
                "Dashboard",
                "Add Event",
                "Get Attendee List",
                "Scan-QR Code",
              ].map((item, index) => (
                <li key={index} className="list-item rounded-lg">
                  <a
                    href="#"
                    className={`flex items-center p-2 rounded-lg group   ${
                      selectedItem === index
                        ? "bg-white text-black"
                        : "text-white"
                    }`}
                    style={{ color: "#fbfbfb" }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (index === 1) {
                        handleAddEvent();
                        setattendeeList(false);
                        setshowQRCode(false);
                        document.getElementById("CreateEvent").style.display =
                          "";
                      } else if (index === 2) {
                        handleAttendeeList();
                        setshowQRCode(false);
                      } else if (index === 3) {
                        handleScanQR();
                        setattendeeList(false);
                      } else {
                        handleClick(index);
                        setattendeeList(false);
                        setshowQRCode(false);
                      }
                      e.currentTarget.style.backgroundColor = "#ffffff";
                      e.currentTarget.style.color = "#1f2020";
                    }}
                  >
                    <svg
                      className="w-5 h-5 text-gray-400 transition duration-75 group-hover:text-gray-400 dark:group-hover:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 21"
                    >
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                    </svg>
                    <span className="ms-3">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <EPNavbar setisOpenState={setisOpenState} />
      </div>
      {!attendeeList && !showQRCode && (
        <div className="flex flex-col items-center bg-gray-100">
          <div className="p-4 sm:ml-64 mt-5">
            <StatisticsCards />
            {selectedEvent && (
              <UpdateEventModal
                event={selectedEvent}
                isOpen={isOpenState}
                first={setfirst}
                isOpenState={setisOpenState} // Pass the function here
              />
            )}

            {clickAdd && <CreateEvent Open={true} />}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-evenly justify-center text-center gap-x-8 gap-y-12 mt-5 ">
              {events.map((event, index) => (
                <a
                  key={index}
                  onClick={() => handleEventCardClick(event)}
                  // href="#"
                  className="flex flex-col justify-evenly bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-300"
                  style={{ width: "300px", height: "400px" }}
                >
                  <img
                    className="object-cover w-full h-48 rounded-t-lg"
                    src={
                      eventImages[event.eventId] ||
                      "src/assets/default-cover-image.jpg"
                    }
                    alt=""
                  />
                  <div className="p-4 flex flex-col items-center justify-center flex-grow">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-black dark:text-black">
                      {event.title}
                    </h5>

                    <p className="mb-1 font-normal text-black dark:text-gray-800">
                      <span className="font-semibold text-black">Date:</span>{" "}
                      {new Date(event.startTime).toLocaleDateString()}
                    </p>
                    <p className="mb-3 font-normal text-black dark:text-gray-800">
                      <span className="font-semibold text-black">
                        Timings:{" "}
                      </span>{" "}
                      {new Date(event.startTime).toLocaleTimeString()}-
                      {new Date(event.endTime).toLocaleTimeString()}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-row gap-8">
            <div className="p-4 sm:ml-64 mt-8 mb-5 border border-grey-900 rounded-lg bg-white">
              <h2 className="text-2xl mb-4 font-bold ">Completed Events</h2>
              <table className="min-w-full divide-y  rounded-lg ">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Event Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Max Capacity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Attendees Count
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Attendance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {completedEvents.map((event, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap font-bold">
                        {event.event.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {event.maxCapacity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{250}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <AttendanceProgressBar
                          attendeesCount={250}
                          maxCapacity={event.maxCapacity}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <UpcomingEvents />
          </div>
        </div>
      )}
      {!showQRCode && attendeeList && <GetAttendeeList />}
      {showQRCode && <QRScanner />}
    </>
  );
}

export default EventProviderDashboardPage;
