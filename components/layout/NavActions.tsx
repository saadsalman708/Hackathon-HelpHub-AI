import Link from "next/link"
import Badge from "@/components/ui/Badge"
import Button from "@/components/ui/Button"

interface NavActionsProps {
  isLoggedIn: boolean
}

export default function NavActions({ isLoggedIn }: NavActionsProps) {
  if (isLoggedIn) {
    return (
      <div className="nav-actions">
        <Link href="/notifications" className="pill">
          Notifications
        </Link>
        <Button variant="primary" href="/ai-center">
          Open AI Center
        </Button>
      </div>
    )
  }

  return (
    <div className="nav-actions">
      <Link href="/notifications" className="pill">
        Live community signals
      </Link>
      <Button variant="primary" href="/auth">
        Join the platform
      </Button>
    </div>
  )
}