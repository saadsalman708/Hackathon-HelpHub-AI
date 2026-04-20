"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import PageHero from "@/components/layout/PageHero"
import SectionHead from "@/components/layout/SectionHead"
import Button from "@/components/ui/Button"
import DashboardStats from "@/components/dashboard/DashboardStats"
import DashboardRequests from "@/components/dashboard/DashboardRequests"
import DashboardAI from "@/components/dashboard/DashboardAI"
import DashboardNotes from "@/components/dashboard/DashboardNotes"
import { useAuth } from "@/lib/hooks/useAuth"
import { useRequests } from "@/lib/hooks/useRequests"
import { useNotifications } from "@/lib/hooks/useNotifications"

export default function DashboardPage() {
  const router = useRouter()
  const { currentUser, loading: authLoading } = useAuth()
  const { requests } = useRequests()
  const { notifications } = useNotifications()

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
        eyebrow="Dashboard"
        title={
          <>
            Welcome back, <span data-dashboard-name>{currentUser.name}</span>.
          </>
        }
        subtitle="Your command center for requests, AI insights, helper momentum, and live community activity."
      />
      
      <DashboardStats user={currentUser} requests={requests} />
      
      <section className="dashboard-grid section">
        <div className="stack">
          <SectionHead
            kicker="Recent requests"
            title="What the community needs right now"
            action={
              <Button variant="secondary" href="/explore">
                Go to feed
              </Button>
            }
          />
          <DashboardRequests requests={requests.slice(0, 3)} />
        </div>
        
        <div className="stack">
          <DashboardAI user={currentUser} requests={requests} />
          <DashboardNotes notifications={userNotes.slice(0, 3)} />
        </div>
      </section>
    </main>
  )
}