import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { apiConfig } from "../Constants/ApiConfig";

function UserProfile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = Cookies.get("token");
        const role = Cookies.get("role");

        const response = await axios.get(`${apiConfig.baseURL}/getuserdetailsbytoken`, {
          headers: {
            token: token,
            role: role
          }
        });

        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="max-w-md mx-auto bg-gray-100 shadow-md rounded-lg overflow-hidden my-8">
        <div className="p-4 bg-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">User Profile</h1>
          {userData && (
            <div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-600">Username:</label>
                <p className="text-sm text-gray-800">{userData.userName}</p>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-600">Email:</label>
                <p className="text-sm text-gray-800">{userData.email}</p>
              </div>
              {/* Add more user details as needed */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
