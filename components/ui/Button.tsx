import type { ReactNode, ButtonHTMLAttributes } from "react"
import Link from "next/link"

type ButtonVariant = "primary" | "secondary"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  href?: string
  children: ReactNode
}

export default function Button({
  variant = "primary",
  href,
  children,
  className: extraClass = "",
  ...props
}: ButtonProps) {
  const className = `btn btn-${variant} ${extraClass}`.trim()
  
  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }
  
  return (
    <button className={className} {...props}>
      {children}
    </button>
  )
}