import React, { useState } from "react";
import Navbar from "../components/Navbar";
import GetEvents from "../components/GetEvents.jsx";
import GetUnApprovedEventProviders from "../components/GetUnApprovedEventProviders.jsx";
import GetEventProviders from "../components/GetEventProviders.jsx"
import FooterComponent from "../components/FooterComponent.jsx";

function AdminDashboard() {
    const [showEvents, setShowEvents] = useState(false);
    const [showAllEventProviders, setShowAllEventProviders] = useState(false);
    const [showPendingVerificationEventProviders, setShowPendingVerificationEventProviders] = useState(true);

    const handleGetEventsClick = () => {
        setShowEvents(true);
        setShowAllEventProviders(false); // Hide all event providers list
        setShowPendingVerificationEventProviders(false); // Hide pending verification event providers list
    };

    const handleGetEventProvidersClick = () => {
        setShowAllEventProviders(true);
        setShowEvents(false); // Hide events list
        setShowPendingVerificationEventProviders(false); // Hide pending verification event providers list

       

    };

    return (
        <>
            <Navbar
                onGetEventsClick={handleGetEventsClick}
                onGetEventProvidersClick={handleGetEventProvidersClick}
            />
            <div>
                {
                showPendingVerificationEventProviders && 
                <GetUnApprovedEventProviders />
                }
            </div>
            {showEvents && <GetEvents />}
            {showAllEventProviders && <GetEventProviders/>}
            <FooterComponent/>
        </>
    );
}

export default AdminDashboard;
