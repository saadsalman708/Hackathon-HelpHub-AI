"use client"
import { useEffect, useState } from "react"
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import type { User } from "@/lib/types"

export function useLeaderboard() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      orderBy("trustScore", "desc"),
      limit(10)
    )
    
    const unsub = onSnapshot(
      q,
      (snap) => {
        const data = snap.docs.map((d) => d.data() as User)
        setUsers(data)
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )
    
    return () => unsub()
  }, [])

  return { users, loading, error }
}