"use client"
import Brand from "./Brand"
import NavLinks from "./NavLinks"
import NavActions from "./NavActions"
import { useAppStore } from "@/lib/store/useAppStore"

const PUBLIC_LINKS = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/ai-center", label: "AI Center" },
]

const PRIVATE_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/explore", label: "Explore" },
  { href: "/create-request", label: "Create Request" },
  { href: "/messages", label: "Messages" },
  { href: "/profile", label: "Profile" },
]

export default function Topbar() {
  const { currentUser } = useAppStore()
  const isLoggedIn = !!currentUser
  const links = isLoggedIn ? PRIVATE_LINKS : PUBLIC_LINKS

  return (
    <header className="topbar">
      <div className="container nav">
        <Brand />
        <NavLinks links={links} />
        <NavActions isLoggedIn={isLoggedIn} />
      </div>
    </header>
  )
}