import React, { useEffect, useState } from "react";
import "./event.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Event = () => {
  const navigate = useNavigate();
  // Access history object from React Router
  const [event, setEvent] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { currentUser } = useSelector((state) => state.user)

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

  const handleLinkClick = (event) => {
    try{
      if (!currentUser) {
        event.preventDefault(); // Prevent default link behavior (navigation)
        // Redirect to login page using history.push('/login')
        navigate('/login'); // Navigates to the /about route
      }
    }catch(error){
      console.error(error);
    }
  };

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
          <div className="mt-20 mx-0 w-9/10   max-h-[550px]  items-center">
            <Link to={`/events/${val._id}`} className="link" onClick={handleLinkClick}>
              <img
                src={val.eventImage}
                className="eveimg w-full h-auto"
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
