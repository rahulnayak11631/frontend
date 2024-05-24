import GetEventProviders from "../components/GetEventProviders";
import Navbar from "../components/Navbar";
function AdminDashboardGetEPPage(){

    const handleGetEventProvidersClick = () => {
        navigate("/adminDashboard/getEventProviders");
      };
    return(
        <>
        <Navbar  onGetEventProvidersClick={handleGetEventProvidersClick}/>
        <GetEventProviders/>
        </>
    );
}
export default AdminDashboardGetEPPage