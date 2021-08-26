import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import Spinner from "../components/Spinner";
import Hint from "../components/Hint";

export default function Home() {
  const [zipcode, setZipcode] = useState("");
  const [temperatureF, setTemperatureF] = useState("");
  const [temperatureC, setTemperatureC] = useState("");
  const [weatherDescription, setWeatherDescription] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeedMph, setWindSpeedMph] = useState("");
  const [windDirection, setWindDirection] = useState("");
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countryOption, setCountryOption] = useState("us");
  const [icon, setIcon] = useState("");
  const [showTempInC, setShowTempInC] = useState(false);
  const [showWeatherInfo, setShowWeatherInfo] = useState(false);

  const handleChange = (evt) => {
    setCountryOption(evt.target.value);
  };

  const degreesToCardinalDirection = (d) => {
    // keep within the range: 0 <= d < 360
    d = d % 360;

    if (11.25 <= d && d < 33.75) {
      return "NNE";
    } else if (33.75 <= d && d < 56.25) {
      return "NE";
    } else if (56.25 <= d && d < 78.75) {
      return "ENE";
    } else if (78.75 <= d && d < 101.25) {
      return "E";
    } else if (101.25 <= d && d < 123.75) {
      return "ESE";
    } else if (123.75 <= d && d < 146.25) {
      return "SE";
    } else if (146.25 <= d && d < 168.75) {
      return "SSE";
    } else if (168.75 <= d && d < 191.25) {
      return "S";
    } else if (191.25 <= d && d < 213.75) {
      return "SSW";
    } else if (213.75 <= d && d < 236.25) {
      return "SW";
    } else if (236.25 <= d && d < 258.75) {
      return "WSW";
    } else if (258.75 <= d && d < 281.25) {
      return "W";
    } else if (281.25 <= d && d < 303.75) {
      return "WNW";
    } else if (303.75 <= d && d < 326.25) {
      return "NW";
    } else if (326.25 <= d && d < 348.75) {
      return "NNW";
    } else {
      return "N";
    }
  };

  const handleSubmit = async (evt) => {
    setIsLoading(true);
    evt.preventDefault();
    if (
      !zipcode !== "" &&
      ((countryOption === "us" && /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode)) ||
        (countryOption === "mx" && /(\d{5})/.test(zipcode)))
    ) {
      try {
        const data = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},${countryOption}&appid=${process.env.NEXT_APP_WEATHER_API_KEY}`
        );
        if (data.status === 200) {
          setTemperatureF(((data.data.main.temp * 9) / 5 - 459.67).toFixed(0));
          setTemperatureC((data.data.main.temp - 273.15).toFixed(0));
          setHumidity(data.data.main.humidity);
          setWindSpeedMph((data.data.wind.speed * 2.2369363).toFixed(0));
          setWindDirection(data.data.wind.deg);
          setCityName(data.data.name);
          setWeatherDescription(data.data.weather[0].description);
          setCountryName(data.data.sys.country);
          setIcon(data.data.weather[0].icon);
          setShowWeatherInfo(true);
        }
      } catch (error) {
        alert(error);
        setShowWeatherInfo(false);
      }
    } else {
      setShowWeatherInfo(false);
      alert(
        "Invalid zip code. Please try again... zip code: " +
          (zipcode === "" ? "blank" : zipcode)
      );
    }
    setIsLoading(false);
    setZipcode("");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Head>
        <title>Totaltek - Technical Exercise</title>
        <meta
          name="description"
          content="Technical exercise for job interview"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main-container">
        <form onSubmit={handleSubmit}>
          <label>
            Zipcode: {"  "}
            <input
              className="input-zipcode"
              placeholder="Enter zip code here..."
              onChange={(e) => setZipcode(e.target.value)}
            />
          </label>
          <label>
            Select Country: {"  "}
            <select value={countryOption} onChange={handleChange}>
              <option value="us">USA</option>
              <option value="mx">Mexico</option>
            </select>
          </label>
          <input className="form-submit" type="submit" value="Submit" />
        </form>
        <Hint />
        <div className="weather-container">
          {!showWeatherInfo ? (
            <div className="center">
              <p>No data available</p>
            </div>
          ) : (
            <>
              <p className="font-bold text-2xl mt-5">
                {cityName}, {countryName}
              </p>
              <Image
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                width="150"
                height="150"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
                alt="Image status of the current weather"
              />
              <p className="font-semibold mb-3">{weatherDescription}</p>
              <div className="inline-block text-4xl mb-5">
                {showTempInC ? (
                  <span>{temperatureC}</span>
                ) : (
                  <span>{temperatureF}</span>
                )}{" "}
                <button
                  className={
                    !showTempInC ? "text-green-400 font-semibold underline" : ""
                  }
                  onClick={() => setShowTempInC(false)}
                >
                  ºF
                </button>
                /
                <button
                  className={
                    showTempInC ? "text-green-400 font-semibold underline" : ""
                  }
                  onClick={() => setShowTempInC(true)}
                >
                  ºC
                </button>
              </div>
              <p className="font-extralight">Humidity: {humidity}</p>
              <p className="font-extralight">
                Wind: {windSpeedMph} mph from the{" "}
                {degreesToCardinalDirection(windDirection)}
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
