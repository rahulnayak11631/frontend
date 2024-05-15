import EventProviderDocuments from '../components/EventProviderDocuments';
import { useLocation } from 'react-router-dom';

function EventProviderDocumentPage() {
    const location = useLocation();
    return <EventProviderDocuments location={location} />;
}

export default EventProviderDocumentPage;
