import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useLocation } from 'react-router-dom';

function EventProviderDocuments() {
  const location = useLocation();
  const { imageUrls } = location.state || { imageUrls: [] };
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (newIndex) => {
    setCurrentIndex(newIndex);
  };

  const carouselStyles = {
    width: "600px", // Adjust width as desired
    margin: "0 auto", // Center the carousel
    padding: "20px", // Add padding around the carousel
  };

  const imageStyles = {
    objectFit: "cover", // Ensure images fill the container
    width: "100%", // Set fixed width for images
    height: "700px", // Set fixed height for images (optional)
  };

  const indicatorStyles = {
    display: "none", // Hide the indicator dots completely
  };

  return (
    <div className="w-full mt-5 ">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg mx-5 font-semibold text-gray-800">
          {imageUrls.length} Images
        </span>
        <div className="flex items-center space-x-2 mx-5">
          <span className="text-base text-gray-600">Image:</span>
          <span className="text-base font-semibold text-gray-800">
            {currentIndex + 1} of {imageUrls.length}
          </span>
        </div>
      </div>
      <Carousel
        showArrows={true}
        showThumbs={false}
        infiniteLoop={true}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev ? (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{ left: "20px" }}
              className="absolute z-50 top-1/2 transform -translate-y-1/2 text-xl text-white bg-gray-800 rounded-full p-2 focus:outline-none"
            >
              &#8249;
            </button>
          ) : null
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext ? (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{ right: "20px" }}
              className="absolute z-50 top-1/2 transform -translate-y-1/2 text-xl text-white bg-gray-800 rounded-full p-2 focus:outline-none"
            >
              &#8250;
            </button>
          ) : null
        }
        renderIndicator={(onClickHandler, isSelected, index, label) => (
          <li key={index} style={indicatorStyles} /> // Empty indicator element
        )}
        slideBy={1} // Slide only one image at a time
        autoPlay={false} // Disable autoplay
        stopOnHover={false} // Disable stopping on hover
        emulateTouch // Enable touch functionality for mobile devices
        styles={carouselStyles}
        onChange={handleSlideChange} // Update currentIndex on slide change
      >
        {imageUrls.map((image, index) => (
          <div key={index}>
            <img
              className="w-full h-auto"
              src={image.imageURL || image} // Handle both imageURL and image props
              alt={`Image ${index + 1}`}
              style={imageStyles}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default EventProviderDocuments;
 