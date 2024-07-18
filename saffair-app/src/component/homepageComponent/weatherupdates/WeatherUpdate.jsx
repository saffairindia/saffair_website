import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDroplet,
  faLocationDot,
  faSun,
  faTemperatureHigh,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import "./weatherupdate.css";
import { useContext } from "react";
import { SearchContext } from "../../../page/Home";
import { cityContext } from "../../../page/Home";
import axios from "axios";
import { Button, Spinner } from "flowbite-react";
import { WeatherImageContext } from "../../../page/Home";
import { TextInput } from "flowbite-react";
import coicon from './co.png'
import so2icon from './so2.png'
import pm2icon from './pm 2.5.png'
import pm10icon from './pm 10.png'

export default function WeatherUpdate() {
  const [errormessage, setErormessage] = useState(false);
  const { airData, setAirData } = useContext(WeatherImageContext);
  const { newCity, setNewCity } = useContext(SearchContext);
  const { location, setLocation } = useContext(cityContext);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(location);
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState(null);

  const fetchLocationInfo = async (cityName) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cityName)}&key=YOUR_API_KEY`
      );

      const data = await response.json();

      if (data.status === "OK") {
        const result = data.results[0];
        const pincodeComponent = result.address_components.find(
          (component) => component.types.includes("postal_code")
        );
        const stateComponent = result.address_components.find(
          (component) => component.types.includes("administrative_area_level_1")
        );

        const pincode = pincodeComponent ? pincodeComponent.short_name : "N/A";
        const state = stateComponent ? stateComponent.long_name : "N/A";

        setPincode(pincode);
        setState(state);
      } else {
        console.error("Geocoding API error:", data.status);
        setError("Error fetching location info");
      }
    } catch (error) {
      console.error("Error fetching location info:", error);
      setError("Error fetching location info");
    }
  };

  useEffect(() => {
    fetchLocationInfo(location);
  }, [location]); // Fetch location info when location changes

  const [aqi, setAqi] = useState("");
  const [pm2_5, setPm2_5] = useState("20");
  const [pm10, setPm10] = useState("20");
  const [co, setCo] = useState("20");
  const [so2, setSo2] = useState("20");
  const toDateFunction = () => {
    const currentDate = new Date();
    const months = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    const WeekDays = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    // Get the date components
    const day = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const weekday = WeekDays[currentDate.getDay()];

    // Get the time components
    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    // Combine date and time into a single string
    const date = `${day} ${month}, ${weekday} ${hours}:${formattedMinutes} ${ampm}`;

    return date // Outputs the formatted date and time

  };

  useEffect(() => {
    setLoading(true);
    setWeather({ ...weather });
    const url = "https://api.openweathermap.org/data/2.5/weather";
    axios
      .get(url, {
        params: {
          q: location || "Ahmedabad",
          units: "metric",
          appid: process.env.REACT_APP_WEATHER_KEY,
        },
      })
      .then((res) => {
        setWeather({ data: res.data, loading: false, error: false });
        setLoading(false);
      })
      .catch((error) => {
        setWeather({ ...weather, data: {}, error: true });
        setInput("");
      });

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5162096789da4a96c75f4792c5e4628e`
        );
        const data = await response.json();
        const { coord } = data; // Destructure coord from data object
        const apiKey = "5162096789da4a96c75f4792c5e4628e";
        const aqiRes = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=${process.env.REACT_APP_WEATHER_KEY}`
        );
        const aqidata = await aqiRes.json();
        console.log(aqidata);
        const aqi = aqidata.list[0].main.aqi;
        const pm2_5value = aqidata.list[0].components.pm2_5;
        const pm10value = aqidata.list[0].components.pm10;
        const covalue = aqidata.list[0].components.co;
        const so2value = aqidata.list[0].components.so2;
        setPm2_5(pm2_5value);
        setPm10(pm10value);
        setCo(covalue);
        setSo2(so2value);
        setAqi(aqi);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [location]);

  const search = async () => {
    setLoading(true);
    try {
      setNewCity(input);

      setWeather({ ...weather });

      const url = "https://api.openweathermap.org/data/2.5/weather";
      const api_key = "5162096789da4a96c75f4792c5e4628e";

      // Fetch weather data using Axios
      const axiosResponse = await axios.get(url, {
        params: {
          q: input,
          units: "metric",
          appid: api_key,
        },
      });
      // console.log(axiosResponse.code);
      // if (axiosResponse.code === 404) {
      //   alert("city  not found");
      //   setLoading(false);
      // }

      // Update weather state with fetched data
      setWeather({ data: axiosResponse.data, error: false });
      const { coord } = axiosResponse.data;
      if (coord) {
        // Destructure coord from data object
        const apiKey = "5162096789da4a96c75f4792c5e4628e";
        const aqiRes = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`
        );
        const aqidata = await aqiRes.json();
        const aqi = aqidata.list[0].main.aqi;
        const pm2_5value = aqidata.list[0].components.pm2_5;
        const pm10value = aqidata.list[0].components.pm10;
        const covalue = aqidata.list[0].components.co;
        const so2value = aqidata.list[0].components.so2;
        setPm2_5(pm2_5value);
        setPm10(pm10value);
        setCo(covalue);
        setSo2(so2value);
        setAqi(aqi);
        setLoading(false);
      } else {
        // If coordinates are not available, display an error message
      }
    } catch (error) {
      // Handle errors
      console.error("Error fetching weather data:", error);
      setWeather({ ...weather, data: {}, error: true });
      setLoading(false);
      setErormessage(true);
      setInput("");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  const getBackgroundImage = () => {
    const imageMap = {
      1: "./assets/aqiImg/good.jpg",
      2: "./assets/aqiImg/Moderate.png",
      3: "./assets/aqiImg/Very unhealthy.jpg",
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

  var aqiValue;
  var air_quailty;
  if (aqi === 1) {
    aqiValue = "0 - 100";
    air_quailty = "Good";
  }
  if (aqi === 2) {
    aqiValue = "100 - 200";
    air_quailty = "Moderate";
  }
  if (aqi === 3) {
    aqiValue = "200 - 300";
    air_quailty = "Unhealthy";
  }
  if (aqi === 4) {
    aqiValue = "400 - 500";
    air_quailty = "Unhealthy";
  }
  if (aqi === 5) {
    aqiValue = "500 - 600";
    air_quailty = "Hazardous";
  }

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

    // Set the new values using setAirData
    setAirData((prevAirData) => ({
      ...prevAirData,
      imageUrl: imgValue,
      aqiValue: newAqiValue,
      airQuality: newAirQuality,
      city: weather.data.name,
    }));
  }, [aqi]); // Run this effect whenever the 'aqi' state changes

  // console.log(aqiValue);

  return (
    <div className="weather-Container">
      <div className="i-container h-[750px] ">
        <img
          src={getBackgroundImage()}
          alt="cloudy"
          className="background-image "
          style={{ filter: "blur(2px)" }} // Apply blur effect here

        />
        {loading ? (
          <div className="spinnerr">
            <Spinner size="xl" />
          </div>
        ) : (
          <div>
            <div className="content">
              <div className="whole ">
                <div className="fhalf">
                  <div className="mx-auto">
                    {weather.error && (
                      <>
                        <br />
                        <br />
                        <span className="error-message">
                          <span style={{ fontSize: "20px" }}></span>
                        </span>
                      </>
                    )}
                    {!weather.error && weather.data && weather.data.main ? (
                      <div className="bold">
                        <div className=" thevery   text-left" id="very">
                          {aqi === 4 ? "Very " : ""}
                        </div>
                        <p className="headtext  ">{air_quailty}</p>
                        <div className="infopluslogo flex items-center">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="text-4xl lg:mr-2"
                          />
                          <div className="infodata">
                            <p className="thecity">{weather.data.name}</p>
                            <p className="thecity">{pincode}</p>
                            <p className="thecity">{state}</p>
                            <p className="timedate">{toDateFunction()}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bold">
                        <p className="headtext mt-0">Good</p>
                        <div className="infopluslogo flex items-center">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="text-3xl lg:mr-2 lc"
                          />
                          <div className="infodata">
                            <p className="thecity">Surat</p>
                            <p className="timedate">27 April</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* </div> */}
                  </div>
                </div>
                <div className="shalf">
                  <div className="scontainer">
                    <TextInput
                      type="text"
                      className="bar"
                      placeholder="Your Country, City or Location"
                      name="query"
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <Button
                      outline
                      color="light"
                      className="sbutton"
                      onClick={() => {
                        search();
                      }}
                    >
                      Search
                    </Button>
                  </div>
                  {errormessage ? <p className="not">City not found</p> : ""}
                  <div className="impdiv mt-4 pl-3">
                    <div className="twoparts">
                      <div className="theaqi flex flex-col justify-center">
                        <div className="charttag ">AQI : {aqiValue}</div>
                        {/* <div className="charts">
                           <FontAwesomeIcon
                            icon={faChartSimple}
                            className="text-4xl text-white lg"
                          /> 
                          <p className="chartvalue">{aqiValue}</p> 
                        </div> */}
                        <div className="grido sgrid">
                          <div className="n4 sgrp">
                            <img src={pm2icon} alt="co"
                              className="h-5 w-5 sm:h-8 sm:w-8 md:h-10 md:w-10object-contain text-2xl lg " />


                            <div className="n1data txt">

                              <p className="n1name">
                                PM 2.5
                              </p>
                              <p className="n3value ">
                                {pm2_5} <span id="units">ug/m³</span>
                              </p>
                            </div>
                          </div>
                          <div className="n4 sgrp">
                            <img src={pm10icon} alt="co"
                              className="h-5 w-5 sm:h-8 sm:w-8 md:h-8 md:w-8 lg:h-8 lg:w-8 object-contain text-2xl lg " />


                            <div className="n1data txt">

                              <p className="n1name">
                                PM 10
                              </p>
                              <p className="n3value ">
                                {pm10} <span id="units">ug/m³</span>
                              </p>
                            </div>
                          </div>

                          <div className="n4 sgrp">
                            <img src={coicon} alt="co"
                              className="h-5 w-5 sm:h-8 sm:w-8 md:h-10 md:w-10 object-contain text-2xl lg " />

                            <div className="n1data txt">

                              <p className="n1name">
                                CO
                              </p>
                              <p className="n3value">
                                {co} <span id="units">ug/m³</span>
                              </p>
                            </div>
                          </div>

                          <div className="n4 sgrp">
                            <img src={so2icon} alt="co"
                              className="h-5 w-5 sm:h-8 sm:w-8 md:h-8 md:w-8 lg:h-8 lg:w-8 object-contain text-2xl lg " />

                            <div className="n1data txt">

                              <p className="n1name">
                                SO<sub>2</sub>
                              </p>
                              <p className="n3value ">
                                {so2} <span id="units">ug/m³</span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="hori-line"></div>
                      </div>

                      <div className="wea">
                        <div className="tago">
                          <p className="thetag"></p>
                        </div>
                        {weather && weather.data && weather.data.main ? (
                          <div className="grido wthr">
                            <div className="n1">
                              <FontAwesomeIcon
                                icon={faTemperatureHigh}
                                className="text-2xl lg"
                              />
                              <div className="n1data">
                                <p className="n1name">Temperature</p>
                                <p className="n1value">
                                  {" "}
                                  {weather.data.main.temp} °C{" "}
                                </p>
                              </div>
                            </div>
                            <div className="n2">
                              <FontAwesomeIcon
                                icon={faWind}
                                className="text-2xl lg"
                              />
                              <div className="n2data">
                                <p className="n2name">Wind</p>
                                <p className="n1value">
                                  {weather.data.wind.speed} m/s
                                </p>
                              </div>
                            </div>
                            <div className="n3 special">
                              <FontAwesomeIcon
                                icon={faDroplet}
                                className="text-2xl lg"
                              />
                              <div className="n3data runique plus ">
                                <p className="n3name">Humidity</p>
                                <p className="n3value ">
                                  {weather.data.main.humidity}
                                </p>
                              </div>
                            </div>
                            <div className="n4 special">
                              <FontAwesomeIcon
                                icon={faSun}
                                className="text-2xl lg"
                              />
                              <div className="n4data ">
                                <p className="n4name">UV Index</p>
                                <p className="n3value">3</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="grido wthr">
                            <div className="n1">
                              <FontAwesomeIcon
                                icon={faTemperatureHigh}
                                className="text-4xl lg"
                              />
                              <div className="n1data">
                                <p className="n1name">Temperature</p>
                                <p className="n1value">21°C </p>
                              </div>
                            </div>
                            <div className="n2">
                              <FontAwesomeIcon
                                icon={faWind}
                                className="text-4xl lg"
                              />
                              <div className="n2data">
                                <p className="n2name">Wind</p>
                                <p className="n2value">2.06 m/s</p>
                              </div>
                            </div>
                            <div className="n3 special">
                              <FontAwesomeIcon
                                icon={faDroplet}
                                className="text-4xl lg"
                              />
                              <div className="n3data runique plus ">
                                <p className="n3name">Humidity</p>
                                <p className="n3value ">36</p>
                              </div>
                            </div>
                            <div className="n4 special">
                              <FontAwesomeIcon
                                icon={faSun}
                                className="text-4xl lg"
                              />
                              <div className="n4data ">
                                <p className="n4name">UV Index</p>
                                <p className="n3value">3</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>
        )}
      </div>
      <div className="HA">
        <img
          className="HA2"
          src={getHealthAdviceImage()}
          alt="img"
          height="800px"
        />
        <img className="HA1" src={getHealthAdviceImage2()} alt="img" />
      </div>
    </div>
  );
}
