import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { useSelector } from "react-redux";

export default function Mycoins() {
  const [userData, setUserData] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_API}/api/user/${currentUser._id}`
        );
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        } else {
          console.log("User not found !!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [currentUser._id]);

  // Ensure userData and userData.coinHistory exist before accessing
  const coinHistory =
    userData && userData.coinHistory ? userData.coinHistory : [];

  return (
    <div className="min-h-screen w-full flex justify-center items-start mt-2">
      <div className="rounded-lg sm:p-3 w-3/4 h-3/4 p-1">
        <h2 className="text-5xl font-bold mb-4 text-center">Your Rewards</h2>
        <div className="flex flex-col items-center mb-4">
          <div className="h-44 w-44 flex items-center justify-center mr-2">
            <img src="../assets/coin.png" alt="Coin" />
          </div>
          <div className="font-bold text-5xl">
            <span>{userData.totalCoins}</span> coins
          </div>
        </div>
        <div className="cointables gap-3 justify-center items-center w-full">
          {coinHistory.length > 0 ? (
            <div className="overflow-x-auto mb-3 border border-black-200 border-1">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Event name</Table.HeadCell>
                  <Table.HeadCell>Coins</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {coinHistory.map((coin) => (
                    <Table.Row
                      key={coin._id} // Assuming there's an unique id for each coin
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {coin.eventName}
                      </Table.Cell>
                      <Table.Cell>{coin.coinsEarned}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          ) : (
            <p>No coins</p>
          )}
        </div>
      </div>
    </div>
  );
}
