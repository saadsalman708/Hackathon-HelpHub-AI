import type { ReactNode } from "react"

type AvatarVariant = "default" | "teal" | "dark"

interface AvatarProps {
  children: ReactNode
  variant?: AvatarVariant
}

export default function Avatar({ children, variant = "default" }: AvatarProps) {
  const className = `avatar ${variant !== "default" ? variant : ""}`.trim()
  return <div className={className}>{children}</div>
}