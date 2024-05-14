import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const UpdateEventModal = ({ event, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    location: event.location,
    mode: event.mode,
    startTime: event.startTime,
    endTime: event.endTime,
    maxCapacity: event.maxCapacity,
    price: event.price,
    paymentRequired: event.paymentRequired,
    coverImage: null,
  });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            coverImage: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("location", formData.location);
        formDataToSend.append("mode", formData.mode);
        formDataToSend.append("startTime", formData.startTime);
        formDataToSend.append("endTime", formData.endTime);
        formDataToSend.append("maxCapacity", formData.maxCapacity);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("paymentRequired", formData.paymentRequired);
        // formDataToSend.append("coverImage", formData.coverImage);

        try {
            // Update event details
            const updateResponse = await fetch(
                "http://localhost:8090/api/updateevent",
                {
                    method: "PUT",
                    body: formDataToSend,
                    headers: {
                      role: Cookies.get("role"),
                      token: Cookies.get("token"),
                      eventId: Cookies.get("eventId"),                    },
                }
            );
            if (!updateResponse.ok) {
                throw new Error("Failed to update event");
            }

            // Update cover image
            // const coverImageResponse = await fetch(
            //     "http://localhost:8090/api/addcoverimage",
            //     {
            //         method: "POST",
            //         body: formData.coverImage,
            //         headers: {
            //             organizerId: Cookies.get("Id"),
            //         },
            //     }
            // );
            if (!coverImageResponse.ok) {
                throw new Error("Failed to update cover image");
            }

            // Redirect to dashboard or update state as needed
            navigate("/eventProviderDashboard");
        } catch (error) {
            console.error(error);
        }
    };

    return (
      <div
      className={`${
        isOpen ? "fixed inset-0 overflow-y-auto" : "hidden"
      } z-50 bg-opacity-50 bg-gray-900`}
    >
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >close
          </button>
          <h2 className="text-xl font-semibold text-gray-900">Update Event</h2>
                <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-2 gap-4">
    <div className="col-span-1">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />

        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"></textarea>

        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location:</label>
        <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />

        <label htmlFor="mode" className="block text-sm font-medium text-gray-700">Mode:</label>
        <select id="mode" name="mode" value={formData.mode} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
            <option value="online">Online</option>
            <option value="offline">Offline</option>
        </select>
    </div>
    <div className="col-span-1">
        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time:</label>
        <input type="datetime-local" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />

        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time:</label>
        <input type="datetime-local" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />

        <label htmlFor="maxCapacity" className="block text-sm font-medium text-gray-700">Max Capacity:</label>
        <input type="number" id="maxCapacity" name="maxCapacity" value={formData.maxCapacity} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />

        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
        <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />

        <label htmlFor="paymentRequired" className="block text-sm font-medium text-gray-700">Payment Required:</label>
        <select id="paymentRequired" name="paymentRequired" value={formData.paymentRequired} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
            <option value="true">Yes</option>
            <option value="false">No</option>
        </select>

        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">Cover Image:</label>
        <input type="file" id="coverImage" name="coverImage" onChange={handleImageChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
    </div>
    <button type="submit" className="col-span-2 w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Update</button>
</form>


            </div>
        </div>
        </div>
    );
};

export default UpdateEventModal;
