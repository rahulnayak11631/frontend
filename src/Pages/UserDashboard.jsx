import React from "react";
import UserNavBar from "../components/UserNavBar.jsx";
import FilterEvents from "../components/FilterEvents.jsx";
import UserEnrollments from "../components/UserEnrollments.jsx";
import GetEventsClickable from "../components/GetEventsClickable.jsx";
import CalendarComponent from "../components/CalendarComponent.jsx";
import FooterComponent from "../components/FooterComponent.jsx";

function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <UserNavBar />
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6 pl-4">
          <h1 className="text-2xl font-bold pl-4">All Events</h1>
        </div>
        <div className="" style={{marginLeft:"90px"}}>
          {/* Sample event cards */}
          <GetEventsClickable />
        </div>
        {/* <div className="mt-8 pl-4">
          <FilterEvents />
        </div> */}
        <div className="mt-12 grid gap-6 pl-4">
          <h1 className="text-2xl font-bold pl-4">Enrolled Events</h1>
          {/* Add enrolled events component here */}
          <div className="" style={{marginLeft:"90px"}}>
          {/* Sample event cards */}
          <UserEnrollments />
        </div>
        
        </div>
      </div>
      <FooterComponent/>
    </div>
  );
}

export default UserDashboard;
