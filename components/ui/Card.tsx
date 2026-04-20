import type { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className = "" }: CardProps) {
  return <div className={`panel ${className}`.trim()}>{children}</div>
}