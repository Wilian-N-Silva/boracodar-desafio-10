import { useState } from "react"

import backgroundImage from "/background.png"
import locationIcon from "./assets/icons/pin.svg"
import sunTimeIcon from "./assets/icons/time.svg"
import leafIcon from "./assets/icons/leaf.svg"

import { InfoCard } from "./components/InfoCard"
import { SunTracker } from "./components/Tracker"

import { DataHumidity } from "./components/animatedIcons/DataHumidity"
import { DataWind } from "./components/animatedIcons/DataWind"
import { DataRain } from "./components/animatedIcons/DataRain"
import { CurrentCloudly } from "./components/animatedIcons/CurrentCloudly"
import { ForecastItem } from "./components/ForecastItem"
import { ForecastItemProps } from "./global/Types"

const airQualityData = {
  value: 21,
  status: "Boa",
  indexes: {
    "PM2.5": 12.9,
    PM10: 12.9,
    "sO₂": 2.1,
    "NO₂": 1.4,
    "O₃": 21.2,
    CO: 0.7,
  },
}

const forecastData: ForecastItemProps[] = [
  {
    alias: "Amanhã",
    id: 802,
    min: 16,
    max: 21,
  },
  {
    alias: "Sexta-feira",
    id: 800,
    min: 20,
    max: 28,
  },
  {
    alias: "Sábado",
    id: 520,
    min: 21,
    max: 25,
  },
  {
    alias: "Domingo",
    id: 200,
    min: 14,
    max: 20,
  },
  {
    alias: "Segunda-feira",
    id: 801,
    min: 24,
    max: 18,
  },
]

function Index() {
  // const [sunrise, setSunrise] = useState(new Date(1678784905 * 1000)) //06:08:25
  // const [sunset, setSunset] = useState(new Date(1678829088 * 1000)) //18:24:48
  // const [dateNow, setDateNow] = useState(new Date())

  const [sunrise, setSunrise] = useState(new Date("2023-03-14T06:12:00")) //06:08:25
  const [sunset, setSunset] = useState(new Date("2023-03-14T18:52:00")) //18:24:48
  const [dateNow, setDateNow] = useState(new Date("2023-03-14T16:00:00"))
  const [airQuality, setAirQuality] = useState(airQualityData)

  return (
    <>
      <div className="background">
        <img src={backgroundImage} alt="" />
      </div>
      <div className="container">
        <div className="current-weather">
          <div className="weather-icon">
            <CurrentCloudly />
          </div>
          <div className="current-weather__location">
            <div className="current-weather__location-pin">
              <img src={locationIcon} alt="" />
            </div>
            Rio do Sul, SC
          </div>
          <div className="current-weather__data">
            <div className="current-weather__temperature">18</div>
            <div className="current-weather__range">
              <span className="current-weather__max">22°</span>&nbsp;
              <span className="current-weather__min">16°</span>
            </div>
          </div>
          <div className="current-weather__info">
            <InfoCard
              title="Vento"
              value={17}
              suffix="km/h"
              icon={<DataWind />}
            />
            <InfoCard
              title="Umidade"
              value={31}
              suffix="%"
              icon={<DataHumidity />}
            />
            <InfoCard title="Chuva" value={10} suffix="%" icon={<DataRain />} />
          </div>
        </div>
        <div className="weather-info">
          <div className="weather-info__card">
            <div className="weather-info__title">
              <div className="weather-info__title-icon">
                <img src={leafIcon} alt="" />
              </div>
              Qualidade do ar
            </div>
            <div className="air-quality">
              <div className="air-quality__summary">
                <span className="air-quality__status">{airQuality.status}</span>
                <span className="air-quality__value">{airQuality.value}</span>
              </div>
              <ul className="air-quality__index">
                {Object.entries(airQuality.indexes).map(([key, value]) => {
                  return (
                    <li key={key}>
                      <span className="air-quality__index-value">{value}</span>
                      <span className="air-quality__index-title">{key}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="weather-info__card">
            <div className="weather-info__title">
              <div className="weather-info__title-icon">
                <img src={sunTimeIcon} alt="" />
              </div>
              Horário do sol
            </div>
            <SunTracker sunrise={sunrise} sunset={sunset} dateNow={dateNow} />
          </div>
          <div className="weather-info__card weather-info__card--forecast">
            <ul className="forecast">
              {forecastData.map((forecast, index) => {
                return (
                  <ForecastItem
                    key={index}
                    id={forecast.id}
                    alias={forecast.alias}
                    min={forecast.min}
                    max={forecast.max}
                  />
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
