import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { apiConfig } from "../Constants/ApiConfig";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function UserEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [eventDetails, setEventDetails] = useState([]);
  const [coverImages, setCoverImages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get(`${apiConfig.baseURL}/getenrollmentsbytoken`, {
          headers: {
            token: Cookies.get("token")
          }
        });

        setEnrollments(response.data);
        fetchEventDetails(response.data);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      }
    };

    const fetchEventDetails = async (enrollmentsData) => {
      try {
        const eventDetailsPromises = enrollmentsData.map(async (enrollment) => {
          const response = await axios.get(`${apiConfig.baseURL}/getevent`, {
            headers: {
              eventId: enrollment.eventId
            }
          });
          return response.data;
        });

        const details = await Promise.all(eventDetailsPromises);
        setEventDetails(details);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEnrollments();
  }, []);

  useEffect(() => {
    const fetchCoverImages = async () => {
      try {
        const coverImagePromises = eventDetails.map(async (eventDetail) => {
          const response = await axios.get(`${apiConfig.baseURL}/eventcoverimage`, {
            headers: {
              eventId: eventDetail.eventId
            }
          });
          return { eventId: eventDetail.eventId, imageURL: response.data[0].imageURL }; // Assuming imageURL is the key in each object
        });

        const images = await Promise.all(coverImagePromises);
        const imageMap = {};
        images.forEach(image => {
          imageMap[image.eventId] = image.imageURL;
        });
        setCoverImages(imageMap);
      } catch (error) {
        console.error("Error fetching cover images:", error);
      }
    };

    if (eventDetails.length > 0) {
      fetchCoverImages();
    }
  }, [eventDetails]);

  const handleClick = (eventId, status) => {
    if (status === "Completed") {
      navigate(`/rateandreview/${eventId}`);
    } else {
      navigate(`/cancelenroll/${eventId}`);
    }
  };

  const getStatus = (startTime, endTime) => {
    const now = moment();
    const start = moment(startTime);
    const end = moment(endTime);
    if (end.isBefore(now)) {
      return "Completed";
    }
    return `${start.diff(now, 'days')} days left`;
  };

  return (
    <div className="overflow-x-auto">
         {eventDetails.length === 0 ? (
        <p className="text-center mt-4 p-4 text-l font-medium border border-pink-400 bg-pink-200  text-gray-700 rounded-lg">You have not enrolled to any event.</p>
      ) : (
      <table className="min-w-full bg-white border border-black-900 rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 border-b border-gray-200">Cover Image</th>
            <th className="py-3 px-4 border-b border-gray-200">Event Title</th>
            <th className="py-3 px-4 border-b border-gray-200">Location</th>
            <th className="py-3 px-4 border-b border-gray-200">Date</th>
            <th className="py-3 px-4 border-b border-gray-200">Status</th>
          </tr>
        </thead>
        <tbody>
          {eventDetails.map((eventDetail, index) => {
            const status = getStatus(eventDetail.startTime, eventDetail.endTime);
            return (
              <tr key={index} onClick={() => handleClick(eventDetail.eventId, status)} className="cursor-pointer hover:bg-gray-50">
                <td className="py-3 px-4 border-b border-gray-200">
                  <img className="w-32 h-20 object-cover rounded" src={coverImages[eventDetail.eventId] || "/default-image.jpg"} alt="Event" />
                </td>
                <td className="py-3 px-4 border-b border-gray-200 ">{eventDetail.title}</td>
                <td className="py-3 px-4 border-b border-gray-200">{eventDetail.location}</td>
                <td className="py-3 px-4 border-b border-gray-200">{moment(eventDetail.startTime).format('MMMM Do YYYY, h:mm a')}</td>
                <td className="py-3 px-4 border-b border-gray-200">{status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>)}
    </div>
  );
}

export default UserEnrollments;
