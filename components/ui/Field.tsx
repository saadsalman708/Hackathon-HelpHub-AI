import type { ReactNode } from "react"

interface FieldProps {
  label: string
  htmlFor?: string
  fullWidth?: boolean
  children: ReactNode
}

export default function Field({ label, htmlFor, fullWidth, children }: FieldProps) {
  const className = fullWidth ? "field-full" : "field"
  return (
    <div className={className}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  )
}