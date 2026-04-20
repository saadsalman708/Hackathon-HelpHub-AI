"use client"
import { useState, useEffect } from "react"
import Card from "@/components/ui/Card"
import Field from "@/components/ui/Field"
import Button from "@/components/ui/Button"
import { useToast } from "@/lib/hooks/useToast"
import { updateUser } from "@/lib/firebase/firestore"
import type { User } from "@/lib/types"

interface OnboardingFormProps {
  currentUser: User
  users: User[]
  onUserSwitch: (userId: string) => void
  onFormChange: (skills: string, interests: string) => void
}

export default function OnboardingForm({
  currentUser,
  users,
  onUserSwitch,
  onFormChange,
}: OnboardingFormProps) {
  const { showToast } = useToast()

  const [name, setName] = useState(currentUser.name)
  const [location, setLocation] = useState(currentUser.location)
  const [skills, setSkills] = useState(currentUser.skills.join(", "))
  const [interests, setInterests] = useState(currentUser.interests.join(", "))

  const handleUserSelect = (userId: string) => {
    const nextUser = users.find((user) => user.id === userId)
    if (nextUser) {
      setName(nextUser.name)
      setLocation(nextUser.location)
      setSkills(nextUser.skills.join(", "))
      setInterests(nextUser.interests.join(", "))
    }
    onUserSwitch(userId)
  }

  // Notify parent of changes for AI suggestions
  useEffect(() => {
    onFormChange(skills, interests)
  }, [skills, interests, onFormChange])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const skillArray = skills.split(",").map((s) => s.trim()).filter(Boolean)
    const interestArray = interests.split(",").map((i) => i.trim()).filter(Boolean)

    try {
      await updateUser(currentUser.id, {
        name: name.trim(),
        location: location.trim(),
        skills: skillArray,
        interests: interestArray,
      })

      showToast("Onboarding details saved.")
    } catch {
      showToast("Failed to save onboarding details.")
    }
  }

  return (
    <Card className="form-card stack">
      <form onSubmit={handleSubmit} className="stack">
        <Field label="Switch demo user">
          <select
            value={currentUser.id}
            onChange={(e) => handleUserSelect(e.target.value)}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </Field>

        <div className="form-grid">
          <Field label="Name">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Field>

          <Field label="Location">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </Field>

          <Field label="Skills" fullWidth>
            <input
              type="text"
              placeholder="JavaScript, UI/UX, Public Speaking"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </Field>

          <Field label="Interests" fullWidth>
            <input
              type="text"
              placeholder="Hackathons, mentoring, startups"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            />
          </Field>
        </div>

        <Button variant="primary" type="submit">
          Save onboarding
        </Button>
      </form>
    </Card>
  )
}