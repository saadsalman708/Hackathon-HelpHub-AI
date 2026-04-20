"use client"
import { useState } from "react"
import Card from "@/components/ui/Card"
import Field from "@/components/ui/Field"
import Button from "@/components/ui/Button"
import { useToast } from "@/lib/hooks/useToast"
import { updateUser } from "@/lib/firebase/firestore"
import type { User } from "@/lib/types"

interface ProfileFormProps {
  user: User
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const { showToast } = useToast()
  
  const [name, setName] = useState(user.name)
  const [location, setLocation] = useState(user.location)
  const [skills, setSkills] = useState(user.skills.join(", "))
  const [interests, setInterests] = useState(user.interests.join(", "))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const skillArray = skills.split(",").map((s) => s.trim()).filter(Boolean)
    const interestArray = interests.split(",").map((i) => i.trim()).filter(Boolean)
    
    try {
      await updateUser(user.id, {
        name: name.trim(),
        location: location.trim(),
        skills: skillArray,
        interests: interestArray
      })
      
      showToast("Profile updated.")
    } catch (error) {
      showToast("Failed to update profile.")
    }
  }

  return (
    <Card className="form-card stack">
      <p className="section-kicker">Edit profile</p>
      <h2>Update your identity</h2>
      
      <form onSubmit={handleSubmit} className="stack">
        <div className="profile-form">
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
              value={skills} 
              onChange={(e) => setSkills(e.target.value)} 
            />
          </Field>
          
          <Field label="Interests" fullWidth>
            <input 
              type="text" 
              value={interests} 
              onChange={(e) => setInterests(e.target.value)} 
            />
          </Field>
        </div>
        
        <Button variant="primary" type="submit">
          Save profile
        </Button>
      </form>
    </Card>
  )
}