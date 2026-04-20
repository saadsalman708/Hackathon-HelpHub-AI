import ProgressBar from "@/components/ui/ProgressBar"
import type { User } from "@/lib/types"

interface BadgeShowcaseProps {
  users: User[]
}

export default function BadgeShowcase({ users }: BadgeShowcaseProps) {
  // Only show top 3 users in showcase
  const topUsers = users.slice(0, 3)

  return (
    <div className="stack">
      {topUsers.map((user) => (
        <div key={user.id} className="badge-card">
          <h3>{user.name}</h3>
          <p>{user.badges.join(" • ")}</p>
          <ProgressBar percentage={user.trustScore} />
        </div>
      ))}
    </div>
  )
}