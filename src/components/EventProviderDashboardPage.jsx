import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import AttendanceProgressBar from "./AttendenceProgressBar";
function EventProviderDashboardPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the API endpoint
    async function fetchEvents() {
      try {
        const response = await fetch(
          `http://localhost:8090/api/getalleventbyorgid`,
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
  }, []);



  const [completedEvents, setCompletedEvents] = useState([]);

  useEffect(() => {
    async function fetchCompletedEvents(async) {
      try {
        const response = await fetch("http://localhost:8090/api/completed", {
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
  }, []);

  return (
    <>
    <nav className="fixed top-0 z-50 w-full bg-blue-900 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
  <div className="px-3 py-3 lg:px-5 lg:pl-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start rtl:justify-end">
        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-white rounded-lg sm:hidden hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>
        <a href="https://flowbite.com" className="flex ms-2 md:me-24">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" />
          <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">Flowbite</span>
        </a>
      </div>
      <div className="flex items-center">
        <div className="flex items-center ms-3">
          <div>
            <button type="button" className="flex text-sm bg-blue-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
              <span className="sr-only">Open user menu</span>
              <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"/>
            </button>
          </div>
          <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
            <div className="px-4 py-3" role="none">
              <p className="text-sm text-gray-900 dark:text-white" role="none">
                Neil Sims
              </p>
              <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                neil.sims@flowbite.com
              </p>
            </div>
            <ul className="py-1" role="none">
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
<aside
  id="logo-sidebar"
  className="fixed top-[4rem] left-2 z-40 w-64 pt-8 pl-4 pr-2 overflow-y-auto border-r border-gray-200 sm:translate-x-0"
  aria-label="Sidebar"
  style={{ backgroundColor: "#2b2b2b", color: "#fbfbfb", borderRadius: "10px", bottom: "10px" }}
>
  <div className="h-full pb-4">
    <ul className="space-y-2 font-medium">
      <li>
        <a
          href="#"
          className="flex items-center p-2 rounded-lg group"
          style={{ color: "#fbfbfb" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f1f1f1";
            e.currentTarget.style.color = "#1f2020";
            
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#fbfbfb";
          }}
          onClick={(e) => {
            e.preventDefault();
            const currentBackgroundColor = e.currentTarget.style.backgroundColor;
            if (currentBackgroundColor === "transparent" || currentBackgroundColor === "") {
              e.currentTarget.style.backgroundColor = "#ffffff";
              e.currentTarget.style.color = "#1f2020";
            } else {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#fbfbfb";
            }
          }}
        >
          <svg
            className="w-5 h-5 text-gray-400 transition duration-75 group-hover:text-gray-300 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 21"
          >
            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
          </svg>
          <span className="ms-3">Dashboard</span>
        </a>
      </li>
    </ul>
  </div>
</aside>



<div className="flex flex-col items-center bg-gray-100">
        <div className="p-4 sm:ml-64 mt-14 ">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-evenly gap-x-8 gap-y-12">
            {events.map((event, index) => (
              <a
                key={index}
                href="#"
                className="flex flex-col justify-evenly  bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-300"
                style={{ width: "300px", height: "350px" }}
              >
                <img
                  className="object-cover w-full h-48 rounded-t-lg"
                  src={`src/assets/image-4.jpg`}
                  alt=""
                />
                <div className="p-4 flex flex-col items-center justify-center flex-grow">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-black dark:text-black">
                    {event.title}
                  </h5>
                  <p className="mb-3 font-normal text-black dark:text-gray-400">
                    {event.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="p-4 sm:ml-64 mt-8 mb-4 border border-grey-900 rounded-lg bg-white" >
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
                  <td className="px-6 py-4 whitespace-nowrap font-bold">{event.event.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{event.maxCapacity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{250}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
  <AttendanceProgressBar attendeesCount={250} maxCapacity={event.maxCapacity} />
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default EventProviderDashboardPage;