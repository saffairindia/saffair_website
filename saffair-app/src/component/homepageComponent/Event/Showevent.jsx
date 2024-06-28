import React, { useState } from "react"
import './event.css'

const Showevent = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };


  return (
    <div className="themain">
      <div className="mt-20 w-full items-center">
       
        <div className="event ">
            <div className="flex justify-center text-3xl mb-4">Event : Environment Day</div>
            <div className="imgevent">
            <img src="../assets/event2.jpg" className="w-full h-screen"alt="event"></img>
            </div>
            <div className="eventdesc flex justify-center text-3xl mb-6 mt-4">This event was organized by zzz company.The main purpose of the event is blah blah blah</div>
            </div>
        </div>
      </div>
        
       
    
  );
};

export default Showevent;