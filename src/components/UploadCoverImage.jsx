import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiConfig } from "../Constants/ApiConfig";

const UploadCoverImage = ({ event, isOpen, first }) => {
    console.log(event);
  
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
     coverImage: null,
    });

    const handleImageChange = (e) => {
        setFormData({
          ...formData,
          coverImage: e.target.files[0],
        });
      };

    const uploadCoverImage= async () => {
        const fileInput = document.getElementById('coverImage');
        const file = fileInput.files[0];
        if (!file) {
            alert('Please select a file.');
            return;
        }
    
        const formDataToSend = new FormData();
        formDataToSend.append("images", file);
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
            toast.error("Something went wrong");
          } else {
            toast.success("Cover Image updated Successfully");
            setTimeout(() => {
              navigate("/eventProviderDashboard");
            }, 2000);
          }
        } catch (error) {
          console.error(error);
          toast.error("Failed to update cover image");
        }
    }
    
  return (
    <div id="UploadCoverImage">
      {/* <!-- Modal toggle --> */}
      {/* <button
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Toggle modal
      </button> */}

      {/* <!-- Main modal --> */}
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Upload Cover Image
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5">
              <form className="space-y-4" action="#">
                <div>
                  <label
                    htmlFor="coverImage"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Upload Cover Image
                  </label>
                  <input
                    type="file"
                    name="coverImage"
                    id="coverImage"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={uploadCoverImage}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
     <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default UploadCoverImage;