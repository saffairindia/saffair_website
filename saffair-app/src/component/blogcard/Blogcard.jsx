import React from "react";
import { Card } from "flowbite-react";

export default function Blogcard({ cover, title, image }) {
  return (
    <div className="group flex flex-col md:flex-row items-center p-4 space-y-4 md:space-x-4 bg-red shadow-lg rounded-lg transition duration-300 ease-in-out transform w-4/5 m-auto">
      <img
        src={image}
        alt="Blog Post"
        className="w-24  h-auto md:w-48 md:h-32 mr-4 md:mr-0 mb-4 md:mb-0"
       
      />
      <div>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h5>
        <p className="font-normal text-gray-700">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </div>
    </div>
  );
}
