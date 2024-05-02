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
      </Routes>
    </Router>
  );
}

export default App;
