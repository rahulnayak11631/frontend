import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import { apiConfig } from "../Constants/ApiConfig";
import UserNavBar from "./UserNavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RatingAndReview() {
    const [userDetails, setUserDetails] = useState(null);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [reviews, setReviews] = useState([]);
    const [likedReviews, setLikedReviews] = useState([]);
    const { eventId } = useParams();  // Assume event ID is passed as a route parameter

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = Cookies.get('token');
                const role = Cookies.get('role');

                const response = await axios.get(`${apiConfig.baseURL}/getuserdetailsbytoken`, {
                    headers: {
                        token: token,
                        role: role
                    }
                });

                setUserDetails(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${apiConfig.baseURL}/getreview`, {
                    headers: {
                        eventId: eventId
                    }
                });

                setReviews(response.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchUserDetails();
        fetchReviews();
    }, [rating]);

    const handleRatingClick = (ratingValue) => {
        setRating(ratingValue);
    };

    const handleReviewSubmit = async () => {
        if (!userDetails) {
            toast.error("User details not available");
            return;
        }

        if (!reviewText.trim()) {
            toast.error("Please add your review text");
            return;
        }

        try {
            const token = Cookies.get('token');
            const reviewDetails = {
                userId: userDetails.id,
                userName: userDetails.userName,
                eventId: eventId,
                review: reviewText,
                rating: rating
            };

            const response = await axios.post(`${apiConfig.baseURL}/addreview`, reviewDetails, {
                headers: {
                    token: token
                }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setReviewText('');
                setRating(0);
                // Refresh the reviews after submitting
                setReviews([...reviews, reviewDetails]); // Add the new review to the list
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Error submitting review");
        }
    };

    return (
        <>
            <UserNavBar />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center">
                    <h2 className="text-3xl font-bold mb-6">Rate and Review</h2>
                    <div className="flex items-center mb-8">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <svg
                                key={i}
                                className={`w-10 h-10 mx-2 cursor-pointer ${i <= rating ? 'text-yellow-300' : 'text-gray-300'}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                                onClick={() => handleRatingClick(i)}
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        ))}
                    </div>
                    <textarea
                        className="p-4 border border-gray-300 rounded bg-gray-100 mb-6" style={{ width: "75%" }}
                        placeholder="Add your review (Max. 250 characters.)"
                        value={reviewText}
                        maxLength={250}
                        onChange={(e) => setReviewText(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 focus:outline-none"
                        onClick={handleReviewSubmit}
                    >
                        Submit Review
                    </button>
                </div>
                <div className="mt-8 mx-auto border border-gray-300 bg-gray-100 p-8 rounded-lg" style={{ maxWidth: "75%",marginTop:"5%"}}>
                    <h2 className="text-3xl font-bold mb-8">Reviews</h2>
                    {reviews.map((review, index) => (
                        <div key={index} className="mb-4">
                            <div className="border border-gray-200 review-card bg-white rounded-lg p-4 shadow-md hover:shadow-lg transform transition-transform hover:scale-105">
                                <div>
                                    <h1 className="text-xl font-bold mb-3 text-gray-800">{review.userName}</h1>
                                    <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-6 h-6 ${i < review.rating ? 'text-yellow-300' : 'text-gray-300'}`}
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 22 20"
                                            >
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p className="mb-2 text-lg font-semibold text-gray-800 mt-2 dark:text-gray-800">{review.review}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <ToastContainer position="top-right" autoClose={5000} />
            </div>
        </>
    );
}

export default RatingAndReview;

