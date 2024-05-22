import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { apiConfig } from "../Constants/ApiConfig";


function GetAttendeeList() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [attendees, setAttendees] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${apiConfig.baseURL}/getalleventbyorgid`, {
                    headers: {
                        "Content-Type": "application/json",
                        "organizerId" : Cookies.get('Id'),
                    }
                });
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, [Cookies.get('Id')]);

    const handleEventClick = async (eventId) => {
        try {
            const response = await axios.get(`${apiConfig.baseURL}/getAttendeeList`, {
                headers: {
                    "Content-Type": "application/json",
                    eventId: eventId,
                }
            });
            setAttendees(response.data);
            setOpenModal(true);
        } catch (error) {
            console.error("Error fetching attendees:", error);
        }
    };

    return (
        <>
            <h1 className="text-center text-gray-800 text-2xl mt-5 mb-2 ml-20 font-bold font-xl "style={{"width":"77%",position:"relative",marginLeft:"20%"}}>Events</h1>
            <div className="flex flex-wrap justify-center ml-5"style={{width:"75%",marginLeft:"20%"}}>
                {events.map((event) => (
                    <div key={event.eventId} className="m-4 cursor-pointer" onClick={() => handleEventClick(event.eventId)}>
                        <div className="bg-gray-200 p-4 rounded-lg shadow-md ">
                            <h2 className="text-lg font-semibold m-1">{event.title}</h2>
                            <p className="text-sm">{new Date(event.startTime).toLocaleDateString()}</p>
                            <p className="text-sm">{new Date(event.startTime).toLocaleTimeString()} - {new Date(event.endTime).toLocaleTimeString()}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Modal styles={{borderRadius:"10px"}} className="" open={openModal} onClose={() => setOpenModal(false)} center>
                <h2 className="text-center mb-3 font-medium text-gray">Attendee List</h2>
                {attendees.length === 0 ? (
                    <p className="text-center mt-3">No attendees for this event</p>
                ) : (
                    <table className="table-auto rounded-lg mt-2 " >
                        <thead className="bg-gray-300 text-center">
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendees.map((attendee) => (
                                <tr key={attendee.id}>
                                    <td className="border px-4 py-2">{attendee.userName}</td>
                                    <td className="border px-4 py-2">{attendee.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </Modal>
        </>
    );
}

export default GetAttendeeList;
