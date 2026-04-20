"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavLink {
  href: string
  label: string
}

interface NavLinksProps {
  links: NavLink[]
}

export default function NavLinks({ links }: NavLinksProps) {
  const pathname = usePathname()

  return (
    <nav className="nav-links">
      {links.map((link) => {
        const isActive = pathname === link.href
        return (
          <Link
            key={link.href}
            href={link.href}
            className={isActive ? "active" : ""}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}