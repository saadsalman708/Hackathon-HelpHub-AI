"use client"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Field from "@/components/ui/Field"
import Button from "@/components/ui/Button"
import { useAuth } from "@/lib/hooks/useAuth"
import { useToast } from "@/lib/hooks/useToast"
import { updateUser } from "@/lib/firebase/firestore"

type UserRole = "Need Help" | "Can Help" | "Both"

export default function AuthCard() {
  const router = useRouter()
  const { users, currentUser, login } = useAuth()
  const { showToast } = useToast()

  const [selectedUserId, setSelectedUserId] = useState(currentUser?.id ?? "")
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentUser?.role ?? "Both")
  const fallbackUser = useMemo(() => users[0], [users])
  const activeUserId = selectedUserId || currentUser?.id || fallbackUser?.id || ""
  const activeRole: UserRole = selectedRole || currentUser?.role || fallbackUser?.role || "Both"

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value
    setSelectedUserId(id)
    const user = users.find((u) => u.id === id)
    if (user) setSelectedRole(user.role)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Update role in Firestore if changed
      const user = users.find((u) => u.id === activeUserId)
      if (user && user.role !== activeRole) {
        await updateUser(activeUserId, { 
          role: activeRole
        })
      }
      
      login(activeUserId)
      showToast("Authentication simulated. Redirecting to dashboard.")
      
      setTimeout(() => {
        router.push("/dashboard")
      }, 600)
    } catch {
      showToast("Authentication failed.")
    }
  }

  return (
    <section className="auth-card fade-in">
      <p className="section-kicker">Login / Signup</p>
      <h2>Authenticate your community profile</h2>
      <form onSubmit={handleSubmit} className="stack">
        <Field label="Select demo user" htmlFor="auth-user">
          <select 
            id="auth-user" 
            value={activeUserId} 
            onChange={handleUserChange}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </Field>
        
        <Field label="Role selection" htmlFor="auth-role">
          <select 
            id="auth-role" 
            value={activeRole}
            onChange={(e) => setSelectedRole(e.target.value as UserRole)}
          >
            <option value="Need Help">Need Help</option>
            <option value="Can Help">Can Help</option>
            <option value="Both">Both</option>
          </select>
        </Field>
        
        <div className="auth-grid">
          <Field label="Email">
            <input type="email" defaultValue="community@helphub.ai" readOnly />
          </Field>
          <Field label="Password">
            <input type="password" defaultValue="demo1234" readOnly />
          </Field>
        </div>
        
        <Button variant="primary" type="submit">
          Continue to dashboard
        </Button>
      </form>
    </section>
  )
}