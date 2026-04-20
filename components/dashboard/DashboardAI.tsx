import Card from "@/components/ui/Card"
import Metric from "@/components/ui/Metric"
import { getTopCategory } from "@/lib/utils/getTopCategory"
import { deriveSkills } from "@/lib/utils/deriveSkills"
import type { User, Request } from "@/lib/types"

interface DashboardAIProps {
  user: User | null
  requests: Request[]
}

export default function DashboardAI({ user, requests }: DashboardAIProps) {
  const topCategory = getTopCategory(requests)
  const strongestDriver = user?.badges[0] || "None"
  
  const skills = deriveSkills(user?.interests, user?.skills)
  const mentorSkills = skills.canHelpWith.join(", ")
  
  const activeRequests = requests.filter((r) => 
    user && r.requesterId === user.id
  ).length

  return (
    <Card>
      <p className="section-kicker">AI insights</p>
      <h3>Suggested actions for you</h3>
      <div className="stack">
        <Metric label="Most requested category" value={topCategory} />
        <Metric label="Your strongest trust driver" value={strongestDriver} />
        <Metric label="AI says you can mentor in" value={mentorSkills} />
        <Metric label="Your active requests" value={activeRequests} />
      </div>
    </Card>
  )
}