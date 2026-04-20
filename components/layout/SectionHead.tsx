import type { ReactNode } from "react"

interface SectionHeadProps {
  kicker: string
  title: string
  action?: ReactNode
}

export default function SectionHead({ kicker, title, action }: SectionHeadProps) {
  return (
    <div className="section-head">
      <div>
        <p className="section-kicker">{kicker}</p>
        <h2>{title}</h2>
      </div>
      {action && action}
    </div>
  )
}