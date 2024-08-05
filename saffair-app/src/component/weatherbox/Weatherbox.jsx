import "./weatherbox.css";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { cityContext } from "../../page/Home";
import Loadder from "../../lottie/Loadder";

export default function Weatherbox() {
  const [airData, setAirData] = useState({
    imageUrl: "",
    aqiValue: "",
    airQuality: "",
    city: ""
  });
  const { location } = useContext(cityContext);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false,
  });
  const [aqi, setAqi] = useState("");



  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  useEffect(() => {
    const getAqiData = (aqiValue) => {
      const aqiMap = {
        1: { range: "0 - 100", quality: "Good", image: "/assets/aqiImg/good.jpg" },
        2: { range: "100 - 200", quality: "Moderate", image: "/assets/aqiImg/Moderate.png" },
        3: { range: "200 - 300", quality: "Unhealthy", image: "/assets/aqiImg/Unhealthy.jpg" },
        4: { range: "400 - 500", quality: "Very Unhealthy", image: "/assets/aqiImg/Very unhealthy.jpg" },
        5: { range: "500 - 600", quality: "Hazardous", image: "/assets/aqiImg/hazardous.jpg" }
      };

      return aqiMap[aqiValue] || aqiMap[1]; // Default to "Good" if AQI is not in the range
    };

    const aqiData = getAqiData(aqi);

    setAirData({
      imageUrl: aqiData.image,
      aqiValue: aqiData.range,
      airQuality: aqiData.quality,
      city: weather.data.name || "",
    });
  }, [aqi, weather.data.name]);

  const toDateFunction = () => {
    const currentDate = new Date();
    const months = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    const WeekDays = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    const day = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const weekday = WeekDays[currentDate.getDay()];
    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${day} ${month}, ${weekday} ${hours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <Link to="/">
      <div className="weather-container">
        {loading ? (
          <div className="spinnerr">
            <Loadder />
          </div>
        ) : (
          <div className="wicon">
            <div className="aqi-overlay">
              <p className="thecity">{airData.city}</p>
              <div className="air-quality">{airData.airQuality}</div>
              <div className="aqi-value">AQI : {airData.aqiValue}</div>
              
            </div>
            <img src={airData.imageUrl} alt={`Air quality: ${airData.airQuality}`} />
          </div>
        )}
      </div>
    </Link>
  );
}