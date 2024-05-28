import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { apiConfig } from "../Constants/ApiConfig";
import "../Styles/Loader.css";


function GetUnApprovedEventProviders() {
  const [eventProviders, setEventProviders] = useState([]);
  const [approveStatus, setApproveStatus] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchEventProviders = async () => {
      try {
        const response = await axios.get(
          `${apiConfig.baseURL}/getunapprovedeventproviders`
        );
        // console.log("Fetched Event Providers:", response.data); // Debug log
        setEventProviders(response.data);
      } catch (error) {
        console.error("Error fetching Event Providers:", error);
      }
    };

    fetchEventProviders();
    setApproveStatus(false);
  }, [approveStatus]);

  const navigate = useNavigate();
  const handleViewEPDocuments = async (organizerId) => {
    try {
      Cookies.set("orgId", organizerId);
      const headers = {
        adminToken: Cookies.get("token"),
        organizerId: organizerId,
      };
      const response = await axios.get(
        `${apiConfig.baseURL}/getimagesforep`,
        { headers }
      );
      const imageUrls = response.data;
      // console.log("Image URLs:", imageUrls); // Debug log

      if (imageUrls.length === 0) {
        toast.error("Event Provider has not uploaded any documents!");
      } else {
        navigate("/eventproviderdocuments", { state: { imageUrls } });
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleApprove = async (organizerId) => {
    setLoading(true); // Set loading to true when enrolling user

    try {
      Cookies.set("orgId", organizerId);

      const headers = {
        adminToken: Cookies.get("token"),
        organizerId: Cookies.get("orgId"),
      };

      const response = await axios.post(
        `${apiConfig.adminURL}/approveEventProvider`,
        {},
        { headers }
      );
      const dataResponse = response.data;
      // console.log("Approve Response:", dataResponse); // Debug log
      if (dataResponse.success) {
        toast.success(dataResponse.message);
        setApproveStatus(true);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    finally {
      setLoading(false); // Reset loading after enrolling attempt is finished
    }
  };

  const handleDeny = async (organizerId) => {
    setLoading(true); // Set loading to true when enrolling user

    try {
      Cookies.set("orgId", organizerId);

      const headers = {
        adminToken: Cookies.get("token"),
        organizerId: Cookies.get("orgId"),
      };

      const response = await axios.post(
        `${apiConfig.adminURL}/denyEventProvider`,
        {},
        { headers }
      );
      const dataResponse = response.data;
      // console.log("Deny Response:", dataResponse); // Debug log
      if (dataResponse.success) {
        toast.success(dataResponse.message);
        setApproveStatus(true);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    finally {
      setLoading(false); // Reset loading after enrolling attempt is finished
    }
  };

  const pendingProviders = eventProviders.filter(
    (provider) => provider.verificationApproval === "Pending"
  );

  // console.log("Pending Providers:", pendingProviders); // Debug log

  return (
    <>
      <div className="my-3 mx-3">
      {loading && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="loader">
              <span className="loader-text">Loading...</span>
              <span className="load"></span>
            </div>
          </div>
        )}
        <h1 className="text-2xl font-semibold mb-4">Pending Requests</h1>
        {pendingProviders.length === 0 ? (
          <p className="text-gray-500">There are no pending requests.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pendingProviders.map((provider) => (
              <div
                key={provider.id}
                className="w-full p-4 bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 rounded-lg shadow-md dark:from-gray-700 dark:to-gray-800 dark:border-gray-600"
              >
                <h5 className="mb-2 text-2xl font-semibold text-center text-gray-800 dark:text-white">
                  {provider.userName}
                </h5>
                <div className="text-base text-center my-3 text-gray-600 dark:text-gray-400">
                  <p>
                    <span className="text-white font-bold">Email:</span>{" "}
                    {provider.email}
                  </p>
                  <p>
                    <span className="text-white font-bold">Organization:</span>{" "}
                    {provider.orgName}
                  </p>
                  <p>
                    <span className="text-white font-bold">Phone:</span>{" "}
                    {provider.phoneNumber}
                  </p>
                  <p>
                    <span className="text-white font-bold">
                      Verification Approval:
                    </span>{" "}
                    {provider.verificationApproval}
                  </p>
                </div>
                <div className="flex flex-col space-y-4">
                  <button
                    className="w-full bg-green-600 hover:bg-green-600 focus:ring-2 focus:ring-green-300 text-white rounded-lg py-2.5 px-4 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
                    onClick={() => handleViewEPDocuments(provider.id)}
                  >
                    View Documents
                  </button>
                  <div className="flex justify-center space-x-4">
                    <button
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 text-white rounded-lg py-2.5 px-4 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
                      onClick={() => handleApprove(provider.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="w-full sm:w-auto bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-300 text-white rounded-lg py-2.5 px-4 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-800"
                      onClick={() => handleDeny(provider.id)}
                    >
                      Deny
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default GetUnApprovedEventProviders;
