import StatCard from "@/components/ui/StatCard"

interface HeroStatsProps {
  memberCount: number
  requestCount: number
  solvedCount: number
}

export default function HeroStats({ memberCount, requestCount, solvedCount }: HeroStatsProps) {
  return (
    <div className="stats-grid">
      <StatCard
        label="Members"
        value={`${memberCount}+`}
        description="Students, mentors, and helpers in the loop."
      />
      <StatCard
        label="Requests"
        value={`${requestCount}+`}
        description="Support posts shared across learning journeys."
      />
      <StatCard
        label="Solved"
        value={`${solvedCount}+`}
        description="Problems resolved through fast community action."
      />
    </div>
  )
}