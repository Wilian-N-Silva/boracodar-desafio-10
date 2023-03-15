import { ForecastItemProps } from "../global/Types"

import stormIcon from "../assets/icons/weather_storm.svg"
import rainIcon from "../assets/icons/weather_rain.svg"
import sunnyIcon from "../assets/icons/weather_sunny.svg"
import partlyCloudyIcon from "../assets/icons/weather_partly_cloudy.svg"
import cloudyIcon from "../assets/icons/weather_cloudy.svg"

interface iconsInterface {
  [key: number]: string
}

export function ForecastItem({ alias, id, min, max }: ForecastItemProps) {
  const icons: iconsInterface = {
    200: stormIcon,
    520: rainIcon,
    800: sunnyIcon,
    801: partlyCloudyIcon,
    802: cloudyIcon,
  }

  return (
    <li className="forecast__item">
      <div className="forecast__day">{alias}</div>
      <div className="forecast__icon">
        <img src={icons[id]} alt="" />
      </div>
      <div className="forecast__temperatures">  
        {max}° <span className="forecast__min">{min}°</span>
      </div>
    </li>
  )
}
