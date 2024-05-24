import React from "react";
import Navbar from "../components/Navbar";
import GetEvents from "../components/GetEvents.jsx";
import GetUnApprovedEventProviders from "../components/GetUnApprovedEventProviders.jsx";
import GetEventProviders from "../components/GetEventProviders.jsx";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleGetEventProvidersClick = () => {
    navigate("/adminDashboard/getEventProviders");
  };

  return (
    <>
      <Navbar
        onGetEventProvidersClick={handleGetEventProvidersClick}
      />
      <GetUnApprovedEventProviders/>
      <h1 className="text-2xl font-bold pl-4 mt-8">Events</h1>
      <GetEvents/>
    </>
  );
}

export default AdminDashboard;
