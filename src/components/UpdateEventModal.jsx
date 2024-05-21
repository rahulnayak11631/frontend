import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { apiConfig } from "../Constants/ApiConfig";


const UpdateEventModal = ({ event, isOpen, first ,isOpenState }) => {
  // console.log(event);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: event.title || "",
    description: event.description || "",
    location: event.location || "",
    mode: event.mode || "",
    startTime: event.startTime || "",
    endTime: event.endTime || "",
    maxCapacity: event.maxCapacity || "",
    price: event.price || "",
    paymentRequired: event.paymentRequired || "",
    coverImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "startTime") {
      document.getElementById("endTime").min = value;
    }
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      coverImage: e.target.files[0],
    });
  };
  const handleUpdateDetails = async () => {
    const formDataToSend = new FormData();

    // Append only the modified fields to the formDataToSend
    if (event.title !== formData.title) {
      formDataToSend.append("title", formData.title);
    }
    if (event.description !== formData.description) {
      formDataToSend.append("description", formData.description);
    }
    if (event.location !== formData.location) {
      formDataToSend.append("location", formData.location);
    }
    if (event.mode !== formData.mode) {
      formDataToSend.append("mode", formData.mode);
    }
    if (event.startTime !== formData.startTime) {
      formDataToSend.append("startTime", formData.startTime);
    }
    if (event.endTime !== formData.endTime) {
      formDataToSend.append("endTime", formData.endTime);
    }
    if (event.maxCapacity !== formData.maxCapacity) {
      formDataToSend.append("maxCapacity", formData.maxCapacity);
    }
    if (event.price !== formData.price) {
      formDataToSend.append("price", formData.price);
    }
    if (event.paymentRequired !== formData.paymentRequired) {
      formDataToSend.append("paymentRequired", formData.paymentRequired);
    }

    try {
      const updateResponse = await fetch(
        `${apiConfig.baseURL}/updateevent`,
        {
          method: "PUT",
          body: JSON.stringify(formData), // Convert object to JSON
          headers: {
            "Content-Type": "application/json", // Set content type to JSON

            role: Cookies.get("role"),
            token: Cookies.get("token"),
            eventId: Cookies.get("eventId"),
          },
        }
      );
      if (!updateResponse.ok) {
        toast.error("Something went wrong");
        // throw new Error("Failed to update event details");
      } else {
        first(true);
        toast.success(updateResponse.json().message);
        document.getElementById("eventModal").style.display = "none";
        setTimeout(() => {
          navigate("/eventProviderDashboard");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateCoverImage = async () => {
    if (!formData.coverImage) {
          toast.error("Please select a cover image");
          return;
        }
    const formDataToSend = new FormData();
    formDataToSend.append("images", formData.coverImage);
    try {
      const coverImageResponse = await fetch(
        `${apiConfig.baseURL}/addcoverimage`,
        {
          method: "POST",
          body: formDataToSend,
          headers: {
            EPToken: Cookies.get("token"),
            event_id: Cookies.get("eventId"),
          },
        }
      );
      const responseData = await coverImageResponse.json(); // Parse response as JSON
      if (!coverImageResponse.ok) {
        throw new Error(responseData.message); // Throw an error with the server message
      } else {
        first(true);
        toast.success("Cover Image updated Successfully");
        document.getElementById("eventModal").style.display = "none";
        setTimeout(() => {
          navigate("/eventProviderDashboard");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update cover image");
    }
  };

  useEffect(() => {
    setFormData({
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
    if (event.coverImage) {
      const imageUrl = URL.createObjectURL(event.coverImage);
      setCoverImageUrl(imageUrl); // Assuming you have a state variable to store the cover image URL
    }
  }, [event]);



  useEffect(() => {
    setFormData({
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
    if (event.coverImage) {
      const imageUrl = URL.createObjectURL(event.coverImage);
      setCoverImageUrl(imageUrl); // Assuming you have a state variable to store the cover image URL
    }
  }, [event]);
  useEffect(() => {
    if (isOpen) {
      // Open modal logic
      document.getElementById("eventModal").style.display = "block";
    } else {
      // Close modal logic
      document.getElementById("eventModal").style.display = "none";
    }
  }, [isOpen]);
  

  const handle = () => {
    isOpenState(false); // Close the modal
  };

  return (
    <>
      <div
        id="eventModal"
        className={`${
          isOpen ? "fixed inset-0 overflow-y-auto" : "hidden"
        } z-50 bg-opacity-50 bg-gray-900`}
      >
        <div className="flex justify-center items-center h-screen">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md ">
            <button
              onClick={handle}
              className=" text-gray-500  hover:text-gray-700 focus:outline-none  w-full flex justify-right"
              style={{ marginLeft: "48%",marginTop:"-3%"}}
            >
              <img
                src="src/assets/XCircle.svg"
                className="h-8 w-8  w-full "
                alt="close"
              />

              {/* close */}
            </button>
            <h2 className="text-xl font-semibold text-gray-900">
              Update Event
            </h2>
            <form
              className="mt-4 grid grid-cols-2 gap-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="col-span-1">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />

                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />

                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location:
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />

                <label
                  htmlFor="mode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mode:
                </label>
                <select
                  id="mode"
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="startTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Time:
                </label>
                <input
                  type="datetime-local"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />

                <label
                  htmlFor="endTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Time:
                </label>
                <input
                  type="datetime-local"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  min={formData.startTime} // Set the minimum value for the input
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />

                <label
                  htmlFor="maxCapacity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Max Capacity:
                </label>
                <input
                  type="number"
                  id="maxCapacity"
                  name="maxCapacity"
                  value={formData.maxCapacity}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />

                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price:
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />

                <label
                  htmlFor="paymentRequired"
                  className="block text-sm font-medium text-gray-700"
                >
                  Payment Required:
                </label>
                <select
                  id="paymentRequired"
                  name="paymentRequired"
                  value={formData.paymentRequired}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>

                <label
                  htmlFor="coverImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cover Image:
                </label>
                <input
                  type="file"
                  id="coverImage"
                  name="coverImage"
                  onChange={handleImageChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <button
                type="button"
                onClick={handleUpdateDetails}
                className="col-span-1 w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Update Details
              </button>
              <button
                type="button"
                onClick={handleUpdateCoverImage}
                className="col-span-1 w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Update Cover Image
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />{" "}
    </>
  );
};

export default UpdateEventModal;
