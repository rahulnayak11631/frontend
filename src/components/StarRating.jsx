import React from 'react';

const StarRating = ({ averageRating }) => {
  // Function to render stars based on averageRating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(averageRating); // Full stars count
    const remainder = averageRating - fullStars; // Decimal part to determine quarter, half, or three-quarters

    // Iterate through 5 stars
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        // Full star
        stars.push(<Star key={i} type="full" />);
      } else if (i === fullStars) {
        // Partial star based on remainder
        if (remainder >= 0.75) {
          stars.push(<Star key={i} type="three-quarters" />);
        } else if (remainder >= 0.5) {
          stars.push(<Star key={i} type="half" />);
        } else if (remainder >= 0.25) {
          stars.push(<Star key={i} type="quarter" />);
        } else {
          stars.push(<Star key={i} type="empty" />);
        }
      } else {
        // Empty star
        stars.push(<Star key={i} type="empty" />);
      }
    }

    return stars;
  };

  // Star component to display different star types
  const Star = ({ type }) => {
    let pathData = "";

    switch (type) {
      case "full":
        pathData = "M10 15.27L16.18 20L14.54 12.97L20 8.24L12.81 7.63L10 1L7.19 7.63L0 8.24L5.46 12.97L3.82 20L10 15.27Z";
        break;
      case "three-quarters":
        pathData = "M10 15.27L10 1L7.19 7.63L0 8.24L5.46 12.97L3.82 20L10 15.27Z M16.18 20L14.54 12.97L20 8.24L12.81 7.63L10 15.27Z";
        break;
      case "half":
        pathData = "M10 15.27L10 1L7.19 7.63L0 8.24L5.46 12.97L10 15.27Z";
        break;
      case "quarter":
        pathData = "M10 15.27L10 1L7.19 7.63L0 8.24L5.46 12.97L3.82 20L10 15.27Z";
        break;
      case "empty":
        pathData = "M22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.45 13.97L5.82 21.02L12 17.27L18.18 21.02L16.55 13.97L22 9.24ZM12 15.4L7.24 18.67L8.47 13.39L4.24 9.5L9.62 8.95L12 4.1L14.38 8.95L19.76 9.5L15.53 13.39L16.76 18.67L12 15.4Z";
        break;
      default:
        pathData = "";
    }

    return (
      <svg className={`w-8 h-8 ${type !== "empty" ? "text-orange-500" : "text-gray-300"}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d={pathData} fill="currentColor" />
      </svg>
    );
  };

  return (
    <div className="flex items-center mb-5">
      {renderStars()}
    </div>
  );
};

export default StarRating;
