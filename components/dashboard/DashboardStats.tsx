import StatCard from "@/components/ui/StatCard"
import type { User, Request } from "@/lib/types"

interface DashboardStatsProps {
  user: User | null
  requests: Request[]
}

export default function DashboardStats({ user, requests }: DashboardStatsProps) {
  const helpingCount = requests.filter((r) => 
    user && r.helperIds.includes(user.id)
  ).length
  
  const openCount = requests.filter((r) => r.status === "Open").length
  const insightsCount = requests.filter((r) => r.category === "Career").length

  return (
    <section className="mini-grid section">
      <StatCard
        label="Trust score"
        value={`${user?.trustScore || 0}%`}
        description="Driven by solved requests and consistent support."
      />
      <StatCard
        label="Helping"
        value={helpingCount}
        description="Requests where you are currently listed as a helper."
      />
      <StatCard
        label="Open requests"
        value={openCount}
        description="Community requests currently active across the feed."
      />
      <StatCard
        label="AI pulse"
        value={`${insightsCount} trends`}
        description="Trend count detected in the latest request activity."
      />
    </section>
  )
}