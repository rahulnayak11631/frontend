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

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
