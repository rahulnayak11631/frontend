import  { useState, useEffect } from "react";
import axios from 'axios';
function GetEvents() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://localhost:8090/api/getallevent");
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="grid mt-4 gap-4 mx-2">
            {events.map(event => (
                <a key={event.eventId} href="#" className="flex items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img className="object-cover w-48 h-49 rounded-l-lg" src={"image-4.jpg"} alt="" />
                    <div className="flex flex-col p-4">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{event.title}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{event.description}</p>
                        <div className="mt-auto">
                            <p className="text-sm text-gray-500">Location: {event.location}</p>
                            <p className="text-sm text-gray-500">Start Time: {event.startTime}</p>
                            <p className="text-sm text-gray-500">End Time: {event.endTime}</p>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}

export default GetEvents;
