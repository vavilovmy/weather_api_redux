"use client"

import React from "react";
import { useState } from "react";
import axios, { Axios } from "axios";
import styles from "../styles/Main.module.css"

export default function Home() {
  type fetchData = {
    name: string;
    main: {temp: number; feels_like:number, humidity: number};
    weather: [{main: string}];
    wind: {speed: number}
  }

  const [data, setData] = useState<fetchData | null>(null)
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=84fc796dc7a8c4a7ebeddc083a2b03db`

  const searchLocation = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      axios.get<fetchData>(url).then((response) => {
        setData(response.data)
        console.log(response.data)
        setLocation('')
      })
    }
  }

  return (
    <main className={styles.main}>
      <h1>Weather App</h1>
      <input 
        type="text" 
        placeholder="Искать город..." 
        value={location}
        onKeyDown={searchLocation}
        onChange={event => setLocation(event.target.value)}
        >
      </input>
      
      <div className="location">
        <p>{data?.name}</p>
      </div>
      <div className="temp">
        {data?.main ? <p>{Math.round(data?.main.temp - 273.15)}°C</p> : null}
      </div>
      <div className="description">
        {data?.weather ? <p>{data?.weather[0].main}</p> : null}
      </div>
      <div className="feelslike">
        {data?.main ? <p>{Math.round(data?.main.feels_like - 273.15)}</p> : null}
        <p>Ощущается как</p>
      </div>
      <div className="humidity">
        {data?.main ? <p>{data?.main.humidity}%</p> : null}
        <p>Влажность</p>
      </div>
      <div className="wind">
        {data?.wind ? <p>{data.wind.speed}</p> : null}
        <p>Скорость ветра</p>
      </div>
    </main>
  );
}
