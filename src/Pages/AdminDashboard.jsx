// AdminDashboard.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import GetEvents from "../components/GetEvents.jsx";

function AdminDashboard() {
    const [showEvents, setShowEvents] = useState(false);

    return (
        <>
            <Navbar onGetEventsClick={() => setShowEvents(true)} />
            {showEvents && <GetEvents />}
        </>
    );
}

export default AdminDashboard;
