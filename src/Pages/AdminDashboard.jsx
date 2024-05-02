import React, { useState } from "react";
import Navbar from "../components/Navbar";
import GetEvents from "../components/GetEvents.jsx";
import GetEventProviders from "../components/GetEventProviders.jsx";

function AdminDashboard() {
    const [showEvents, setShowEvents] = useState(false);
    const [showEventProviders, setShowEventProviders] = useState(false);

    const handleGetEventsClick = () => {
        setShowEvents(true);
        setShowEventProviders(false); // Hide event providers list
    };

    const handleGetEventProvidersClick = () => {
        setShowEventProviders(true);
        setShowEvents(false); // Hide events list
    };

    return (
        <>
            <Navbar onGetEventsClick={handleGetEventsClick} onGetEventProvidersClick={handleGetEventProvidersClick} />
            {showEvents && <GetEvents />}
            {showEventProviders && <GetEventProviders />}
        </>
    );
}

export default AdminDashboard;
