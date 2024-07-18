import React from "react";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MyEvent() {
  return (
    <div className=" w-full flex justify-center items-start  ">
      <div className=" rounded-lg sm:p-3  w-3/4 h-3/4 p-1 ">
        <h2 className="text-5xl font-bold mb-4 text-center">Your Events</h2>
        
        {/* <div className="sm:flex flex-cols gap-3 justify-center items-center w-full bg-red-200 flex md:bg-blue-300 sm:bg-yellow-500  sm:flex"> */}
        <div className="overflow-x-auto mb-3 border border-black-200 border-1">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Event name</Table.HeadCell>

              <Table.HeadCell>Start Date</Table.HeadCell>
              <Table.HeadCell>End Date</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>View</Table.HeadCell>
              
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Environment day Event
                </Table.Cell>

                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  20-03-24
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  20-03-24
                </Table.Cell>
                <Table.Cell className="whitespace-  nowrap font-medium text-gray-900 dark:text-white">
                  To celebrate the Environment day by being serious about the
                  environment
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    
                <Link to="/Showevent"  ><div className=" text-green-500 ">view</div></Link>
                </Table.Cell>
                
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Environment day Event
                </Table.Cell>

                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  20-03-24
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  20-03-24
                </Table.Cell>
                <Table.Cell className="whitespace-  nowrap font-medium text-gray-900 dark:text-white">
                  To celebrate the Environment day by being serious about the
                  environment
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    
                <Link to="/Showevent"  ><div className=" text-green-500 ">view</div></Link>
                </Table.Cell>
                
              </Table.Row>
             
            </Table.Body>
          </Table>

        </div>
      </div>
    </div>
  );
}
