"use client"
import PageHero from "@/components/layout/PageHero"
import Card from "@/components/ui/Card"
import AiSummaryGrid from "@/components/ai/AiSummaryGrid"
import AiRecommendations from "@/components/ai/AiRecommendations"
import { useRequests } from "@/lib/hooks/useRequests"
import { useAuth } from "@/lib/hooks/useAuth"

export default function AiCenterPage() {
  const { requests } = useRequests()
  const { users } = useAuth()

  return (
    <main className="container">
      <PageHero
        eyebrow="AI Center"
        title="See what the platform intelligence is noticing."
        subtitle="AI-like insights summarize demand trends, helper readiness, urgency signals, and request recommendations."
      />

      <section className="stack section">
        <AiSummaryGrid requests={requests} users={users} />
        
        <Card>
          <p className="section-kicker">AI recommendations</p>
          <h2>Requests needing attention</h2>
          <AiRecommendations requests={requests} />
        </Card>
      </section>
    </main>
  )
}