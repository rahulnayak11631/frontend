import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "../Styles/Loader.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiConfig } from "../Constants/ApiConfig";

function AdminLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Add loading state

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    Cookies.set("role", "admin");
    const data = {
      ...formData,
      role: Cookies.get("role"),
    };
    // console.log("Form data:", data);
    // console.log(Cookies.get("role"));

    const headers = {
      "Content-Type": "application/json",
      role: Cookies.get("role"),
    };

    if (Cookies.get("role") === "admin") {
      try {
        const response = await axios.post(
          `${apiConfig.baseURL}/login`,
          {
            email: data.email,
            password: data.password,
          },
          { headers }
        );

        const dataResponse = await response.data;
        if (dataResponse.success) {
          Cookies.set("token", dataResponse.token);
          Cookies.set("email", data.email);
          Cookies.set("password", data.password);
          toast.success(dataResponse.message);
          setTimeout(() => {
            navigate("/otp");
          }, 2000);
        } else {
          toast.error(dataResponse.message);

        }
        // console.log(dataResponse);
      } catch (error) {
        // console.error(error);
        toast.error(error.message);
      } finally {
        setLoading(false); // Set loading to false after response
        Cookies.remove("password")

      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center">
        {loading && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="loader">
              <span className="loader-text">loading...</span>
              <span className="load"></span>
            </div>
          </div>
        )}
        <div
          className={`p-4 mx-auto max-w-screen-lg flex-grow ${
            loading ? "hidden" : "block"
          }`}
        >
          <div className="flex flex-col justify-center items-center mt-5" >
            <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-2xl lg:text-5xl dark:text-white">
              Admin Login - TechCommune
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-500  dark:text-gray-400 mt-5">
              Join our vibrant community of tech enthusiasts, entrepreneurs, and
              innovators. Let's shape the future through technology together.
            </p>
          </div>
          <div className="mt-5 bg-white rounded-lg shadow-xl dark:bg-gray-800 mx-auto"style={{width:"60%"}}>
            <div className="p-8 ">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex justify-center">
                Sign in to TechCommune
              </h2>
              <form className="mt-8 space-y-6" action="#">
                <div className="flex justify-center">
                  {/* <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                     Email
                  </label> */}
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-l font-normal rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your Email"
                    required
                    onChange={handleChange}
                    style={{width:"70%"}}
                  />
                </div>
                <div className="relative z-0 w-full mb-5 group flex justify-center">
                {/* <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                     Password
                  </label> */}
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    id="floating_password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-l rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Password"
                    required
                    style={{width:"70%"}}

                  />
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="absolute inset-y-0 right-0 flex items-center px-2 text-sm text-gray-500 focus:outline-none dark:text-white"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {/* {showPassword ? "Hide" : "Show"} */}
                  </button>
                </div>
                <div className="flex items-start">
                
                  
                  <a
                    href="#"
                    className="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                    onClick={() => {navigate("/emailforgotpassword"),Cookies.set("role","admin")}}

                  >
                    Forgot Password?
                  </a>
                </div>

               <div className="flex justify-center">
               <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                >
                  Login to your account
                </button>
               </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  Not registered yet?{" "}
                  <Link
                    to="/adminSignUp"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Create account
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default AdminLogin;
