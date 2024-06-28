import React from "react";
import { useState, useEffect } from "react";
import { Model, Table, Button } from "flowbite-react";

export default function DashEventEntrys() {
  const [event, setEvent] = useState();
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

  return <div>DashEventEntrys</div>;
}
