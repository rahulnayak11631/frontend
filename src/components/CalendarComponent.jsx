import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { format } from 'date-fns';
import { apiConfig } from "../Constants/ApiConfig";

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    // Fetch enrollments when the component mounts
    const fetchEnrollments = async () => {
      try {
        // Get token from cookies
        const enrollmentsResponse = await axios.get(`${apiConfig.baseURL}/getenrollmentsbytoken`, {
          headers: { token: Cookies.get("token") }
        });
        const enrollments = await enrollmentsResponse.data;

        // Fetch event details for each enrollment
        const eventDetailsPromises = enrollments.map(enrollment =>
          axios.get(`${apiConfig.baseURL}/getevent`, {
            headers: { eventId: enrollment.eventId }
          })
        );

        const eventDetailsResponses = await Promise.all(eventDetailsPromises);
        const eventDetails = eventDetailsResponses.map(response => response.data);
        setEventsData(eventDetails);
      } catch (error) {
        toast.error('Failed to fetch events');
        console.error('Error fetching events:', error);
      }
    };

    fetchEnrollments();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = format(date, 'yyyy-MM-dd');
    const eventsForDate = eventsData.filter(event => event.startTime.split('T')[0] === formattedDate);
    setEvents(eventsForDate);
  };

  // Function to generate tile content for calendar
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const eventsForDate = eventsData.filter(event => event.startTime.split('T')[0] === formattedDate);
      return eventsForDate.length > 0 ? <div className="bg-blue-500 rounded-full h-1 w-1 mx-auto"></div> : null;
    }
  };

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto bg-gray-600 mt-4 shadow-md rounded-lg overflow-hidden my-8 p-6">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="mx-auto mb-6"
            tileClassName="text-center"
            tileContent={tileContent} // This adds custom content to calendar tiles
          />
          <div className="p-4 bg-gray-100 rounded-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Events on {selectedDate.toDateString()}</h1>
            {events.length > 0 ? (
              events.map((event, index) => (
                <div key={index} className="mb-4 p-4 bg-white shadow-md rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                  <h2 className="text-xl font-bold text-indigo-500">{event.title}</h2>
                  <p className="text-gray-700 mt-2">{event.description}</p>
                  <p className="text-gray-600 mt-1">Start Time: {new Date(event.startTime).toLocaleTimeString()}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-700">No events for this date.</p>
            )}
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </>
  );
};

export default CalendarComponent;
