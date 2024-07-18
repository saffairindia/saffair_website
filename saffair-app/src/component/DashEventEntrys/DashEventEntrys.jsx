import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal, Table, Button } from "flowbite-react";

export default function DashEventEntrys() {
  const { currentUser } = useSelector((state) => state.user);

  const [events, setEvent] = useState([]);
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

  const  deleteEvent = async (postIdToDelete) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/events/deleteEvent/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Error while deleting event!");
      }
      const data = await response.json();
      setEvent(events.filter((event) => event._id !== postIdToDelete));
    } catch (error) {
      console.error(error);
      // Handle error
    }
  }
  return <div><h2 className="mb-2 ">Event Entrys</h2>
    
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Event image</Table.HeadCell>
              <Table.HeadCell>Evnet title</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {events.map((event) => (
              <Table.Body className="divide-y" key={event._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(event.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/events/${event._id}`}>
                      <img
                        src={event.eventImage}
                        alt={event.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/events/${event._id}`}
                    >
                      {event.eventTitle}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        deleteEvent(event._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/events/${event._id}`}
                    >
                      <span>View</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
         
        </>
  </div>;
}
