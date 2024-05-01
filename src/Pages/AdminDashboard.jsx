// AdminDashboard.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import GetEvents from "../components/GetEvents.jsx";
import GetEventProviders from "../components/GetEventProviders.jsx";

function AdminDashboard() {
    const [showEvents, setShowEvents] = useState(false);
    const [showEventProviders, setShowEventProviders] = useState(false);

    return (
        <>
            <Navbar onGetEventsClick={() => setShowEvents(true)} onGetEventProvidersClick={() => setShowEventProviders(true)} />
            {showEvents && <GetEvents />}
            {showEventProviders && <GetEventProviders />}
        </>
    );
}

export default AdminDashboard;
