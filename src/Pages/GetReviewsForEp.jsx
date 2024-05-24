import { useParams } from "react-router-dom";
import { apiConfig } from "../Constants/ApiConfig";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function GetReviewsForEp() {
  const [reviews, setReviews] = useState([]);

  const { eventId } = useParams(); // Assume event ID is passed as a route parameter

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${apiConfig.baseURL}/getreview`, {
          headers: {
            eventId: eventId,
          },
        });

        // if (!response.data.success) {
        //   toast.error("No Reviews Found!")
        //   console.log("no reviews")
        //   return
        // }
        setReviews(await response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  },[]);

  return (
    <>
      <div
        className="mt-8 mx-auto border border-gray-300 bg-gray-100 p-8 rounded-lg"
        style={{ maxWidth: "75%", marginTop: "5%" }}
      >
        <h2 className="text-3xl font-bold mb-8">Reviews</h2>
        {reviews.length !== 0
          ? reviews.map((review, index) => (
              <div key={index} className="mb-4">
                <div className="border border-gray-200 review-card bg-white rounded-lg p-4 shadow-md hover:shadow-lg transform transition-transform hover:scale-105">
                  <div>
                    <h1 className="text-xl font-bold mb-3 text-gray-800">
                      {review.userName}
                    </h1>
                    <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ${
                            i < review.rating
                              ? "text-yellow-300"
                              : "text-gray-300"
                          }`}
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
                  <p className="mb-2 text-lg font-semibold text-gray-800 mt-2 dark:text-gray-800">
                    {review.review}
                  </p>
                </div>
              </div>
            ))
          : "No Reviews Found"}
      </div>
      <ToastContainer position="top-right" autoClose={5000} />

    </>
  );
}

export default GetReviewsForEp;
