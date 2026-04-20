import StatCard from "@/components/ui/StatCard"
import { getTopCategory } from "@/lib/utils/getTopCategory"
import type { Request, User } from "@/lib/types"

interface AiSummaryGridProps {
  requests: Request[]
  users: User[]
}

export default function AiSummaryGrid({ requests, users }: AiSummaryGridProps) {
  const topCategory = getTopCategory(requests)
  
  const highUrgencyCount = requests.filter((r) => 
    ["High", "Critical"].includes(r.urgency)
  ).length
  
  const trustedHelpersCount = users.filter((u) => 
    u.trustScore >= 85
  ).length

  return (
    <div className="mini-grid">
      <StatCard
        label="Trend pulse"
        value={topCategory}
        description="Most common support area based on active community requests."
      />
      <StatCard
        label="Urgency watch"
        value={highUrgencyCount}
        description="Requests currently flagged high priority by the urgency detector."
      />
      <StatCard
        label="Mentor pool"
        value={trustedHelpersCount}
        description="Trusted helpers with strong response history and contribution signals."
      />
    </div>
  )
}