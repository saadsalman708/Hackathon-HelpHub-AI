import type { ReactNode } from "react"
import Topbar from "./Topbar"
import Footer from "./Footer"
import Toast from "@/components/ui/Toast"

interface SiteShellProps {
  children: ReactNode
}

export default function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="site-shell">
      <Topbar />
      {children}
      <Footer />
      <Toast />
    </div>
  )
}