import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { cityContext } from "../page/Home";

const CityContext = () => {
  const { location, setLocation } = useContext(cityContext);
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;

              const apiKey = "5162096789da4a96c75f4792c5e4628e";
              const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

              fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                  const cityName = data.name;
                  setCity(cityName);
                })
                .catch((error) => {
                  setError("Error fetching city name");
                  console.error(error);
                });
            },
            (error) => {
              setError("Error getting location");
              console.error(error);
            }
          );
        } else {
          setError("Geolocation is not supported by your browser");
        }
      } catch (error) {
        setError("Error accessing geolocation");
        console.error(error);
      }
    };

    getLocation();
    setLocation(city);
  }, [city]);

  return <></>;
};

export default CityContext;
