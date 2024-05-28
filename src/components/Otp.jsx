import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiConfig } from "../Constants/ApiConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/Loader.css";

function Otp() {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState(Array(6).fill(""));
  const [isFilled, setIsFilled] = useState(false);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [countdown, setCountdown] = useState(60); // Initial countdown set to 60 seconds
  const navigate = useNavigate();

  useEffect(() => {
    const filled = inputs.every((value) => /^\d$/.test(value));
    setIsFilled(filled);
  }, [inputs]);

  // Countdown timer effect
  useEffect(() => {
    setResendEnabled(false); // Disable resend button initially
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendEnabled(true);
    }
  }, [countdown]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);
      if (index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index >= 0) {
      const newInputs = [...inputs];
      newInputs[index] = "";
      setInputs(newInputs);
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = Cookies.get("role");
    const email = Cookies.get("email");
    const otp = inputs.join("");
    setLoading(true);

    const headers = {
      role: role,
      email: email,
      otpforTwoFAFromUser: otp,
      otp: otp,
    };

    const ResetPassword = Cookies.get("ResetPassword");
    // console.log(ResetPassword)
    if (ResetPassword==="true") {
      try {
        const response = await axios.post(
          `${apiConfig.baseURL}/verifyOtpforforgotpassword`,
          {},
          { headers }
        );
        const dataResponse = await response.data;
        if (dataResponse.success) {
          setLoading(false);
          toast.success(dataResponse.message);
          setTimeout(() => {
            navigate("/resetPassword");
          }, 2000);
        } else {
          toast.error(dataResponse.message);
          navigate("/otp");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {

        // Cookies.set("ResetPassword","false");
        Cookies.remove("ResetPassword")
      }
    } else 
    {
      setLoading(false);
      try {
        const response = await axios.post(
          `${apiConfig.baseURL}/2fa`,
          {},
          { headers }
        );
        const dataResponse = response.data;

        if (dataResponse.success) {
          toast.success(dataResponse.message);
          Cookies.set("token", dataResponse.token);

          const userDetailsResponse = await axios.get(
            `${apiConfig.baseURL}/getuserdetailsbytoken`,
            {
              headers: {
                token: Cookies.get("token"),
                role: Cookies.get("role"),
              },
            }
          );

          const response = await userDetailsResponse.data;

          if (response !== null) {
            const id = response.id;
            Cookies.set("Id", id);

            if (role === "admin") {
              setTimeout(() => {
                navigate("/adminDashboard");
              }, 2000);
            } else if (role === "eventprovider") {
              setTimeout(() => {
                navigate("/eventProviderDashboard");
              }, 2000);
            } else if (role === "user") {
              setTimeout(() => {
                navigate("/userDashboard");
              }, 2000);
            }
          } else {
            toast.error(userDetailsResponse.data.message);
          }
        } else {
          toast.error(dataResponse.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const resendOtp = async (event) => {
    event.preventDefault();
    if (!resendEnabled) return;

    setResendEnabled(false);
    setCountdown(60);

    try {
      const response = await axios.get(
        `${apiConfig.baseURL}/resendOtp`,
        {
          headers: {
            "Content-Type": "application/json",
            email: Cookies.get("email"),
            role: Cookies.get("role")
          }
        }
      );
      const dataResponse = await response.data;
      if (dataResponse.success) {
        Cookies.set("token", dataResponse.token);
        toast.success(dataResponse.message);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center">
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="loader">
            <span className="loader-text">loading...</span>
            <span className="load"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {loading && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="loader">
              <span className="loader-text">loading...</span>
              <span className="load"></span>
            </div>
          </div>
        )}
        <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow-lg">
          <header className="mb-8">
            <h1 className="text-2xl font-bold mb-1 ">
              One Time Password Verification
            </h1>
            <p className="text-[15px] text-slate-500">
              Enter the 6-digit verification code that was sent to{" "}
              {Cookies.get("email")}.
            </p>
          </header>
          <form id="otp-form">
            <div className="flex items-center justify-center gap-3">
              {inputs.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  id={`otp-input-${index}`}
                  className="w-14 h-14 text-center text-2xl font-bold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
            <div className="max-w-[260px] mx-auto mt-4">
              <button
                type="submit"
                disabled={!isFilled}
                className={`w-full inline-flex justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium text-white shadow-sm ${
                  isFilled
                    ? "bg-indigo-500 hover:bg-indigo-600 focus:ring focus:ring-indigo-300"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                onClick={handleSubmit}
              >
                Verify Account
              </button>
            </div>
          </form>
          <div className="text-sm text-slate-500 mt-4">
            Didn’t receive code?{" "}
            <a
              className={`font-medium ${
                resendEnabled ? "text-indigo-500 hover:text-indigo-600" : "text-gray-400 cursor-not-allowed"
              }`}
              href="#0"
              onClick={resendOtp}
            >
              Resend{resendEnabled ? "" : ` (${countdown}s)`}
            </a>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default Otp;
