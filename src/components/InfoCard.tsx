interface InfoCardProps {
  icon: JSX.Element
  title: string
  value: number
  suffix: string
}

export function InfoCard({ icon, title, value, suffix }: InfoCardProps) {
  return (
    <div className="info-card">
      <div className="info-card__icon">{icon}</div>
      <div className="info-card__data">
        <div className="info-card__title">{title}</div>
        <div className="info-card__value">
          {value} <span className="info-card__value--suffix">{suffix}</span>
        </div>
      </div>
    </div>
  )
}
