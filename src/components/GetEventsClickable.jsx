import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiConfig } from "../Constants/ApiConfig";

function GetEventsClickable() {
    const [events, setEvents] = useState([]);
    const [eventImages, setEventImages] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${apiConfig.baseURL}/getallevent`);
                const eventsData = response.data;
                setEvents(eventsData);
                fetchEventImages(eventsData);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        const fetchEventImages = async (events) => {
            try {
                const imagePromises = events.map(event =>
                    axios.get(`${apiConfig.baseURL}/eventcoverimage`, {
                        headers: {
                            eventId: event.eventId
                        }
                    })
                );

                const imagesResponses = await Promise.all(imagePromises);
                const images = imagesResponses.map(response => response.data);

                // Assuming each response data is an array of image objects
                const imageMap = {};
                images.forEach(imageArray => {
                    imageArray.forEach(image => {
                        imageMap[image.eventId] = image.imageURL;
                    });
                });

                setEventImages(imageMap);
            } catch (error) {
                console.error("Error fetching event images:", error);
            }
        };

        fetchEvents();
    }, []);

    const handleEventClick = (eventId) => {
        navigate(`/eventenroll/${eventId}`);
    };

    return (
        <div className="grid grid-cols-3 mt-4 gap-3 ml-13">
            {events.map(event => (
                <div key={event.eventId} onClick={() => handleEventClick(event.eventId)} className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer">
                    <img className="w-full" src={eventImages[event.eventId] || "default-image.jpg"} alt="Event" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{event.title}</div>
                        <p className="text-gray-700 text-base">{event.description}</p>
                    </div>
                    <div className="px-6 py-4">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{event.location}</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{event.startTime}</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{event.endTime}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default GetEventsClickable;
