"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import PageHero from "@/components/layout/PageHero"
import ProfileCard from "@/components/profile/ProfileCard"
import ProfileForm from "@/components/profile/ProfileForm"
import { useAuth } from "@/lib/hooks/useAuth"

export default function ProfilePage() {
  const router = useRouter()
  const { currentUser, loading: authLoading } = useAuth()

  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push("/auth")
    }
  }, [currentUser, authLoading, router])

  if (!currentUser) return null

  return (
    <main className="container">
      <PageHero
        eyebrow="Profile"
        title={currentUser.name}
        subtitle={`${currentUser.role} • ${currentUser.location}`}
      />

      <section className="profile-grid section">
        <ProfileCard user={currentUser} />
        <ProfileForm user={currentUser} />
      </section>
    </main>
  )
}