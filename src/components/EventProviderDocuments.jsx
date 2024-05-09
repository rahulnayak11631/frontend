import React from "react";

function EventProviderDocuments({ location }) {
    const { imageUrls } = location.state || { imageUrls: [] };
    const images = [];

    if (imageUrls && imageUrls.length) {
        for (let i = 0; i < imageUrls.length; i++) {
            const url = imageUrls[i];
            images.push(
                <div key={i} className="p-4 bg-gray-200 border border-gray-300 rounded-lg shadow-md">
                    <img src={url} alt={`Image ${i + 1}`} className="w-full h-full object-cover" />
                </div>
            );
        }
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {images}
        </div>
    );
}

export default EventProviderDocuments;
