import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../Styles/Loader.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiConfig } from "../Constants/ApiConfig";

function Login() {
  const defaultRole = "eventprovider";
  const [role, setRole] = useState(defaultRole);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    Cookies.set("role", selectedRole);
  };

  useEffect(() => {
    const storedRole = Cookies.get("role");
    // Cookies.set("ResetPassword",false)

    if (!storedRole) {
      Cookies.set("role", defaultRole);
    } else {
      setRole(storedRole);
    }
  }, [defaultRole]);

  const navigate = useNavigate();

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
    const data = {
      ...formData,
      role: Cookies.get("role"),
    };

    const headers = {
      "Content-Type": "application/json",
      role: Cookies.get("role"),
    };

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
      // console.log(dataResponse)
      if (dataResponse.success) {
        Cookies.set("token", dataResponse.token);
        Cookies.set("email", data.email);
        Cookies.set("password", data.password);

        if (
          Cookies.get("role") === "eventprovider" ||
          Cookies.get("role") === "user"
        ) {
          toast.success(dataResponse.message);
          setTimeout(() => {
            navigate("/otp");
          }, 2000);
        }
      } else {
        toast.error(dataResponse.message);
      }
      // console.log(dataResponse);
    } catch (error) {
      console.log(error)

      toast.error(error.message);
    } finally {
      setLoading(false); // Set loading to false after response
      Cookies.remove("password");
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
          <div className="flex flex-col justify-center items-center mt-5">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Welcome to TechCommune
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mt-5">
              Join our vibrant community of tech enthusiasts, entrepreneurs, and
              innovators. Lets shape the future through technology together.
            </p>
          </div>
          <div
            className="mt-5 bg-white rounded-lg shadow-xl dark:bg-gray-800 "
            style={{ width: "70%", marginLeft: "15%" }}
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Sign in to TechCommune
              </h2>
              <form className="mt-8 space-y-6" action="#">
                <div className="flex items-center mb-6">
                  <label className="block mb-2 mr-3 mt-2 text-sm font-medium text-gray-900 dark:text-white">
                    Select Role:
                  </label>
                  <div className="flex items-center space-x-4 ">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="role"
                        value="eventprovider"
                        checked={role === "eventprovider"}
                        onChange={handleRoleChange}
                        className="form-radio h-5 w-5 text-blue-600 dark:text-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-900 dark:text-white">
                        Event Provider
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="role"
                        value="user"
                        checked={role === "user"}
                        onChange={handleRoleChange}
                        className="form-radio h-5 w-5 text-blue-600 dark:text-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-900 dark:text-white">
                        User
                      </span>
                    </label>
                  </div>
                </div>
                <div className="" style={{ width: "65%", marginLeft: "15%" }}>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-l rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500 font-medium"
                    placeholder="name@company.com"
                    required
                    onChange={handleChange}
                    
                  />
                </div>
                <div
                  className="relative z-0 w-full mb-5 group"
                  style={{ width: "65%", marginLeft: "15%" }}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    id="floating_password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-l rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500  font-medium"
                    placeholder="Password"
                    required
                  />
                  {/* {!showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={()=>setShowPassword(true)}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 text-white"
                    >
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path
                        fill-rule="evenodd"
                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={()=>setShowPassword(false)}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 text-white"
                    >
                      <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                      <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                      <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                    </svg>
                  )} */}

                  {/* <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="absolute inset-y-0 right-0 flex items-center px-2 text-sm text-gray-500 focus:outline-none dark:text-white"
                    style={{ fontSize: "0.75rem" }}
                  > */}
                  {/* {showPassword ? "Hide" : "Show"} */}
                  {/* </button> */}
                  <div className="flex items-start mt-4 cursor-pointer">
                    <a
                      className="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                      onClick={() => navigate("/emailforgotpassword")}
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  style={{ marginLeft: "35%" }}
                >
                  Login to your account
                </button>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  Not registered yet?{" "}
                  <Link
                    to="/"
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

export default Login;
