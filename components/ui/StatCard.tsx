import Eyebrow from "./Eyebrow"

interface StatCardProps {
  label: string
  value: string | number
  description: string
}

export default function StatCard({ label, value, description }: StatCardProps) {
  return (
    <div className="stat-card">
      <Eyebrow>{label}</Eyebrow>
      <div className="stat-value">{value}</div>
      <p>{description}</p>
    </div>
  )
}