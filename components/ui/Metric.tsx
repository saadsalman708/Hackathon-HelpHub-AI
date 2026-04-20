import type { ReactNode } from "react"

interface MetricProps {
  label: string
  value: ReactNode
}

export default function Metric({ label, value }: MetricProps) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}