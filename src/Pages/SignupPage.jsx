import React from "react";
import Navbar from "../components/Navbar.jsx";
import Signup from "../components/Signup.jsx";

function SignupPage({ role }) {
    return (
        <div>
            <Navbar/>
            <Signup  role={role}/>
        </div>
    );
}

export default SignupPage;
