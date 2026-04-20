"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import PageHero from "@/components/layout/PageHero"
import Card from "@/components/ui/Card"
import NotifList from "@/components/notifications/NotifList"
import { useNotifications } from "@/lib/hooks/useNotifications"
import { useAuth } from "@/lib/hooks/useAuth"

export default function NotificationsPage() {
  const router = useRouter()
  const { currentUser, loading: authLoading } = useAuth()
  const { notifications, markRead } = useNotifications()

  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push("/auth")
    }
  }, [currentUser, authLoading, router])

  if (!currentUser) return null

  // Filter notifications for current user
  const userNotes = notifications.filter((n) => n.userId === currentUser.id)

  return (
    <main className="container">
      <PageHero
        eyebrow="Notifications"
        title="Stay updated on requests, helpers, and trust signals."
        subtitle="Track new matches, solved items, AI insights, and reputation changes in one place."
      />

      <section className="section">
        <Card>
          <p className="section-kicker">Live updates</p>
          <h2>Notification feed</h2>
          <NotifList notifications={userNotes} onMarkRead={markRead} />
        </Card>
      </section>
    </main>
  )
}