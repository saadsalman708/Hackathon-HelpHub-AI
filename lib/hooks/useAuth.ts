"use client"
import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import { useAppStore } from "@/lib/store/useAppStore"
import type { User } from "@/lib/types"

export function useAuth() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  
  const { currentUser, setCurrentUser } = useAppStore()

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "users"),
      (snap) => {
        const data = snap.docs.map((d) => d.data() as User)
        setUsers(data)
        
        // Keep currentUser in sync with Firestore updates
        if (currentUser) {
          const updatedUser = data.find((u) => u.id === currentUser.id)
          if (updatedUser) {
            setCurrentUser(updatedUser)
          }
        }
        
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )
    return () => unsub()
  }, [currentUser, setCurrentUser])

  const login = (userId: string) => {
    const user = users.find((u) => u.id === userId)
    if (user) {
      setCurrentUser(user)
    }
  }

  const logout = () => {
    setCurrentUser(null)
  }

  return { users, currentUser, loading, error, login, logout }
}