import type { ReactNode } from "react"

type TagVariant = "default" | "urgent" | "success"

interface TagProps {
  children: ReactNode
  variant?: TagVariant
}

export default function Tag({ children, variant = "default" }: TagProps) {
  const className =
    variant === "urgent"
      ? "tag urgent"
      : variant === "success"
      ? "tag success"
      : "tag"

  return <span className={className}>{children}</span>
}