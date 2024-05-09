import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GetUnApprovedEventProviders() {
    const [eventProviders, setEventProviders] = useState([]);

    useEffect(() => {
        const fetchEventProviders = async () => {
            try {
                const response = await axios.get("http://localhost:8090/api/getunapprovedeventproviders");
                setEventProviders(response.data);
            } catch (error) {
                console.error("Error fetching Event Providers:", error);
            }
        };

        fetchEventProviders();
    }, []);

    return (
        <div className="my-3 mx-3">
            <h1 className="text-2xl font-semibold mb-4">Pending Requests</h1>
            {eventProviders.length === 0 ? (
                <p className="text-gray-500">There are no pending requests.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {eventProviders.map(provider => (
                        <div key={provider.id} className="w-full p-4 bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 rounded-lg shadow-md dark:from-gray-700 dark:to-gray-800 dark:border-gray-600">
                            <h5 className="mb-2 text-2xl font-semibold text-center text-gray-800 dark:text-white">{provider.userName}</h5>
                            <div className="text-base text-center my-3 text-gray-600 dark:text-gray-400">
                                <p><span className="text-white font-bold">Email:</span> {provider.email}</p>
                                <p><span className="text-white font-bold">Organization:</span> {provider.orgName}</p>
                                <p><span className="text-white font-bold">Phone:</span> {provider.phoneNumber}</p>
                                <p><span className="text-white font-bold">Verification Approval:</span> {provider.verificationApproval ? "Approved" : "Pending"}</p>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <button className="w-full bg-green-600 hover:bg-green-600 focus:ring-2 focus:ring-green-300 text-white rounded-lg py-2.5 px-4 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800">
                                    View Documents
                                </button>
                                <div className="flex justify-center space-x-4">
                                    <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 text-white rounded-lg py-2.5 px-4 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800">
                                        Approve
                                    </button>
                                    <button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-300 text-white rounded-lg py-2.5 px-4 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-800">
                                        Deny
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default GetUnApprovedEventProviders;
