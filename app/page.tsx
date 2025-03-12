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

  const errorData: fetchData = {
    name: 'Ошибка. Введите корректное название города.',
    main: {temp: 273.15, feels_like: 273.15, humidity: 0},
    weather: [{main: '0'}],
    wind: {speed: 0}
  }

  const [data, setData] = useState<fetchData | null>(null)
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=84fc796dc7a8c4a7ebeddc083a2b03db&lang=ru`

  const searchLocation = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      axios.get<fetchData>(url).then((response) => {
        setData(response.data)
        console.log(response.data)
        setLocation('')
      }).catch((err) => {
        setData(errorData)
        setLocation('')
        console.log(err, err.response)
      })
    }
  }
  
  const weatherIcons: { [key: string]: string} = {
    Clear: "/clear.svg",
    Clouds: "/clouds.svg",
    Rain: '/rain.svg'
  }

  return (
    <main className={styles.main}>
      <h1>Weather App</h1>
      <p>Made by vavilovmy <a href="https://github.com/vavilovmy" target="_blank">github  </a><a href="https://t.me/vavilovmy" target="_blank"> telegram</a></p>
      <input 
        type="text" 
        placeholder="Искать город..." 
        value={location}
        onKeyDown={searchLocation}
        onChange={event => setLocation(event.target.value)}
        >
      </input>
      <div className={styles.main__weather}>
      <div className={styles.main__weather__location}>
        <p>{data?.name}</p><img src="/location.svg"/>
      </div>
      <div className={styles.main__weather__temp}>
        {data?.main ? <h2>{Math.round(data?.main.temp - 273.15)}°C</h2> : null}
        
        {data?.weather ? <img 
          src={weatherIcons[data.weather[0].main] || "/default.svg"} 
          alt={data.weather[0].main} 
          width="96" 
          height="96"
          /> : null}
      
      </div>
      <div className={styles.main__weather__info}>
      
      <div className="feelslike">
        {data?.main ? <p>Ощущается как: <br></br>{Math.round(data?.main.feels_like - 273.15)}°C</p> : null}
      </div>
      <div className="humidity">
        {data?.main ? <p>Влажность: <br></br>{data?.main.humidity}%</p> : null}
      </div>
      <div className="wind">
        {data?.wind ? <p>Скорость ветра: <br></br>{data.wind.speed} м/с</p> : null}
      </div>
      </div>
      </div>
    </main>
  );
}
