import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";

function Weather() {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const [visible, setVisible] = useState(false);
  const [info, setInfo] = useState("");

  const allIcons = {
    "01d": "sun.png",
    "01n": "starry-night.png",
    "02d": "cloudy.png",
    "02n": "cloudy-night.png",
    "03d": "clouds.png",
    "03n": "clouds.png",
    "04d": "cloud.png",
    "04n": "cloud.png",
    "09d": "drizzle.png",
    "09n": "drizzle.png",
    "10d": "rain.png",
    "10n": "rain.png",
    "11d": "storm.png",
    "11n": "storm.png",
    "13d": "snowy.png",
    "13n": "snowy.png",
    "50d": "mist.png",
    "50n": "mist.png",
  };
  const playSound = (src) => {
    const audio = new Audio(src);
    audio.play();
  };
  const search = async (city) => {
    playSound("/click.mp3");
    if (city === "") {
      setWeatherData(false);
      setVisible(true);
      setInfo("City name not entered! Please enter valid ciy name :}");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      const toTime = (secs) => {
        const date = new Date(secs * 1000);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? "pm" : "am";
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formattedHours}:${formattedMinutes} ${period}`;
      };
      const icon = allIcons[data.weather[0].icon] || "rainbow.jpeg";

      setWeatherData({
        humidity: data.main.humidity,
        tempFeelsLike: Math.floor(data.main.feels_like),
        temp: Math.floor(data.main.temp),
        //   tempMax: Math.floor(data.main.temp_max),
        //   tempMin: Math.floor(data.main.temp_min),
        //   pressure: data.main.pressure,
        sunrise: toTime(data.sys.sunrise),
        sunset: toTime(data.sys.sunset),
        description: data.weather[0].description,
        windSpeed: Math.floor(data.wind.speed),
        name: data.name,
        currentTime: toTime(data.dt),
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      setInfo("Error occured while fetching weather data :( ");
      setVisible(true);
    }
  };

  return (
    <div className="weather">
      <img src="weather.png" className="weatherImage"></img>
      <div className="overlayContent">
        <div className="searchBar">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter city name"
            onClick={() => playSound("/click.mp3")}
          ></input>
          <div
            className="searchIcon"
            onClick={() => search(inputRef.current.value)}
          >
            <img src="search.jpeg" alt=""></img>
          </div>
        </div>

        {weatherData ? (
          <>
            <img
              src={weatherData.icon}
              className="weatherIcon"
              alt="Weather Icon"
            />
            <p className="description">{weatherData.description}</p>
            <p className="temperature">
              {weatherData.temp}
              <img src="celsius.png" alt="Celsius" />
            </p>
            <p className="temperatureFeelsLike">
              {weatherData.name} Feels Like {weatherData.tempFeelsLike}°C
            </p>

            <p className="currentTime">
              Current Time: {weatherData.currentTime}
            </p>

            <div className="weatherData">
              <div className="col">
                <img src="sunrise.png" alt="Sunrise" />
                <div>
                  <p>{weatherData.sunrise}</p>
                  <span>Sunrise</span>
                </div>
              </div>
              <div className="col">
                <img src="sunset.png" alt="Sunset" />
                <div>
                  <p>{weatherData.sunset}</p>
                  <span>Sunset</span>
                </div>
              </div>
            </div>

            <div className="weatherData">
              <div className="col">
                <img src="humidity.png" alt="Humidity" />
                <div>
                  <p>{weatherData.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>

              <div className="col">
                <img src="wind.png" alt="Wind" />
                <div>
                  <p>{weatherData.windSpeed} km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {visible && (
          <div className="errorBackdrop">
            <div className="infoDisplay">
              <img
                src="cross.png"
                className="closeButton"
                alt="Close"
                onClick={() => setVisible(false)}
              />
              <img
                src="errorInfo.png"
                className="errorImage"
                alt="Error Info"
              />
              <div className="infoContent">
                <img src="errorGif.gif" className="errorGif" />
                <p className="infoText">{info}</p>
              </div>
            </div>
          </div>
        )}

        <div className="socials">
          <a
            href="https://github.com/TishTisha"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="github.png" alt="GitHub" />
          </a>
          <a
            href="https://www.linkedin.com/in/tisha-wadhva1903/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="linkedin.png" alt="LinkedIn" />
          </a>
        </div>


        <img
          src="made-with-love.png"
          alt="Made with love"
          className="madeWithLove"
        />
      </div>
    </div>
  );
}

export default Weather;
