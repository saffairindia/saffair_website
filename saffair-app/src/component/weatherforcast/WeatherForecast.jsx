import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { SearchContext } from '../../page/Home';
import './weatherforcast.css'

export default function WeatherForecast() {
  const { newCity } = useContext(SearchContext)
  const [forcast, setForcast] = useState(null)
  // console.log("this is weather forecast");

  const [day1, setDay1] = useState([])
  const [day2, setDay2] = useState([])
  const [day3, setDay3] = useState([])
  const [day4, setDay4] = useState([])
  const [day5, setDay5] = useState([])


  useEffect(() => {
    const fetchforcast = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${newCity}&appid=5162096789da4a96c75f4792c5e4628e`);
      const data = await response.json();


      setForcast(data);

      const dd = [new Date((data.list)[0].dt * 1000).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' }), Math.round((data.list)[0].main.temp - 273.15), `https://openweathermap.org/img/wn/${(data.list)[0].weather[0].icon}@2x.png`];
      const dd1 = [new Date((data.list)[8].dt * 1000).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' }), Math.round((data.list)[8].main.temp - 273.15), `https://openweathermap.org/img/wn/${(data.list)[8].weather[0].icon}@2x.png`];
      const dd2 = [new Date((data.list)[16].dt * 1000).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' }), Math.round((data.list)[16].main.temp - 273.15), `https://openweathermap.org/img/wn/${(data.list)[16].weather[0].icon}@2x.png`];
      const dd3 = [new Date((data.list)[24].dt * 1000).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' }), Math.round((data.list)[24].main.temp - 273.15), `https://openweathermap.org/img/wn/${(data.list)[24].weather[0].icon}@2x.png`];
      const dd4 = [new Date((data.list)[32].dt * 1000).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' }), Math.round((data.list)[32].main.temp - 273.15), `https://openweathermap.org/img/wn/${(data.list)[32].weather[0].icon}@2x.png`];
      // console.log(dateString);

      setDay1(dd)
      setDay2(dd1)
      setDay3(dd2)
      setDay4(dd3)
      setDay5(dd4)
    }
    fetchforcast();
  }, [newCity])


  return (
    <>
      <div className="mainContenaer">
        <div className="days">
          <div className="dates">{day1[0]}</div>
          <img src={day1[2]} alt="hello" className='wIcon' />
          <span className="temp">{day1[1]}  <span className="cTemp">c</span></span>
        </div>
        <div className="days">
          <div className="dates">{day2[0]}</div>
          <img src={day2[2]} alt="hello" className='wIcon' />
          <span className="temp">{day2[1]}  <span className="cTemp">c</span></span>
        </div>
        <div className="days">
          <div className="dates">{day3[0]}</div>
          <img src={day3[2]} alt="hello" className='wIcon' />
          <span className="temp">{day3[1]}  <span className="cTemp">c</span></span>
        </div>
        <div className="days">
          <div className="dates">{day4[0]}</div>
          <img src={day4[2]} alt="hello" className='wIcon' />
          <span className="temp">{day4[1]}  <span className="cTemp">c</span></span>
        </div>
        <div className="days">
          <div className="dates">{day5[0]}</div>
          <img src={day5[2]} alt="hello" className='wIcon' />
          <span className="temp">{day5[1]}  <span className="cTemp">c</span></span>
        </div>

      </div>
    </>

  )
}
