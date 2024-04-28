import React from "react";
import Navbar from "../components/Navbar.jsx";
import Signup from "../components/Signup.jsx";
import { useLocation } from "react-router-dom";

function SignupPage() {
  const location = useLocation();
  const role = location.state?.role; // Access role from state
  console.log(role);


    return (
        <div>
            <Navbar/>
            <Signup role={role} />
        </div>
    );
}

export default SignupPage;
