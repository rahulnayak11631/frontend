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
import AdminSignUpPage from './Pages/AdminSignupPage.jsx';
import EventProviderDashboard from './Pages/EventProviderDashboard.jsx';
import UserDashboard from './Pages/UserDashboard.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import EmailForForgotPassword from './components/EmailForForgotPassword.jsx';
import UserProfile from './components/UserProfile.jsx';
import EventProviderDocumentPage from './Pages/EventProviderDocumentPage.jsx'
import EventEnroll from './components/EventEnroll.jsx';
import CancelEnroll from './components/CancelEnroll.jsx';
import QRScannerPage from "./Pages/QRScannerPage.jsx";
import UpdateEventPage from "./Pages/AttendeeListPage.jsx";
import EventsCalendarPage from "./Pages/EventsCalendarPage.jsx";
import RatingAndReview from "./components/RatingAndReview.jsx";
import EPUploadDocumentsPage from "./Pages/EPUploadDocumentsPage.jsx";

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
        <Route path="/userprofile" element={<UserProfile />} />
        <Route  path="/eventproviderdocuments" element ={<EventProviderDocumentPage/>} />
        <Route path='/eventenroll/:eventId' element={<EventEnroll/>}/>
        <Route path='cancelenroll/:eventId' element={<CancelEnroll/>}/>
        <Route  path="/qrscanner" element ={<QRScannerPage/>} />
        <Route  path="/getAttendeeList" element ={<UpdateEventPage/>} />
        <Route  path="/eventsCalendar" element ={<EventsCalendarPage/>} />
        <Route  path="/rateandreview/:eventId" element ={<RatingAndReview/>}/>
        <Route  path="/uploadEPDocuments" element ={<EPUploadDocumentsPage/>} />



       </Routes>
    </Router>
  );
}

export default App;
