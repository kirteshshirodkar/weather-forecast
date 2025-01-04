import React, { useEffect, useRef, useState } from "react";
import search from "../Assets/search.png";
import humidity from "../Assets/humidity.png";
import wind from "../Assets/wind.png";
export default function WeatherApp() {
  const inputRef = useRef();

  const [weatherData, setweatherData] = useState(false);

  const searchCity = async (city) => {
    if (city === "") {
      alert("enter city name");
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
      }
      console.log(data);
      const icon = ` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      setweatherData({
        humidityValue: data.main.humidity,
        windValue: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    searchCity("panjim");
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#2E5077] to-[#4DA1A9] p-[40px] rounded-[20px] max-sm:w-full max-sm:h-full">
      <div className="flex  justify-center items-center flex-row space-x-3  ">
        <input
          ref={inputRef}
          type="text"
          placeholder="search"
          className="h-[50px] max-sm:w-36 border-none outline-none rounded-[40px] text-xl pl-5"
        />
        <img
          onClick={() => searchCity(inputRef.current.value)}
          src={search}
          alt="search"
          className="w-[50px] p-4 rounded-full cursor-pointer bg-[#ffffff]"
        />
      </div>
      <div className="flex items-center justify-center flex-col max-sm:mt-24">
        <img src={weatherData.icon} alt="icon" className="w-28 h-28" />
        <p className="text-[#fff] text-[80px] leading-[60px] ">
          {weatherData.temperature} ° C
        </p>
        <p className="text-[#fff] text-[40px]">{weatherData.location}</p>
      </div>
      <div className="flex flex-row space-x-[85px] mt-8 max-sm:mt-28 text-[#fff]">
        <div className="flex flex-row space-x-3">
          <img src={humidity} className="w-[26px] h-[26px] mt-2" alt="" />
          <div>
            <p>{weatherData.humidityValue} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="flex flex-row space-x-3">
          <img src={wind} className="w-[28px] h-[28px] mt-2" alt="" />
          <div>
            <p>{weatherData.windValue} Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
