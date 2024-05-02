import {React, useState} from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {


  const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);


    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };

      const [formData, setFormData] = useState({
        email: "",
        password: ""
      });

      const handleChange = (e) => {
      
        setFormData({...formData,[e.target.name]:e.target.value})
      };

      
  const handleSubmit = async (event) => {
    Cookies.set("role","admin") 
    event.preventDefault();
    const data = {
      ...formData,
      role: Cookies.get("role"), 
    };
    console.log("Form data:", data);
    console.log(Cookies.get("role"));

    const headers={
      "Content-Type": "application/json",
      "role":Cookies.get("role")
    }

    if (Cookies.get("role")==="admin") {
      
      const response= await axios.post(`http://localhost:8090/api/login`,{
        email:data.email,
        password:data.password
  
      },{headers})
      
      const dataResponse=await response.data
      if (dataResponse.success) {
        Cookies.set("token",dataResponse.token)
        Cookies.set("email",data.email)
        Cookies.set("password",data.password)
        
        navigate("/otp")
      }
      console.log(dataResponse)
    }

   

  }

   return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center">
          <div className="p-4 mx-auto max-w-screen-lg flex-grow">
                <div className="flex flex-col justify-center items-center mt-5">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Admin Login - TechCommune</h1>
                    <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mt-5">Join our vibrant community of tech enthusiasts, entrepreneurs, and innovators. Let's shape the future through technology together.</p>
                </div>
                <div className="mt-5 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign in to TechCommune</h2>
                        <form className="mt-8 space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required onChange={handleChange}/>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
    <input
        type={showPassword ? "text" : "password"}
        name="password"
        value={formData.password}
        onChange={handleChange}
        id="floating_password"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Password"
        required
    />
   <button
        type="button"
        onClick={handleTogglePassword}
        className="absolute inset-y-0 right-0 flex items-center px-2 text-sm text-gray-500 focus:outline-none dark:text-white"
        style={{ fontSize: '0.75rem' }}
    >
        {showPassword ? "Hide" : "Show"}
    </button>
</div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" name="remember" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" required />
                                </div>
                                <div className="ms-3 text-sm">
                                    <label htmlFor="remember" className="font-medium text-gray-500 dark:text-gray-400">Remember this device</label>
                                </div>
                                <a href="#" className="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot Password?</a>
                            </div>
                            <button type="submit" onClick={handleSubmit} className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                Not registered yet? <Link to="/" className="text-blue-600 hover:underline dark:text-blue-500">Create account</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
