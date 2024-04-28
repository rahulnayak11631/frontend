import { useEffect } from "react";
import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { base_url } from "../Backend APi/BaseApi";
// import base

function Signup() {
  const [fetchedRole, setFetchedRole] = useState(null);


  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    company: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
 
  
  const handleSubmit = async (event) => {
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

    const headers={
      "role":Cookies.get("role")
    }

    if (Cookies.get("role")==="user") {
      
      const response= await axios.post(`http://localhost:8090/api/adduser`,{
        userName:data.firstName+" "+data.lastName,
        email:data.email,
        password:data.password
  
      },{headers})
      const dataResponse=await response.data
      if (dataResponse.success) {
        Cookies.set("token",dataResponse.token)
      }
      console.log(dataResponse)
    }

    if(Cookies.get("role")==="eventprovider")
    {
      const response= await axios.post(`http://localhost:8090/api/adduser`,{
        userName:data.firstName+" "+data.lastName,
        email:data.email,
        password:data.password,
        phoneNumber: data.phone,
        orgName: data.company
  
      },{headers})
      const dataResponse=await response.data
      if (dataResponse.success) {
        Cookies.set("token",dataResponse.token)
      }
      console.log(dataResponse)
    }

  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleRepeatPassword = () => {
    setShowRepeatPassword((prevShowRepeatPassword) => !prevShowRepeatPassword);
  };

  return (
    <div>
      <h1 className="max-w-xl mt-20 mb-0 rounded-t-lg mx-auto bg-blue-300 p-3 text-2xl my-10 font-semibold text-center text-dark-blue mb-6" style={{ marginBottom: "-1px" }}>Signup</h1>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-8 rounded-b-lg text-sm text-white bg-gray-800 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:border-blue-600 shadow-lg">
        {/* Form fields */}
        <div className="grid md:grid-cols-1 md:gap-6 mb-2">
          <div className="relative z-0 w-full mb-5 group">
            <input type="email" name="email" value={formData.email} onChange={handleChange} id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Email address" required />
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Password" required />
            <button type="button" onClick={handleTogglePassword} className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 focus:outline-none dark:text-white">
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type={showRepeatPassword ? "text" : "password"}
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              id="floating_repeat_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Confirm password"
              required
            />
            <button
              type="button"
              onClick={handleToggleRepeatPassword}
              className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 focus:outline-none dark:text-white"
            >
              {showRepeatPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="First name" required />
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Last name" required />
              </div>
          {  Cookies.get("role") === "eventprovider" && (
            <>
              
              <div className="relative z-0 w-full mb-5 group">
                <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="phone" value={formData.phone} onChange={handleChange} id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Phone number" required />
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="company" value={formData.company} onChange={handleChange} id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Company (Ex. Google)" required />
              </div>
            </>
          )}
        </div>
        {/* Submit button */}
        <div className="flex justify-center mt-6"> {/* Centering the submit button */}
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
