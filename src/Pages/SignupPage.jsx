import React from "react";
import Navbar from "../components/Navbar";
import Signup from "../components/Signup";

function SignupPage(){
    return(
        <div>
            <Navbar />
            <Signup Signup_or_Signin={"Sign in"}/>
        </div>
    );
}

export default SignupPage;