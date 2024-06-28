// import React, { useState, useEffect, useContext } from "react";
// import { cityContext } from "../../page/Home";

// const AqiData = () => {
//   const { setLocation } = useContext(cityContext);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getLocation = async () => {
//       try {
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(
//             (position) => {
//               const { latitude, longitude } = position.coords;

//               const apiKey = "5162096789da4a96c75f4792c5e4628e";
//               const apiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

//               fetch(apiUrl)
//                 .then((response) => {
//                   if (!response.ok) {
//                     throw new Error("Failed to fetch data");
//                   }
//                   return response.json();
//                 })
//                 .then((data) => {
//                   // Assuming data format is like: { list: [{ main: { aqi: AQI_VALUE } }] }
//                   const aqi = data.list[0].main.aqi;
//                   console.log(aqi);
//                   setLocation({ latitude, longitude, aqi });
//                 })
//                 .catch((error) => {
//                   setError("Error fetching AQI data");
//                   console.error(error);
//                 });
//             },
//             (error) => {
//               setError("Error getting location");
//               console.error(error);
//             }
//           );
//         } else {
//           setError("Geolocation is not supported by your browser");
//         }
//       } catch (error) {
//         setError("Error accessing geolocation");
//         console.error(error);
//       }
//     };

//     getLocation();
//   }, [setLocation]);

//   return <></>;
// };

// export default AqiData;
