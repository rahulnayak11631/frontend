// GetEvents.jsx
import React, { useState, useEffect } from "react";
import axios from 'axios';

function GetEvents() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://localhost:8090/api/getallevents");
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <>
            <h1>List of Events</h1>
            <ul>
                {events.map(event => (
                    <li key={event.eventId}>
                        <p>Title: {event.title}</p>
                        <p>Description: {event.description}</p>
                        <p>Location: {event.location}</p>
                        <p>Mode: {event.mode}</p>
                        <p>Start Time: {event.startTime}</p>
                        <p>End Time: {event.endTime}</p>
                        <p>Max Capacity: {event.maxCapacity}</p>
                        <p>Price: {event.price}</p>
                        <p>Payment Required: {event.paymentRequired ? 'Yes' : 'No'}</p>
                        <p>Rating: {event.rating}</p>
                        <p>Number of Ratings: {event.numberOfRatings}</p>
                        <p>Rating Sum: {event.ratingSum}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default GetEvents;
