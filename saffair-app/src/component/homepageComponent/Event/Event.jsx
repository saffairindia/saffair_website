import React, { useEffect, useState } from "react";
import "./event.css";
import { Link } from "react-router-dom";

const Event = () => {
  const [event, setEvent] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/events/Events`);
        if (!response.ok) {
          throw new Error("Error while fetching events!");
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % event.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [event]);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + event.length) % event.length);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % event.length);
  };

  return (
    <>
      {event.map((val, index) => (
        <div key={val._id} className={`main ${index === currentImageIndex ? "" : "hidden"}`}>
          <div className="mt-20 mx-0 w-screen items-center">
            <Link to={`/events/${val._id}`} className="link">
              <img
                src={val.eventImage}
                className="eveimg w-full auto-height"
                alt="event"
              />
            </Link>
            {index === currentImageIndex && (
              <div className="manual-controls">
                <button onClick={goToPreviousImage} className="prev-button">&lt;</button>
                {/* <span>{currentImageIndex + 1}/{event.length}</span> */}
                <button onClick={goToNextImage} className="next-button">&gt;</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Event;
