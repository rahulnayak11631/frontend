import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [userRole, setUserRole] = useState(null);

  const navigate=useNavigate()

  const handleEventProviderSignup = () => {
    Cookies.set("role","eventprovider") // Set role
    navigate("/signup"); 
  };

  const handleUserSignup = () => {
    Cookies.set("role","user")// Set role on button click
    navigate("/signup");
  };

  return (
    <>
      <section className="bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply h-screen">
        <div className="px-4 mx-auto max-w-screen-xl flex flex-col justify-center items-center h-full text-center lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl" ><span style={{ pointerEvents: 'none'}}>Welcome to TechCommune</span></h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">TechCommune is a vibrant community where tech enthusiasts, entrepreneurs, and innovators come together to collaborate, learn, and grow. Join us in shaping the future through technology.</p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <button
              onClick={handleEventProviderSignup} // Set role before navigation
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Sign up as Event Provider
              <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </button>
            <button
              onClick={handleUserSignup} // Set role before navigation
              className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
            >
              Sign up as User
            </button> 
          </div>
          <p className="mt-4 text-gray-300 text-sm">
            Already registered? <Link to="/login" className="text-blue-500 hover:text-blue-700">Sign in</Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default HomePage;
