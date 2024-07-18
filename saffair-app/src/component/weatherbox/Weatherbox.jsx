import "./weatherbox.css";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { WeatherImageContext } from "../../page/Home";
import { SearchContext } from "../../page/Home";
import { cityContext } from "../../page/Home";
import { Button, Spinner } from "flowbite-react";

export default function Weatherbox() {
  const { airData, setAirData } = useContext(WeatherImageContext);
  const { location } = useContext(cityContext);
  const [loading, setLoading] = useState(true); // Initial loading state set to true
  const [weather, setWeather] = useState({
    loading: true, // Initial loading state for weather data
    data: {},
    error: false,
  });
  const [aqi, setAqi] = useState("");

  useEffect(() => {
    setLoading(true); // Set loading to true on component mount or location change
    const fetchData = async () => {
      try {
        const weatherResponse = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              q: location || "Ahmedabad",
              units: "metric",
              appid: process.env.REACT_APP_WEATHER_KEY,
            },
          }
        );
        const aqiResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${weatherResponse.data.coord.lat}&lon=${weatherResponse.data.coord.lon}&appid=${process.env.REACT_APP_WEATHER_KEY}`
        );

        setWeather({
          data: weatherResponse.data,
          loading: false,
          error: false,
        });
        setAqi(aqiResponse.data.list[0].main.aqi);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeather({ ...weather, data: {}, error: true });
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, [location]);

  useEffect(() => {
    let newAqiValue;
    let newAirQuality;
    let imgValue;

    if (aqi === 1) {
      newAqiValue = "0 - 100";
      newAirQuality = "Good";
      imgValue = "./assets/aqiImg/good.jpg";
    } else if (aqi === 2) {
      newAqiValue = "100 - 200";
      newAirQuality = "Moderate";
      imgValue = "./assets/aqiImg/Moderate.jpg";
    } else if (aqi === 3) {
      newAqiValue = "200 - 300";
      newAirQuality = "Unhealthy";
      imgValue = "./assets/aqiImg/Unhealthy.jpg";
    } else if (aqi === 4) {
      newAqiValue = "400 - 500";
      newAirQuality = "Unhealthy";
      imgValue = "./assets/aqiImg/Unhealthy.jpg";
    } else if (aqi === 5) {
      newAqiValue = "500 - 600";
      newAirQuality = "Hazardous";
      imgValue = "./assets/aqiImg/hazardous.png";
    }

    setAirData((prevAirData) => ({
      ...prevAirData,
      imageUrl: imgValue || "./assets/aqiImg/good.jpg",
      aqiValue: newAqiValue || "0 - 100",
      airQuality: newAirQuality || "Good",
      city: weather.data.name || "",
    }));
  }, [aqi, setAirData, weather.data.name]);

  const getBackgroundImage = () => {
    const imageMap = {
      1: "./assets/aqiImg/good.jpg",
      2: "./assets/aqiImg/Moderate.jpg",
      3: "./assets/aqiImg/Unhealthy.jpg",
      4: "./assets/aqiImg/Unhealthy.jpg",
      5: "./assets/aqiImg/hazardous.png",
    };
    return imageMap[aqi] || "./assets/aqiImg/good.jpg";
  };

  const getHealthAdviceImage = () => {
    const imageMap = {
      1: "./assets/Group 408.svg",
      2: "./assets/Group 498.svg",
      3: "./assets/Group 499.svg",
      4: "./assets/Group 500.svg",
      5: "./assets/Group 501.svg",
    };
    return imageMap[aqi] || "./assets/aqiImg/Group 408.svg";
  };

  const getHealthAdviceImage2 = () => {
    const imageMap = {
      1: "./assets/aqiImg/Group 486.svg",
      2: "./assets/aqiImg/Group 494.svg",
      3: "./assets/aqiImg/Group 495.svg",
      4: "./assets/aqiImg/Group 496.svg",
      5: "./assets/aqiImg/Group 497.svg",
    };
    return imageMap[aqi] || "./assets/aqiImg/Group 408.svg";
  };

  const toDateFunction = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const WeekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]
      }`;
    return date;
  };

  return (
    <Link to="/">
      <div className="weather-container">
        {loading ? ( // Conditionally render loader while loading is true
          <div className="spinnerr">
                        <Spinner size="s" />

          </div>
        ) : (
          <div className="wicon">
            <div className="aqi-overlay">
              <p className="thecity">{airData.city}</p>
              <div className="air-quality">{airData.airQuality}</div>
              <div className="aqi-value">AQI : {airData.aqiValue}</div>
            </div>
            <img src={"." + airData.imageUrl} alt="Weather Icon" />
          </div>
        )}
      </div>
    </Link>
  );
}
