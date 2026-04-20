"use client"
import { useEffect } from "react"
import HeroCopy from "@/components/landing/HeroCopy"
import HeroPanel from "@/components/landing/HeroPanel"
import FeatureSection from "@/components/landing/FeatureSection"
import FeaturedRequests from "@/components/landing/FeaturedRequests"
import { useAuth } from "@/lib/hooks/useAuth"
import { useRequests } from "@/lib/hooks/useRequests"
import { seedDatabase } from "@/lib/firebase/seed"

export default function LandingPage() {
  const { users } = useAuth()
  const { requests } = useRequests()

  useEffect(() => {
    // Seed database on first load if empty
    seedDatabase()
  }, [])

  const solvedCount = requests.filter((r) => r.status === "Solved").length
  const topScore = users.length > 0 
    ? Math.max(...users.map((u) => u.trustScore)) 
    : 0

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <HeroCopy
            memberCount={users.length * 128}
            requestCount={requests.length * 18}
            solvedCount={solvedCount * 23}
          />
          <HeroPanel topScore={topScore} />
        </div>
      </section>
      <FeatureSection />
      <FeaturedRequests 
        requests={requests.slice(0, 3)} 
        users={users} 
      />
    </main>
  )
}