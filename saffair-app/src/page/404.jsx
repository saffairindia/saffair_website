// src/components/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
<div className="flex items-center justify-center min-h-screen bg-gradient-to-r ">
      <div className="text-center text-[#2196ba] ">
        <h1 className="text-6xl font-bold mb-4">This page doesn't seem to exist.</h1>
        <p className="text-xl mb-8">It looks like the link pointing here was faulty. Maybe try searching?</p>
        
      </div>
    </div>
  );
};

export default NotFound;