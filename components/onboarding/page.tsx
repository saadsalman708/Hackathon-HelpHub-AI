"use client"
import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import PageHero from "@/components/layout/PageHero"
import OnboardingForm from "@/components/onboarding/OnboardingForm"
import OnboardingAI from "@/components/onboarding/OnboardingAI"
import { useAuth } from "@/lib/hooks/useAuth"
import { deriveSkills } from "@/lib/utils/deriveSkills"
import type { SkillSuggestions } from "@/lib/types"

export default function OnboardingPage() {
  const router = useRouter()
  const { currentUser, users, login, loading: authLoading } = useAuth()

  const [suggestions, setSuggestions] = useState<SkillSuggestions>({
    canHelpWith: [],
    needsHelpIn: [],
    roleFit: "Need Help",
  })

  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push("/auth")
    }
  }, [currentUser, authLoading, router])

  const handleFormChange = useCallback((skillsStr: string, interestsStr: string) => {
    const skills = skillsStr.split(",").map((s) => s.trim()).filter(Boolean)
    const interests = interestsStr.split(",").map((i) => i.trim()).filter(Boolean)
    
    // Using local derivation for real-time feedback (matches original behavior)
    // The API route exists but local is faster for typing
    setSuggestions(deriveSkills(interests, skills))
  }, [])

  const handleUserSwitch = (userId: string) => {
    login(userId)
  }

  if (!currentUser) return null

  return (
    <main className="container">
      <PageHero
        eyebrow="Onboarding"
        title="Shape your support identity with AI suggestions."
        subtitle="Name your strengths, interests, and location so the system can recommend where you can help and where you may need backup."
      />

      <section className="two-col section">
        <OnboardingForm
          currentUser={currentUser}
          users={users}
          onUserSwitch={handleUserSwitch}
          onFormChange={handleFormChange}
        />
        
        <aside className="stack">
          <OnboardingAI suggestions={suggestions} />
        </aside>
      </section>
    </main>
  )
}