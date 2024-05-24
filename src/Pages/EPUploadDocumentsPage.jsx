import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { apiConfig } from '../Constants/ApiConfig';

function EPUploadDocumentsPage() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map((file) => URL.createObjectURL(file));

        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
        setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
    };

    const handleRemoveImage = (index) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);

        setSelectedFiles(newFiles);
        setImagePreviews(newPreviews);
    };

    const handleUpload = async () => {
        const token = Cookies.get('token');
        const role = Cookies.get('role'); // Assuming role is also stored in cookies

        if (!selectedFiles.length) {
            toast.error('Please select files to upload');
            return;
        }

        const formData = new FormData();
        for (let file of selectedFiles) {
            formData.append('images', file);
        }

        try {
            const response = await axios.post(`${apiConfig.baseURL}/uploadimages`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token,
                    'role': role
                }
            });

            if (response.data.success) {
                toast.success('Documents uploaded successfully!');
                setTimeout(() => {
                    navigate('/login');
                }, 2000); // Wait for 2 seconds before navigating to login
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Failed to upload documents');
        }
    };

    return (
        <>
            <h1 className="text-2xl font-semibold m-3 text-center">Upload Documents For Verification</h1>
            <div className="flex items-center justify-center w-full">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    style={{ margin: '0.5rem' ,width:"75%",height:"35%"}} // Added margin to the dropzone container
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                    </div>
                    <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        multiple
                        onChange={handleFileChange}
                    />
                </label>
            </div>
            {selectedFiles.length > 0 && (
                <div className="mt-4 mx-2">
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        {selectedFiles.length} file(s) selected
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {imagePreviews.map((src, index) => (
                            <div key={index} className="relative">
                                <img src={src} alt={`Preview ${index}`} className="w-full h-auto rounded-lg" />
                                <button
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
                                    style={{ width: '34px', height: '34px' }}
                                >
                                    &times;
                                </button>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {selectedFiles[index].name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="flex justify-center mt-4">
                <button
                    onClick={handleUpload}
                    className="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 text-white rounded-lg py-2.5 px-4 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
                >
                    Upload Documents
                </button>
            </div>
            <ToastContainer position="top-right" autoClose={5000} />
        </>
    );
}

export default EPUploadDocumentsPage;
