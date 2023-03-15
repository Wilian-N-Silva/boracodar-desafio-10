interface SunTrackerProp {
  sunrise: Date
  sunset: Date
  dateNow: Date
}
export function SunTracker({ sunrise, sunset, dateNow }: SunTrackerProp) {
  const sqrBox = 36
  const radius = sqrBox / 2
  const diameter = radius * 2
  const xPos = sqrBox / 2
  const yPos = (sqrBox - diameter) / 2

  const calculateTimeBetweenNowAndSunrise = (now: Date, sunrise: Date) => {
    let difference = 0
    if (now > sunrise) {
      difference = (now.getTime() / 1000 - sunrise.getTime() / 1000) / 60
    }

    return difference
  }

  const timeBetweenSunriseAndSunset =
    (sunset.getTime() / 1000 - sunrise.getTime() / 1000) / 60

  const timeBetweenSunriseAndNow = calculateTimeBetweenNowAndSunrise(
    dateNow,
    sunrise
  )

  const differenceInPercentage =
    (timeBetweenSunriseAndNow / timeBetweenSunriseAndSunset) * 100

  const adjacent =
    2 * (50 - (differenceInPercentage <= 100 ? differenceInPercentage : 100))

  const radians = Math.acos(adjacent / 100)
  const degrees = radians * (180 / Math.PI)
  const timeFormat = (dateTime: Date) => {
    const time = new Intl.DateTimeFormat("pt-BR", {
      hour: "numeric",
      minute: "numeric",
    }).format(dateTime)

    return time
  }

  const svg = (
    <svg
      viewBox={`0 0 ${sqrBox} ${sqrBox / 2}`}
      style={{ overflow: "visible" }}
    >
      <linearGradient
        id="donutGradient"
        gradientUnits="userSpaceOnUse"
        gradientTransform="rotate(80)"
      >
        <stop offset="0%" stopColor="rgba(251, 219, 96, 0.2)"></stop>
        <stop offset="101%" stopColor="rgba(251, 219, 96, 0)"></stop>
      </linearGradient>
      <mask id="myMask">
        <rect
          x="0"
          y="0"
          width={(sqrBox * differenceInPercentage) / 100}
          height={sqrBox / 2}
          fill="white"
        />
      </mask>
      <path
        d={`M${yPos} ${xPos} a${radius} ${radius} 0 0 1 ${diameter} 0`}
        fill="url(#donutGradient)"
        mask="url(#myMask)"
      />
      <path
        d={`M${yPos} ${xPos} a${radius} ${radius} 0 0 1 ${diameter} 0`}
        stroke="#F6C833"
        strokeWidth=".5"
        fill="none"
        strokeDasharray=".2 2"
        strokeDashoffset="21.3"
      />

      <circle
        cx={yPos}
        cy={xPos}
        r="1"
        style={{
          transform: `rotate(${degrees}deg)`,
          transformOrigin: `${xPos}px ${xPos}px`,
        }}
        fill="#F6C833"
      />
      <line
        opacity="0.4"
        x1="-0.5"
        y1="18"
        x2="36.5"
        y2="18"
        strokeWidth={0.2}
        stroke="#f6c833"
      />
      <line x1="0" y1="17" x2="0" y2="19" strokeWidth={0.4} stroke="#f6c833" />
      <line
        x1="36"
        y1="17"
        x2="36"
        y2="19"
        strokeWidth={0.4}
        stroke="#f6c833"
      />
    </svg>
  )
  return (
    <div className="sun-tracker">
      <div className="sun-tracker__diagram">
        {svg}
        <span>{timeFormat(dateNow)}</span>
      </div>
      <div className="sun-tracker__time">
        <span>{timeFormat(sunrise)}</span>
        <span>{timeFormat(sunset)}</span>
      </div>
    </div>
  )
}
