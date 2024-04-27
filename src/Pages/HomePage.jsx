import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const handleSignupEventProvider = (role) => {
    // Send a POST request to the signup endpoint with the role in the headers
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'role': role // Pass the role directly to the function
      },
      body: JSON.stringify({}) // You can include additional data in the body if needed
    }).then(response => {
      // Handle response as needed
      console.log(response);
    }).catch(error => {
      // Handle error
      console.error('Error:', error);
    });
  };
  
  const handleSignupUser = (role) => {
    // Send a POST request to the signup endpoint with the role in the headers
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'role': role // Pass the role directly to the function
      },
      body: JSON.stringify({}) // You can include additional data in the body if needed
    }).then(response => {
      // Handle response as needed
      console.log(response);
    }).catch(error => {
      // Handle error
      console.error('Error:', error);
    });
  };
  

  return (
    <>
      <section className="bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply h-screen">
        <div className="px-4 mx-auto max-w-screen-xl flex flex-col justify-center items-center h-full text-center lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Welcome to TechCommune</h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">TechCommune is a vibrant community where tech enthusiasts, entrepreneurs, and innovators come together to collaborate, learn, and grow. Join us in shaping the future through technology.</p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <Link to="/signup" onClick={() => handleSignupEventProvider('eventprovider')} className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
  Sign up as Event Provider
</Link>
<Link to="/signup" onClick={() => handleSignupUser('user')} className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
  Sign up as User
</Link> 
          </div>
          <p className="mt-4 text-gray-300 text-sm">
            Already registered? <Link to="/login" className="text-blue-500 hover:text-blue-700">Sign in</Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default HomePage;
