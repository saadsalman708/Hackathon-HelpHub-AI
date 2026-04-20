"use client"
import PageHero from "@/components/layout/PageHero"
import Card from "@/components/ui/Card"
import RankList from "@/components/leaderboard/RankList"
import BadgeShowcase from "@/components/leaderboard/BadgeShowcase"
import { useLeaderboard } from "@/lib/hooks/useLeaderboard"

export default function LeaderboardPage() {
  const { users } = useLeaderboard()

  return (
    <main className="container">
      <PageHero
        eyebrow="Leaderboard"
        title="Recognize the people who keep the community moving."
        subtitle="Trust score, contribution count, and badges create visible momentum for reliable helpers."
      />

      <section className="leader-grid section">
        <Card>
          <p className="section-kicker">Top helpers</p>
          <h2>Rankings</h2>
          <RankList users={users} />
        </Card>

        <Card>
          <p className="section-kicker">Badge system</p>
          <h2>Trust and achievement</h2>
          <BadgeShowcase users={users} />
        </Card>
      </section>
    </main>
  )
}