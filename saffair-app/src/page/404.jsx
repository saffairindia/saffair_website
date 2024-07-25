// src/components/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
<div className="flex items-center justify-center min-h-screen bg-gradient-to-r ">
      <div className="text-center text-[#2196ba] ">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-3xl mb-8">Oops! Page not found</p>
        <p className="text-xl mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <Link 
          to="/" 
          className="bg-white text-[#2196ba] font-semibold px-6 py-3 rounded-full hover:bg-blue-100 transition duration-300 ease-in-out"
        >
          Go back to homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;