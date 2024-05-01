import React from "react";
import Navbar from "../components/Navbar.jsx";
import Signup from "../components/Signup.jsx";
import { useLocation } from "react-router-dom";

function SignupPage() {
 


    return (
        <div>
            <Navbar/>
            <Signup />
        </div>
    );
}

export default SignupPage;
