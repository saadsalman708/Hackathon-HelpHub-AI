import type { ReactNode } from "react"

interface FilterFieldProps {
  label: string
  children: ReactNode
}

export default function FilterField({ label, children }: FilterFieldProps) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
    </div>
  )
}