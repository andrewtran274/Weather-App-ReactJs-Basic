import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WeatherApp.css";

export const WeatherApp = () => {
  const [input, setInput] = useState("");
  const [city, setCity] = useState("London");
  const [weatherData, setWeatherData] = useState({});
  const api_key = "4c5d98c634df45e25717f1b94ad4194c"; // Thay YOUR_API_KEY bằng API Key của bạn
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const handleSubmit = () => {
    setCity(input);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      setWeatherData(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Axios Error:", error.message);
        console.log("Status Code:", error.response?.status);
      } else {
        console.error("Other Error:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [city]); // Fetch lại dữ liệu khi city thay đổi

  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="search-icon" onClick={() => handleSubmit()}>
          <i className="bx bx-search"></i>
        </div>
      </div>
      <div className="img">
        {weatherData.weather && (
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt="img"
            className="weather-img"
          />
        )}
      </div>
      <div className="temperature text">
        {weatherData.main && `${weatherData.main.temp}°C`}
      </div>
      <div className="location text">{weatherData.name}</div>
      <div className="element">
        <div className="humidity flex">
          <i className="bx bx-cloud-light-rain icon"></i>
          <div className="humidity-info">
            {weatherData.main && `${weatherData.main.humidity}%`}
          </div>
        </div>

        <div className="wind flex">
          <i className="bx bx-wind icon"></i>
          <div className="wind-info">
            {weatherData.wind && `${weatherData.wind.speed} m/s`}
          </div>
        </div>
      </div>
    </div>
  );
};
