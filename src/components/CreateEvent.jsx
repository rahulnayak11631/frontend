import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import UploadCoverImage from "./UploadCoverImage";

function CreateEvent({ Open }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    mode: "Offline",
    startTime: "",
    endTime: "",
    maxCapacity: 0,
    price: 0,
    paymentRequired: false,
  });

  const [coverImageState, setcoverImageState] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "startTime" && formData.endTime < value) {
      setFormData({
        ...formData,
        endTime: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:8090/api/addevent",
        [formData],
        {
          headers: {
            "Content-Type": "Application/json",
            role: Cookies.get("role"),
            token: Cookies.get("token"),
          },
        }
      );

      //   const dataResponse = response.data;
      if (!response.data.success) {
        console.log(response.data.message)
        toast.error(response.data.message);

        // throw new Error("Failed to update event details");
      } else {
        toast.success("Event Added ");
        setcoverImageState(true);
      }

      console.log(response.data); // Assuming the response contains data
      // Add any further logic you need after the API call here
    } catch (error) {
      console.error("Error adding event:", error);
      // Handle the error as needed
    }
  };
  return (
    <>
      <div
        id="CreateEvent"
        className={`${
          Open ? "fixed inset-0 overflow-y-auto" : "hidden"
        } z-50 bg-opacity-50 bg-gray-900`}
      >
        <div className="flex justify-center items-center h-screen ">
       
          <form
            className="p-4 md:p-5 rounded-lg shadow-md "
            onSubmit={handleSubmit}
            style={{ maxWidth: "800px", margin: "0 auto", width: "100%" ,backgroundColor:"#d1d5db"}}
          >
        <button className="text-black " style={{marginLeft:"95%"}}  onClick={() =>
                (document.getElementById("CreateEvent").style.display = "none")
              }> <img
              src="src/assets/XCircle.svg"
              className="h-8 w-8  w-full "
              alt="close"
            /></button>
            <div className="grid gap-4 grid-cols-1 pt-5 md:grid-cols-2" style={{marginTop:"-3%"}}>
              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write event description here"
                  required
                ></textarea>
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-600  dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type event title"
                  required
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="location"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-600  dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Event location"
                  required
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="mode"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                >
                  Mode
                </label>
                <select
                  id="mode"
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-white-600  dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="Offline">Offline</option>
                  <option value="Online">Online</option>
                </select>
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="startTime"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                >
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  name="startTime"
                  id="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-600  dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="endTime"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                >
                  End Time
                </label>
                <input
                  type="datetime-local"
                  name="endTime"
                  id="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  min={formData.startTime}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-600  dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="maxCapacity"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                >
                  Max Capacity
                </label>
                <input
                  type="number"
                  name="maxCapacity"
                  id="maxCapacity"
                  value={formData.maxCapacity}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-600  dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Max capacity"
                  required
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="paymentRequired"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                >
                  Payment Required
                </label>
                <select
                  id="paymentRequired"
                  name="paymentRequired"
                  value={formData.paymentRequired}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Price"
                  required
                  disabled={formData.paymentRequired === false}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mt-4 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add new event
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* {coverImageState && <UploadCoverImage event=/>} */}
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}
export default CreateEvent;
