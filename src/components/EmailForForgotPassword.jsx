import React from "react";
import { apiConfig } from "../Constants/ApiConfig";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "../Styles/Loader.css";

function EmailForForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    setLoading(true); // Set loading to true when form is submitted

    console.log(Cookies.get("role"));
    event.preventDefault();
    // Prepare data to be submitted
    const data = {
      ...formData,
      role: Cookies.get("role"), // Include the selected role in the data
    };
    // Example: Send data to backend or handle as needed
    console.log("Form data:", data);
    console.log(Cookies.get("role"));

    const headers = {
      role: Cookies.get("role"),
      email: data.email,
    };
    try {
      const response = await axios.post(
        `${apiConfig.baseURL}/forgotpassword`,
        {},
        { headers }
      );
      const dataResponse = await response.data;
      if (dataResponse.success) {
        Cookies.set("token", dataResponse.token);
        Cookies.set("ResetPassword", "true");
        Cookies.set("email", formData.email);

        toast.success(dataResponse.message);
        setLoading(false)
        navigate("/otp");
      } else {
        toast.error(dataResponse.message);
      }
      console.log(dataResponse);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center">
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="loader">
              <span className="loader-text">loading...</span>
              <span className="load"></span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <h1
          className="max-w-xl mt-20 mb-0 rounded-t-lg mx-auto bg-blue-300 p-3 text-2xl my-10 font-semibold text-center text-dark-blue mb-6"
          style={{ marginBottom: "-1px" }}
        >
          Reset Password
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto p-8 rounded-b-lg text-sm text-white bg-gray-800 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:border-blue-600 shadow-lg"
        >
          {/* Form fields */}
          <div className="grid md:grid-cols-1 md:gap-6 mb-2">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Email address"
                required
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-center mt-6">
            {" "}
            {/* Centering the submit button */}
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default EmailForForgotPassword;
