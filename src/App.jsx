import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignupPage from './Pages/SignupPage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import HomePage from './Pages/HomePage.jsx';
import AdminDashboard from './Pages/AdminDashboard.jsx';
import Otp from './components/Otp.jsx';
import AdminLoginPage from './Pages/AdminLoginPage.jsx';
import AdminSignUp from './components/AdminSignUp.jsx';
import AdminSignUpPage from './Pages/AdminSignupPage.jsx';
import EventProviderDashboard from './Pages/EventProviderDashboard.jsx';
import UserDashboard from './Pages/UserDashboard.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import EmailForForgotPassword from './components/EmailForForgotPassword.jsx';


function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/adminSignUp" element={<AdminSignUpPage/>} />
        <Route path="/eventProviderDashboard" element={<EventProviderDashboard />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route  path="/resetPassword" element ={<ResetPassword/>} />
        <Route  path="/emailforgotpassword" element ={<EmailForForgotPassword/>} />

       </Routes>
    </Router>
  );
}

export default App;
